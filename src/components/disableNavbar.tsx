"use client";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function disableNavbar() {
    const paths = ["/sign-in"];
  
    const pathname = usePathname();
    
    return <div>{!paths.includes(pathname) && <Navbar />}</div>;
}
