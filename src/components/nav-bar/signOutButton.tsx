import { Button } from "../ui/button"
import { useClerk } from "@clerk/nextjs"

export default function signOutButton() {
    
    const { signOut } = useClerk();

    const handleSignOut = () =>{
        signOut({redirectUrl: "/admin"});
    };

    return (
        <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
    )
}
