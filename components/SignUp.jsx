'use client'
import { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    const router = useRouter();

    const handleSignUp = async () => {
        try {
            const res= await createUserWithEmailAndPassword(email, password);
            console.log({res});
            setEmail('')
            setPassword('')
            router.push('/sign-in')
        } catch(err) {
            console.error(err);
        }
    };

  return (
    <div className="h-full flex justify-center items-center">
        <div className="rounded-2xl bg-slate-100 h-96 w-96 flex items-center flex-col gap-8 justify-center">
            <form className="flex flex-col px-4 gap-2">
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
                onClick={handleSignUp}
                className="flex justify-center items-center bg-yellow-400 px-12 py-2 rounded-2xl" type="submit">
                    Sign Up
            </button>
            <h2 className='text-black'>
                Already have account? go <Link href='/sign-in' className='text-blue-500 decoration-solid'>Sign in</Link>
            </h2>
        </div>
    </div>
  )
}

export default SignIn