import Image from 'next/image'
import logo from '../assets/logo.png';
import Link from 'next/link';

export default function Home() {
  return (
        <div className='h-full flex justify-center items-center'>
          <div className='flex flex-col gap-10 justify-center items-center z-0'>
            <Image src={logo} alt='logo' className='w-64 h-auto' />
            <h1 className='text-black font-medium'>Tic Tac Toe 4x4 Game</h1>
            <div className='flex flex-row gap-16 m-4'>
              <span>
                <Link href='#' className='font-semibold text-yellow-100'>How to play?</Link>
              </span>
              <span>
                <Link href='#' className='font-semibold text-yellow-100'>About us</Link>
              </span>
            </div>
            <button className='flex justify-center items-center bg-yellow-400 px-12 py-2 rounded-2xl'>
                <Link href='/sign-in' className='text-yellow-950 font-bold'>Login</Link>
            </button>
          </div>
        </div>
  );
}
