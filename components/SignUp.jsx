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
    const [confirmPassword, setConfirmPassword] = useState('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);


    const db = getDatabase(app);
    const router = useRouter();


    const validateEmail = (email) => {
        // Regular expression for email validation
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      };

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


    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword || !username){
            document.getElementById('feedback').innerHTML = 'Please fill the input field.';
        } else if (!validateEmail(email)) {
            document.getElementById('feedback').innerHTML = 'Please enter a valid email address.';
        } else if (password.length < 8) {
            document.getElementById('feedback').innerHTML = 'Password must be at least 8 characters long.';
        } else if (password !== confirmPassword){
            document.getElementById('feedback').innerHTML = 'Passwords do not match.';
        } else {
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
            }}
        setEmail('')
        setPassword('')
        setUsername('')
        setConfirmPassword('')
    };

  return (
    <div className="h-full flex justify-center items-center">
        <div className="rounded-2xl bg-slate-100 flex px-2 mid:px-10 big:px-20 py-6 items-center flex-col gap-8 justify-center">
            <form className="flex flex-col px-4 gap-4">
                <Image src={logo} width={196} height={64}/>
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
            <div className='flex flex-col flex-fill'>
                <label>Username</label>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-black border-solid p-2 rounded shadow"
                    required
                />
            </div>
            <div className='flex flex-col flex-fill'>
                <label>Password</label>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-black border-solid p-2 rounded shadow"
                    required
                />
            </div>
            <div className='flex flex-col flex-fill'>
                <label>Confirm Password</label>
                <input
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="text-black border-solid p-2 rounded shadow"
                    required
                />
            </div>
            </form>
            <p className='text-red-500' id='feedback'></p>
            <button
                onClick={handleSignUp}
                className="text-xl flex justify-center items-center bg-yellow-400 px-16 py-2 rounded-2xl shadow-lg border border-black hover:bg-yellow-200" type="submit">
                    Register
            </button>
            <h2 className='text-black'>
                Already have account? go <Link href='/sign-in' className='text-blue-600 decoration-solid hover:text-blue-400'>Sign in</Link>
            </h2>
        </div>
    </div>
  )
}

export default SignIn