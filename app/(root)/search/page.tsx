import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { profileTabs } from "@/constants";

import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchUsers, fetchUser } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";


export default async function page() {

    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const result = await fetchUsers({
        userId: user.id,
        searchString: "",
        pageNumber: 1,
        pageSize: 25,
    });

    return (
        <section>
            <h1 className="head-text mt-10">Sök</h1>
            {/* seach bar for late */}

            <div className="mt-14 flex flex-col gap-9">
                {result.users.length === 0 ? (
                    <p>Inga resultat</p>
                ) : (
                    <>
                        {result.users.map((person) => (
                            <UserCard
                                key={person.id}
                                id={person.id}
                                username={person.username}
                                name={person.name}
                                imgUrl={person.image}
                                personType="user"
                            />
                        ))}
                    </>
                )}

            </div>
        </section>
    )
}
