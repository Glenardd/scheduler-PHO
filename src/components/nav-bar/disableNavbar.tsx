"use client";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function DisableNavbar() {
    const paths = ["/admin/sign-in", "/admin/login"];
  
    const pathname = usePathname();
    
    return <div>{!paths.includes(pathname!!) && <Navbar />}</div>;
}
