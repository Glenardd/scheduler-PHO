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

import useSWR from "swr";

export default function editButton({eventId}:any) {

  const {data} = useSWR(`/api/google?id=${eventId}`, (url)=> fetch(url, {method:"GET"}).then((res)=> res.json()));

  const handleEdit = () =>{
    console.log(data?.calendar);
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
        <div>
          {eventId}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
