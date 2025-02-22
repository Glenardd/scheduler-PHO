import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

export default function navbar() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-white p-4 shadow-md">
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
                <SignedIn>
                    <UserButton appearance={{
                        elements: {
                            avatarBox: {
                                width: 40,
                                height: 40
                            },
                        }
                    }} />
                </SignedIn>
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
