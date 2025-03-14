import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

import { useUser } from "@clerk/nextjs";

import CheckRoot from "../checkRoot";

export default function user() {

    const user = useUser()?.user!!;
    const username = user?.fullName!!;
    const userimage = user?.imageUrl!!;

    const avatar = () => {
        return (
            <div className="flex items-center gap-3 p-4">
                <Avatar className="h-14 w-14 rounded-full">
                    <AvatarImage src={userimage} alt={username} />
                    <AvatarFallback className="rounded-lg">{username}</AvatarFallback>
                </Avatar>
                <span className="truncate font-semibold">{username}</span>
            </div>
        );
    };

    const signInButton = () => {
        return (
            <div className="p-2">
                <SignInButton>
                    <Button>Sign In</Button>
                </SignInButton>
            </div>
        );
    };

    return (
        <>
            <div className="block md:hidden">
                <SignedIn>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            {/* show image when user is signed in */}
                            <CheckRoot>{avatar()}</CheckRoot>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SignedIn>
                <SignedOut>
                    <CheckRoot>{signInButton()}</CheckRoot>
                </SignedOut>
            </div>
        </>
    );
};
