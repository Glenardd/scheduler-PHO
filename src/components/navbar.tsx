import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";

export default function navbar() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-white p-4 shadow-md">
            <div className="flex items-center flex-shrink-0 text-black mr-6 gap-2">
                <SidebarTrigger/>
                <Link href="/" passHref>
                    <Image src="/PHO.png" width={50} height={50} alt="PHO Logo" />
                </Link>
                <span>Provincial Health Office Scheduler</span>
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
                <SignedOut>
                    <SignInButton>
                        <Button>Sign In</Button>
                    </SignInButton>
                </SignedOut>
            </div>
        </nav>
    )
}
