"use client";
import { Button } from "./ui/button"

export default function deleteButton({eventId, onDelete}:any) {
    return (
        <Button onClick={() => onDelete(eventId)}>Delete</Button>
    );
};
