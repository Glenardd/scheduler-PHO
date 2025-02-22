"use client";
import { usePathname } from "next/navigation";
import { AppSidebar } from "./app-sidebar";

export default function DisableSidebar() {

    const paths = ["/sign-in"];

    const pathname = usePathname();
    
    return <div>{!paths.includes(pathname) && <AppSidebar />}</div>;
}
