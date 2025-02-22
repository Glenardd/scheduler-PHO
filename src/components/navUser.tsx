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
  } from "@/components/ui/sidebar"

import { useUser } from "@clerk/nextjs";

export default function navUser() {

    const user = useUser()?.user!!;
    const username = user?.fullName!!;
    const userimage = user?.imageUrl!!;

    return (
        <div className="block md:hidden">
        <SidebarMenu>
            <SidebarMenuItem>
                <Avatar className="h-14 w-14 rounded-xl">
                    <AvatarImage src={userimage} alt={username}/>
                    <AvatarFallback className="rounded-lg">{username}</AvatarFallback>
                </Avatar>
            </SidebarMenuItem>
        </SidebarMenu>
        </div>
    );
};
