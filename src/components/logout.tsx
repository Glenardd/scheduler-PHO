import {
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Button } from "./ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";

export default function logout() {
  return (
    <div className="block md:hidden">
        <div className="p-2 grid justify-self-end">
            <SignedIn>
                <SidebarMenu> 
                    <SidebarMenuItem>
                        <SignOutButton>
                            <Button>Sign Out</Button>
                        </SignOutButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SignedIn>
        </div>
    </div>
  );
};
