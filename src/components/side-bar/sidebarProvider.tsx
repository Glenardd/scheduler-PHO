"use client";

import { SidebarProvider } from "../ui/sidebar";
import { useState } from "react";

export default function SidebarProvider_({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return <SidebarProvider open={open} onOpenChange={((open)=>setOpen(open))}>{children}</SidebarProvider>;
};

