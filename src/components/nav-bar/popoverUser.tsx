import User from './user'

import SignOutButton from './signOutButton';
import { useUser } from '@clerk/nextjs';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PopoverUser() {

  const username: string | any = useUser().user?.fullName;
  const userRole: string | any = useUser().user?.publicMetadata?.roles;

  return (
    <Popover>
        <PopoverTrigger>
          <User />
        </PopoverTrigger>
        <PopoverContent className='w-50' align='start'>
          <div className='flex flex-col gap-3'>
            <div className='text-m'>{username} {userRole ? `(${userRole})` : ''}</div>
            <div>
              <SignOutButton/>
            </div>
          </div>
        </PopoverContent>
    </Popover>
  )
}
