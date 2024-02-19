'use client'
import { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import logo from '../assets/logo.png'
import Link from 'next/link';
import Image from 'next/image';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    const router = useRouter();

    const handleSignIn = async () => {
        try {
            const res= await signInWithEmailAndPassword(email, password);
            console.log({res});
            setEmail('')
            setPassword('')
            router.push('/lobby')
        }catch (err) {
            console.error(err);
        }
    };

  return (
    <div className="h-full flex justify-center items-center">
        <div className="rounded-2xl bg-slate-100 h-96 w-96 flex items-center flex-col gap-8 justify-center">
            <form className="flex flex-col px-4 gap-4">
            <Image src={logo} width={196} height={64} />
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-black border-solid"
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-black border-solid"
                />
            </form>
            <button
                onClick={handleSignIn}
                className="flex justify-center items-center bg-yellow-400 px-12 py-2 rounded-2xl" type="submit">
                    Sign In
            </button>
            <h2 className='text-black'>Doesn't have account right? go <Link href='/sign-up' className='text-blue-500 decoration-solid'>Sign Up</Link></h2>
        </div>
    </div>
  )
}

export default SignIn