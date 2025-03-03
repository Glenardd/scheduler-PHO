import React from 'react'
import { Button } from './ui/button'

export default function editButton() {
    
    const handleEdit = () =>{
        console.log("edit button");
    };

    return (
    <Button onClick={handleEdit}>Edit</Button>
  );
};
