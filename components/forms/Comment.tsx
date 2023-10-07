"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import { commentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";



interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({
    threadId,
    currentUserImg,
    currentUserId
}: Props) => {

    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(commentValidation),
        defaultValues: {
          thread: "",
        },
      });


    const onSubmit = async (values: z.infer<typeof commentValidation>) => {
        await addCommentToThread(
            threadId,
            values.thread,
            JSON.parse(currentUserId),
            pathname,
            
        );

        form.reset();
    }


    return (
        <Form {...form}>
            <form
                className='comment-form'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                        <FormItem className='flex w-full items-center gap-3'>
                            <FormLabel>
                                <Image src={currentUserImg} alt="profil bild" className="rounded-full object cover" width={48} height={48} />
                            </FormLabel>
                            <FormControl className='border-none bg-transparent'>
                                <input
                                    type="text"
                                    placeholder="Kommentera..."
                                    className="no-focus text-light-1 outline-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' className='comment-form_btn'>
                    Kommentera
                </Button>
        </form> 
    </Form>
    )
}

export default Comment;