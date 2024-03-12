'use client'
import Image from 'next/image'
import logo from '../assets/logo.png';
import Link from 'next/link';
import { useEffect, React } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/app/firebase/config';

export default function Home() {
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          const uid = user.uid;
          // ...
          console.log("uid", uid)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
      });
     
}, [])

  return (
        <div className='h-full flex justify-center items-center'>
          <div className='flex flex-col gap-10 justify-center items-center z-0'>
            <Image src={logo} alt='logo' className='w-64 h-auto' />
            <h1 className='text-black font-medium text-xl'>Tic Tac Toe 4x4 Game</h1>
            <div className='flex flex-row gap-16 m-4'>
              <span>
                <Link href='/howtoplay' className='font-semibold text-yellow-100 text-lg'>How to play?</Link>
              </span>
              <span>
                <Link href='#' className='font-semibold text-yellow-100 text-lg'>About us</Link>
              </span>
            </div>
            <button className='flex justify-center items-center bg-yellow-400 px-12 py-2 rounded-2xl shadow-lg border border-black'>
                <Link href='/sign-in' className='text-yellow-950 font-bold text-2xl'>Log In</Link>
            </button>
          </div>
        </div>
  );
}
