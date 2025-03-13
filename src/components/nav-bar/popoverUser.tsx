import User from './user'
// import { SignOutButton } from '@clerk/nextjs';

import SignOutButton from './signOutButton';
import { useUser } from '@clerk/nextjs';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function popoverUser() {

  const username = useUser().user?.fullName;

  return (
    <Popover>
        <PopoverTrigger>
          <User />
        </PopoverTrigger>
        <PopoverContent className='w-50' align='start'>
          <div className='flex flex-col gap-3'>
            <div className='text-m'>{username} (admin)</div>
            <div>
              <SignOutButton/>
            </div>
          </div>
        </PopoverContent>
    </Popover>
  )
}
