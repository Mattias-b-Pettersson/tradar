import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";


export default async function Home() {
  const result = await fetchThreads(1, 30);
  const user = await currentUser();

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="head-text">Trådar</h1>
      </div>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">No posts yet</h1>
            <p className="text-gray-500">Be the first to post</p>
          </div>) : (
            <>
              {result.posts.map((post) => (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id || ""}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              ))}
            </>
          )}
      </section>
    </>
  )
}
