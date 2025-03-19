import { SignedOut, SignInButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import PopoverUser from "./popoverUser";
import CheckRoot from "../checkRoot";

export default function navbar() {
    return (
        <nav className="
            w-full
            flex
            items-center 
            justify-between 
            flex-wrap 
            bg-white 
            p-4 
            shadow-md
        ">
            <SidebarTrigger />
            <div className="
                flex 
                items-center 
                flex-shrink-0 
                text-black 
                mr-6 
                gap-2 
                justify-center
            ">
                <Image src="/PHO.png" width={50} height={50} alt="PHO-Logo" />
                <span>Provincial Health Office 2025 Health Calendar</span>
                <Image src="/PGP.png" width={50} height={50} alt="PGP-Logo" />
            </div>
            <div className="flex items-center flex-shrink-0 text-black mr-6">
                <div className="hidden md:block">
                    <CheckRoot>
                        <SignedIn>
                            <PopoverUser />
                        </SignedIn>
                    </CheckRoot>
                </div>
                <div className="hidden md:block">
                    <CheckRoot>
                        <SignedOut>
                            <SignInButton>
                                <Button>Sign In</Button>
                            </SignInButton>
                        </SignedOut>
                    </CheckRoot>
                </div>
            </div>
        </nav>
    )
}
