import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar";

// import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function user() {

    const paths = ["/", "/calendar"];
  
    const pathname = usePathname();

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

    return <div>{!paths.includes(pathname!!) && avatar()}</div>;
};
