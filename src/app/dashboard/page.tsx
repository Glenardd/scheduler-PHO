import { SignedIn, UserButton } from "@clerk/nextjs"
import Navbar from "@/components/navbar"

export default function page() {
  return (
    <>
        <div>
            <Navbar />    
            <h1>Dashboard</h1>
        </div>
    </>
  )
}
