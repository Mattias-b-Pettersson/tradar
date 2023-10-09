import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


import { fetchUsers, fetchUser, getActivity } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";
import ThreadCard from "@/components/cards/ThreadCard";
import Link from "next/link";


export default async function page() {

    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const activity = await getActivity(userInfo._id);

    return (
      <section>
        <h1 className="head-text mb-10">Aktivitet</h1>

        <section className="flex mt-10 flex-col gap-5">
          {activity.length > 0 ? (
            activity.map((activity) => 
            <Link key={activity._id} href={`/thread/${activity.parentId}`}>
              <article className="activity-card">
                <Image 
                  src={activity.author.image}
                  alt="profil bild"
                  width={20}
                  height={20}
                  className="rounded-full object-cover"
                />
                <p className="!text-small-regular text-light-1">
                  <span className="mr-1 text-primary-500">
                    {activity.author.name}
                  </span>
                  {" "}svarade på din tråd
                </p>
              </article>
            </Link>)
            ): (
              <p className="!text-base-regular text-light-3">Ingen aktivitet än.</p>
            )}
        </section>
      </section>
    )

}
