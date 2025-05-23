import { Button } from "../ui/button"
import { useClerk } from "@clerk/nextjs"

export default function SignOutButton() {
    
    const { signOut } = useClerk();

    const handleSignOut = () =>{
        signOut({redirectUrl: "/"});
    };

    return (
        <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
    )
}
