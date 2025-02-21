import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs"; 
import Image from "next/image";

export default function navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-4 shadow-md">
        <div className="flex items-center flex-shrink-0 text-black mr-6 gap-2">
            <Image src="/PHO.png" width={50} height={50} alt="PHO Logo"/>
            <span>Provincial Health Office Scheduler</span>
        </div>
        <div className="flex items-center flex-shrink-0 text-black mr-6">
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton />
            </SignedOut>
        </div>
    </nav>
  )
}
