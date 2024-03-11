'use client'
import { auth, database } from "@/app/firebase/config";
import { ref, set, get, update } from 'firebase/database';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    // const [isHost, setIsHost] = useState(false);
    // const [isChallenger, setIsChallenger] = useState(false);
    const [code, setCode] = useState('')
    const router = useRouter();
    const createRoom = async () => {
		const roomCode = Math.floor(100000 + Math.random() * 900000);
		const roomRef = ref(database, `rooms/${roomCode}`);
		try {
			await set(roomRef, {
                host: auth.currentUser.uid,
                challenger : '',
				playerX: auth.currentUser.displayName,
				playerO: '',
                turn: '',
                board: ['', '', '', '',
                        '', '', '', '',
                        '', '', '', '',
                        '', '', '', ''
                       ],
                winner: ''
			});
            // setIsHost(roomRef.host == auth.currentUser.uid ? true : false);
            // setIsChallenger(roomRef.host != auth.currentUser.uid ? true : false);
            console.log(auth.currentUser.displayName)
            router.push(`/${roomCode}`);
		} catch (error) {
			console.error(error);
		}
	};

    const joinRoom = async () => {
        const roomRef = code != '' ? ref(database, `rooms/${code}`) : null;
		const room = code != '' ? (await get(roomRef)).val() : null;
        if (room) {
			try {
				const host = room.host;
				const challenger = room.challenger;

				// if (host === auth.currentUser.uid) {
                //     router.push(`/${code}`);
				// 	return;
				// }

				if (challenger && challenger !== auth.currentUser.uid) {
					alert('Room is full');
				} else {
					update(roomRef, {
						challenger: auth.currentUser.uid,
                        playerO: auth.currentUser.displayName
					});
                    router.push(`/${code}`);
				}
			} catch (error) {
				console.log(error);
				alert('Failed to join room');
			}
		} else {
			alert('Room not found');
		}
    }


    const playAI = async () => {
        router.push(`/game`);
    }

    return(
        <div className="w-full h-full justify-center items-center flex py-6">
            <div className="border-4 border-[#FFFFFFBB] p-2 w-full mx-2 mid:mx-10 big:w-[960px] rounded-[75px]">
                <div className="flex flex-col justify-center items-center gap-10 p-4 py-20 w-full h-full rounded-[75px] border-4 border-[#FFFFFFBB]">
                    <button className="text-xl flex justify-center items-center bg-yellow-400 px-12 py-2 rounded-2xl shadow-lg border border-black" onClick={createRoom}>Create Room</button>
                    <button className="text-xl flex justify-center items-center bg-yellow-400 px-12 py-2 rounded-2xl shadow-lg border border-black" onClick={playAI}>Play with bot</button>
                    <div className="flex flex-col">
                        <label className="text-lg">Room Code:</label>
                        <input  className="p-2 rounded shadow" type='text' value={code} onChange={(e) => setCode(e.target.value)}/>
                        <button className="text-xl flex justify-center items-center bg-yellow-400 px-12 py-2 mt-2 rounded-2xl shadow-lg border border-black" onClick={joinRoom}>Join Room</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
