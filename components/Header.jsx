import React from 'react'
import logo from '../assets/logo.png';
import Link from 'next/link';
import Image from 'next/image';


const Header = () => {
  return (
    <header className='w-full h-20 bg-sky-300 border-b p-4'>
      <div className="wrapper items-center justify-between flex flex-row ">
        <Link href='/'>
          <Image src={logo} alt='logo' className='w-32 h-auto'></Image>
        </Link>
        <div className='flex flex-row gap-16 px-10'>
          <Link href='#'>
            <span className='text-black'>How to play?</span>
          </Link>
          <Link href='/leaderboard'>
            <span className='text-black'>Leaderboard</span>
          </Link>
          <Link href='about'>
            <span className='text-black'>About Us</span>
          </Link>
          <Link href='/profile'>
            <span className='text-black'>Profile</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header