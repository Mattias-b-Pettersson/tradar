"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose";

interface Params {
    text: string;
    author: string;
    communityId: string | null;
    path: string;
}

export async function createThread({
    text, author , communityId, path
}: Params) {
    try {
        connectToDatabase();

    const createThread = await Thread.create({
        text,
        author,
        community: null,
    });

    //Update User model
    await User.findByIdAndUpdate(author, {
        $push: {
            threads: createThread._id
        }
    });
    
    revalidatePath(path);
    } catch(error: any) {
        throw new Error(error);
    }
    
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
    connectToDatabase();
    
    const skipAmount = pageSize * (pageNumber - 1);

    // fetch threads that have no parents
    const postQuery = Thread.find({parent: {$in: [null, undefined]}  })
    .sort({createdAt: "desc"})
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({ 
        path: "children", 
        populate: {
            path: "author",
            model: User,
            select: "_id name parentId image"
        }
    })

    const totalPostsCount = await Thread.countDocuments({ parent: {$in: [null, undefined]} });

    const posts = await postQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return {
        posts,
        isNext,
    }
}

