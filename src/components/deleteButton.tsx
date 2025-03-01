"use client";
import { Button } from "./ui/button"

export default function deleteButton({eventId}:any) {

    const handleDelete = async () => {
        await fetch(`/api/google?eventId=${eventId}`,{
            method:"DELETE",
        });
    };

    return (
        <Button onClick={handleDelete}>Delete</Button>
    );
};
