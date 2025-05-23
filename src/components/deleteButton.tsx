"use client";
import { Button } from "./ui/button"

import { useSWRConfig } from "swr";
import { toast } from "sonner";

export default function DeleteButton({ eventId }: { eventId: number | string }) {

    const {mutate} = useSWRConfig();

    const handleDelete = async () => {
        const response = await fetch(`/api/mongodb?id=${eventId}`, {
          method: "DELETE",
        });

        const data = await response.json();
        
        toast(data?.message)

        mutate("/api/mongodb");
    };  

    return (
        <Button onClick={handleDelete}>Delete</Button>
    );
};
