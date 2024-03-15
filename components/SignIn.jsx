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
        if (!email || !password) {
            console.error("Email and password are required.");
            document.getElementById('feedback').innerHTML = "Email and password are required.";
            return;
        }

        try {
            const res = await signInWithEmailAndPassword(email, password);
            if (res) {
                console.log("Sign-in successful:", res);
                router.push('/lobby');
            } else {
                throw new Error("Authentication failed");
            }
        } catch (err) {
            console.error("Firebase Authentication Error:", err.code, err.message);
            document.getElementById('feedback').innerHTML = "Invalid email or password.";
        }
        setEmail('');
        setPassword('');
    };

  return (
    <div className="h-full flex justify-center items-center">
        <div className="rounded-2xl bg-slate-100 flex items-center max-w-[500px] flex-col gap-8 justify-center py-6 px-2 mid:px-10 big:px-20">
            <form className="flex flex-col px-4 gap-4">
            <Image src={logo} width={196} height={64} />
            <div className='flex flex-col flex-fill'>
                <label>Email</label>
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-black border-solid p-2 rounded shadow"
                    required
                />
            </div>
            <div className='flex flex-col'>
                <label>Password</label>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-black border-solid p-2 rounded shadow"
                    required
                />
            </div>
            </form>
            <p className='text-red-500' id='feedback'></p>
            <button
                onClick={handleSignIn}
                className="text-xl flex justify-center items-center bg-yellow-400 px-16 py-2 rounded-2xl shadow-lg border border-black hover:bg-yellow-200" type="submit">
                    Log In
            </button>
            <h2 className='text-black'>Doesn't have account right? go <Link href='/sign-up' className='text-blue-600 decoration-solid hover:text-blue-400'>Sign Up</Link></h2>
        </div>
    </div>
  )
}

export default SignIn