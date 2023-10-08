"use client"

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
    id: string;
    username: string;
    name: string;
    imgUrl: string;
    personType: string;
}

const UserCard = ({
    id,
    username,
    name,
    imgUrl,
    personType,
}: Props) => {
    const router = useRouter();

    return (
        <article className="user-card">
            <div className="user-card_avatar">
                <img 
                src={imgUrl} 
                alt="bild"
                width={48}
                height={48}
                className="rounded-full"
                />
                
                <div className="flex-1 text-ellipsis">
                    <h4 className="text-base-semibold text-light-1">{name}</h4>
                    <p className="text-small-medium text-gray-1">@{username}</p>
                </div>
            </div>
            <Button className="user-card_btn" onClick={() => router.push(`/profile/${id}`)}>
                Se profil
            </Button>
        </article>
    )
}

export default UserCard