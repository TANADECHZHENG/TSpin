import Image from "next/image"
import logo from '@/assets/logo.png';
import Link from "next/link";

export default function Page(){
    return (
        <div className="h-screen w-full p-4 flex justify-center items-center flex-wrap">
            <Image src={logo} className='w-64 h-auto mr-24' alt={logo}/>
            <div className="w-1/3 flex justify-center items-center flex-col">
                <h1 className="font-bold text-5xl text-center mb-10">
                    How to Play?
                </h1>
                <p className="text-2xl text-start text-slate-800">
                    Just like a traditional tic-tac-toe game but the board table have 4 columns and 4 rows.
                     After your and your opponent player's turn end, the board will shift depend on direction on the each block of the board.
                     the game will judge after the board has shifted.The player who get any 4 blocks of vertical line, horizontal line and diagonal line  will be winner
                </p>
            <div className="justify-center flex items-center mt-10 gap-20">
                <button className='flex justify-center items-center bg-yellow-400 px-12 py-2 rounded-2xl shadow-lg border border-black'>
                    <Link href='/' />Go Back
                </button>
                <button className='flex justify-center items-center bg-yellow-400 px-12 py-2 rounded-2xl shadow-lg border border-black'>
                    <Link href='/computer' />Go Play with bot
                </button>
            </div>
            </div>
        </div>
    )
}