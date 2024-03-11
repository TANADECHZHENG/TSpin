'use client'
import React from 'react'
import logo from '../assets/logo.png';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';
import { signOut } from "firebase/auth";
import { redirect } from 'next/navigation';
import { auth } from '@/app/firebase/config'

const Header = () => {
  
  const handleLogout = () => {
    signOut(auth).then(() => {
    // Sign-out successful.
        console.log("Signed out successfully");
        redirect("/");
    }).catch((error) => {
      console.log(error)
    });
}

  return (
    <header className='w-full h-20 p-4'>
      <div className="wrapper items-center justify-between flex flex-row ">
        <Link href='/lobby'>
          <Image src={logo} alt='logo' className='w-32 h-auto'></Image>
        </Link>
        <div className='flex flex-row gap-16 px-10 items-center'>
          <Link href='/leaderboard'>
            <span className='text-black text-xl'>Leaderboard</span>
          </Link>
          <Link href='about'>
            <span className='text-black text-xl'>About Us</span>
          </Link>
          <Link href='/profile'>
            <span className='text-black text-xl'>Profile</span>
          </Link>
          <button onClick={handleLogout} className='text-xl'>Logout</button>
        </div>
      </div>
    </header>
  )
}

export default Header