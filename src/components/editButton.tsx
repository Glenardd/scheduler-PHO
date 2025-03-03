import { Button } from './ui/button'
import Link from 'next/link';
export default function editButton({ href }: any) {
  return (
    <>
      <Button asChild>
        <Link href={href}>Edit</Link>
      </Button>
    </>
  );
};
