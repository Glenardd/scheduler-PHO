import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar";

import CheckPath from "../checkPath";
import { useUser } from "@clerk/nextjs";

export default function User() {

    const user = useUser()?.user!!;
    const username = user?.fullName!!;
    const userimage = user?.imageUrl!!;

    const avatar = () =>{
        return (
            <div className="flex items-center">
                <Avatar className="h-10 w-10 rounded-full">
                    <AvatarImage src={userimage} alt={username} />
                    <AvatarFallback>{username}</AvatarFallback>
                </Avatar>
                {/* <span className="truncate font-semibold">{username}</span> */}
            </div>
        );
    };

    return <CheckPath>{avatar()}</CheckPath>;
};
