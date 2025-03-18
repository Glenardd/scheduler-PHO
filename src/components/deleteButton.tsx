"use client";
import { Button } from "./ui/button"

import { useSWRConfig } from "swr";
import { toast } from "sonner";

export default function deleteButton({eventId}:any) {

    const {mutate} = useSWRConfig();

    const handleDelete = async () => {
        const response = await fetch(`/api/mongodb?id=${eventId}`, {
          method: "DELETE",
        });

        const data = await response.json();
        
        toast(data?.message)

        mutate("/api/google");
    };  

    return (
        <Button onClick={handleDelete}>Delete</Button>
    );
};
