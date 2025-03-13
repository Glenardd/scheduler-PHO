import { SignedOut, SignInButton, SignedIn} from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import PopoverUser from "./popoverUser";

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
            <SidebarTrigger/>
            <div className="
                flex 
                items-center 
                flex-shrink-0 
                text-black 
                mr-6 
                gap-2 
                justify-center
            ">
                <Image src="/PHO.png" width={50} height={50} alt="PHO-Logo"/>
                <span>Provincial Health Office Scheduler</span>
                <Image src="/PGP.png" width={50} height={50} alt="PGP-Logo" />
            </div>
            <div className="flex items-center flex-shrink-0 text-black mr-6">
                <div className="hidden md:block">
                    <SignedIn>
                        <PopoverUser />
                    </SignedIn>
                </div>
                <div className="hidden md:block">
                    <SignedOut>
                        <SignInButton>
                            <Button>Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </nav>
    )
}
