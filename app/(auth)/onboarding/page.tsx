import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

async function Page() {

    const user = await currentUser();
    
    const userInfo = {}

    const userData = {
        id: user?.id,
        objectID: userInfo?._id,
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName + " " + user?.lastName,  
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl,
    }

    return (
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
            <h1 className="head-text">Trådar</h1>
            <p className="mt-3 text-base-regular text-light-2 ">
                Nästan där! Gör klart ditt konto för att använda Trådar.
            </p>
            <section className="mt-10 bg-dark-2 p-10">
                <AccountProfile 
                    user={userData}
                    btnTitle="Fortsätt"
                />

            </section>
        </main>
    );

}

export default Page;