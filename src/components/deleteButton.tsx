"use client";
import { Button } from "./ui/button"

export default function deleteButton() {

    const handleDelete = () => {
        console.log("test");
    };

    return (
        <Button onClick={handleDelete}>Delete</Button>
    );
};
