"use client";
import { Button } from "./ui/button"

import { useSWRConfig } from "swr";

export default function deleteButton({eventId}:any) {

    const {mutate} = useSWRConfig();

    const handleDelete = async () => {
        await fetch(`/api/google?id=${eventId}`, {
          method: "DELETE",
        });
    
        mutate("/api/google");
    };  

    return (
        <Button onClick={handleDelete}>Delete</Button>
    );
};
