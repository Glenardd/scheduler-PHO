import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from "@/components/ui/sidebar";

import { SignedIn } from "@clerk/nextjs";

import { useUser } from "@clerk/nextjs";

export default function navUser() {

    const user = useUser()?.user!!;
    const username = user?.fullName!!;
    const userimage = user?.imageUrl!!;

    return (
        <div className="block md:hidden">
        <SidebarMenu>
            <SidebarMenuItem>
                {/* show image when user is signed in */}
                <SignedIn>
                    <div className="flex items-center gap-3 p-4">
                        <Avatar className="h-14 w-14 rounded-full">
                            <AvatarImage src={userimage} alt={username}/>
                            <AvatarFallback className="rounded-lg">{username}</AvatarFallback>
                        </Avatar>
                        <span className="truncate font-semibold">{username}</span>
                    </div>
                </SignedIn>
            </SidebarMenuItem>
        </SidebarMenu>
        </div>
    );
};
