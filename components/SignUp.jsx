'use client'
import { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getDatabase, ref, off, set } from "firebase/database";
import  { updateProfile } from "firebase/auth";
import { app, auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import logo from '../assets/logo.png'
import Image from 'next/image';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);


    const db = getDatabase(app);
    const router = useRouter();


    const pushUser = () => {
        const userRef = ref(db, `Scoreboard/${auth.currentUser.uid}`);
        set(userRef,
            {
                score: 0,
                win: 0,
                lose: 0,
                draw: 0,
                username: username,
                email: email,
            }
        )
        off(userRef);
        router.push('/sign-in')
    }


    const handleSignUp = async () => {
        try {
            const res = await createUserWithEmailAndPassword(email, password);
            console.log({res});
            if (res){
                updateProfile(auth.currentUser, { displayName: username })
                pushUser()
            } else {
                throw new Error("Sign Up failed");
            }
        } catch(err) {
            console.error(err);
            document.getElementById('feedback').innerHTML = "Email have been used.";
        }
        setEmail('')
        setPassword('')
        setUsername('')
    };

  return (
    <div className="h-full flex justify-center items-center">
        <div className="rounded-2xl bg-slate-100 h-96 w-96 flex items-center flex-col gap-8 justify-center">
            <form className="flex flex-col px-4 gap-4">
                <Image src={logo} width={196} height={64}/>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-black border-solid"
                />
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
            <p className='' id='feedback'></p>
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