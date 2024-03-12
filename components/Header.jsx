"use client";
import {React, useState }from "react";
import logo from "../assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { redirect } from "next/navigation";
import { auth } from "@/app/firebase/config";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out successfully");
        redirect("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <header className="w-full h-20">
      <div className={`w-full p-0 m-0 bg-blue-300 absolute z-10 h-48 ${showMenu ? 'top-0 mid:-top-12' : '-top-48'} big:-top-48 left-0 transition-all ease-in-out`}></div>
      <div className="items-center justify-between flex flex-row p-4 relative z-20">
        <Link href="/lobby">
          <Image src={logo} alt="logo" className="w-32 h-auto"></Image>
        </Link>
        <div className="flex-col items-center mid:flex-row mid:items-center">
          <button
            onClick={handleToggleMenu}
            className="block big:hidden text-3xl text-blue-800 hover:text-blue-500  px-4 py-2"
          >
            {showMenu ? '✕' : '☰'}
          </button>
        </div>
        <div className='flex-row items-center hidden big:flex'>
          <Link href='/leaderboard'>
            <span className='text-black text-xl rounded-3xl px-8 py-2 hover:bg-yellow-400 '>Leaderboard</span>
          </Link>
          <Link href='about'>
            <span className='text-black text-xl rounded-3xl px-8 py-2 hover:bg-yellow-400 '>About Us</span>
          </Link>
          <Link href='/profile'>
            <span className='text-black text-xl rounded-3xl px-8 py-2 hover:bg-yellow-400 '>Profile</span>
          </Link>
          <button onClick={handleLogout} className='text-xl rounded-3xl px-8 py-2 hover:bg-yellow-400 '>Logout</button>
        </div>
      </div>
          <div className={`grid grid-cols-2 relative z-20 mt-5 mid:grid-cols-4 big:hidden mid:flex-row text-center justify-center items-center mid:space-x-2 ${showMenu ? 'block' : 'hidden'} mid:transition-all mid:ease-in-out mid:max-h-full mid:overflow-hidden mid:bg-transparent mid:absolute mid:top-16 mid:right-0 mid:left-0 mid:w-full`}>
            <Link href="/leaderboard">
              <div className="text-black text-xl px-8 py-2 hover:bg-yellow-400">
                Leaderboard
              </div>
            </Link>
            <Link href="/about">
              <div className="text-black text-xl px-6 py-2 hover:bg-yellow-400">
                About Us
              </div>
            </Link>
            <Link href="/profile">
              <div className="text-black text-xl px-8 py-2 hover:bg-yellow-400">
                Profile
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="text-xl px-8 py-2 hover:bg-yellow-400"
            >
              Logout
            </button>
          </div>
    </header>
  );
};

export default Header;
