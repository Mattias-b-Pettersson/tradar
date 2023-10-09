"use server"

import { FilterQuery, SortOrder } from "mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { connect } from "http2";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}

export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path
}: Params): Promise<void> {
    connectToDatabase();

    try {
        await User.findOneAndUpdate(
            { id: userId },
            { 
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true}
        );

        if(path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Error updating user: ${error.message}`);
    }
}

export async function fetchUser(userId:string) {
    try { 
        connectToDatabase();

        return await User
        .findOne({ id: userId })
        // .populate({
        //     path: "communities",
        //     model: Community
        // });
    } catch(error: any) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}


//TODO: POPULATE COMMUNITIES
export async function fetchUserThreads(userId:string) {
    try { 
        connectToDatabase();

        const threads = await User.findOne({ id: userId }).populate({
            path: "threads",
            model: Thread,
            populate: [
            {
                path: "children",
                model: Thread,
                populate: {
                path: "author",
                model: User,
                select: "name image id", // Select the "name" and "_id" fields from the "User" model
                },
            },
            ],
        });
        return threads;
    } catch(error: any) {
        throw new Error(`Error fetching user threads: ${error.message}`);
    }
}

export async function fetchUsers({ 
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
 }) {
    try { 
        connectToDatabase();

        const skipAmount = (pageNumber - 1) * pageSize;

        const regex = new RegExp(searchString, "i");

        const query: FilterQuery<typeof User> = {
            id: { $ne: userId },
        }

        if(searchString.trim() !== "") {
            query.$or = [
                { username: {$regex: regex} },
                { name: {$regex: regex} },
            ];
        }

        const sortOptions = {
            createdAt: sortBy,
        };

        const usersQuery = User.find(query)
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize);

        const totalUsersQuery = await User.countDocuments(query);

        const users = await usersQuery.exec();

        const isNext = totalUsersQuery > skipAmount + users.length;

        return {
            users,
            isNext,
        };

    } catch(error: any) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

export async function getActivity(userId:string) {
    try {
        connectToDatabase();

        const userThreads = await Thread.find({ author: userId });
        
        const childThreadsIds = userThreads.reduce((acc, userThread) => {
            return acc.concat(userThread.children)
        }, []);

        const replies = await Thread.find({ 
            _id: { $in: childThreadsIds },
            author: { $ne: userId } 
        }).populate({
            path: "author",
            model: User,
            select: "name image _id",    
        });

        return replies;

    } catch(error: any) {
        throw new Error(`Error fetching user activity: ${error.message}`);
    }
}