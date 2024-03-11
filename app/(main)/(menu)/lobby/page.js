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
        router.push(`/computer`);
    }

    return(
        <div className="w-full justify-center items-center flex py-6">
            <div className="bg-slate-200 flex flex-col justify-center items-center gap-y-10 p-4 w-[960px] h-[600px]">
                <button onClick={createRoom}>Create Room</button>
                <button onClick={playAI}>Play with bot</button>
                <input type='text' value={code} onChange={(e) => setCode(e.target.value)}/>
                <button onClick={joinRoom}>Join Room</button>
            </div>
        </div>
    )
};
