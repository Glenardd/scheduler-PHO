"use client";
import { SidebarProvider } from "./ui/sidebar";
import { useState } from "react";

export default function sidebarProvider({ children }:any) {
    const [open, setOpen] = useState(false);
    return <SidebarProvider open={open} onOpenChange={((open)=>setOpen(open))}>{children}</SidebarProvider>;
};