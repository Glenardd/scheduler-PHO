"use client";
import { SignIn } from '@clerk/nextjs'
import { useEffect } from 'react';

export default function Page() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <SignIn/>
    </div>
  );
};