import { Button } from './ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useState } from 'react';

import useSWR, { useSWRConfig } from "swr";

export default function editButton({eventId}:any) {

  const {mutate} = useSWRConfig();

  const {data} = useSWR(`/api/google?id=${eventId}`, (url)=> fetch(url, {method:"GET"}).then((res)=> res.json()));

  const calendar = data?.calendar;
  const title = calendar?.summary;
  const description = calendar?.description;
  const id = calendar?.id;

  const [inputTitle, setInputTitle] = useState<string>(title);
  const [inputDesc, setInputDesc] = useState<string>(description); 

  //whenever this is clicked it will revert the input values to original
  const handleEdit = () =>{
    setInputTitle(title);
    setInputDesc(description);

    console.log(id);
  };

  const handleSubmit = async () =>{

    const newData = {
      summary: inputTitle,
      description: inputDesc,
    };

    // console.log(data?.calendar);

    const response = await fetch(`/api/google?id=${eventId}`, 
      {
        method:"PATCH", 
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(newData),
      }).then((res)=> res.json());
    
    console.log(response);
    
    mutate("api/google");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={handleEdit}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit event</DialogTitle>
          <DialogDescription>
            Make changes to your event here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <Input type='text' value={inputTitle ?? ""} onChange={(e) =>setInputTitle(e.target.value)} placeholder='title'/>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSubmit}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
