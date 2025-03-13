"use client";
import { usePathname } from "next/navigation";
import { AppSidebar } from "./app-sidebar";

export default function DisableSidebar() {

    const paths = ["/admin/sign-in"];

    const pathname = usePathname();
    
    return <div>{!paths.includes(pathname!!) && <AppSidebar />}</div>;
}
