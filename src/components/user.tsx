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

export default function navUser() {

    const user = useUser()?.user!!;
    const username = user?.fullName!!;
    const userimage = user?.imageUrl!!;

    return (
        <>
            <div className="block md:hidden">
                <SignedIn>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            {/* show image when user is signed in */}
                            <div className="flex items-center gap-3 p-4">
                                <Avatar className="h-14 w-14 rounded-full">
                                    <AvatarImage src={userimage} alt={username} />
                                    <AvatarFallback className="rounded-lg">{username}</AvatarFallback>
                                </Avatar>
                                <span className="truncate font-semibold">{username}</span>
                            </div>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SignedIn>
                <SignedOut>
                    <div className="p-2">
                        <SignInButton>
                            <Button>Sign In</Button>
                        </SignInButton>
                    </div>
                </SignedOut>
            </div>
        </>
    );
};
