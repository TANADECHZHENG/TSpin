'use client'
import CardPlayer from "@/components/CardPlayer";
import Field from "@/components/Field";
import { auth, database } from "@/app/firebase/config";
import { useEffect, useState, React } from "react";
import { useRouter } from "next/navigation";
import { onValue , ref, update, remove } from "firebase/database";
import JoinRoomPop from "@/components/JoinRoomPop";

export default function Page( {params} ) {
    const [isHost, setIsHost] = useState(false);
    const [isChallenger, setIsChallenger] = useState(false);
    const [boardData, setBoardData] = useState({});

    const router = useRouter();
    const userRef = ref(database, `rooms/${params.id}`);
    useEffect(() => {
        if (userRef){
            try{
                onValue(userRef, async (snapshot) => {
                    const data = snapshot.val()
                    setBoardData(data);
                    setIsHost(data.host === auth.currentUser.uid);
                    setIsChallenger(auth.currentUser.uid === data.challenger);
                })
            }catch(error){
                console.log(error);
            }
        }
    }, []);

    useEffect(() => {
        console.log("isHost updated:", isHost);
        console.log("isChallenger updated:", isChallenger);
        // Perform additional actions here
    }, [isHost, isChallenger]);


    const leaveRoom = async () => {
		if (isHost) {
            const newHost = boardData.challenger;
            const newName = boardData.playerO;
            setIsHost(false)
			await update(userRef, {
                host: newHost,
                playerX: newName,
				challenger: null,
                playerO: null,
			});
		} else if (isChallenger) {
            // setIsChallenger(false)
            await update(userRef, {
                challenger: null,
                playerO: null,
			});
		}

        if (isHost == false && isChallenger == false){
            await remove(userRef);
            console.log('Leave cleared');
        }
        router.back();
	};

    const startGame = async () => {
        await update(userRef, {
            turn: 'X'
        })
    }

    return (
        <div className="flex flex-col justify-center p-10 items-center h-screen w-full">
            <h2 className="font-bold text-2xl mb-6">
                Roomcode: {params.id}
            </h2>
            <div className="flex-row flex gap-48 justify-center items-start ">
                <CardPlayer name={(!boardData.playerX) ? 'Waiting for a player...' : boardData.playerX}/>
                <div className="bg-slate-500 w-[500px] h-[560px] flex items-center justify-center">
                    {
                        boardData.turn ?
                        <Field code={params.id} playerO={boardData.challenger} playerX={boardData.host}/> :
                        <JoinRoomPop />
                    }
                </div>
                <CardPlayer name={(!boardData.playerO) ? 'Waiting for a player...' : boardData.playerO}/>
            </div>
            {!boardData.turn ?
                <div className="flex gap-20 mt-10">
                    <button
                        className="font-bold bg-yellow-500 text-white px-8 py-3 rounded-3xl hover:bg-yellow-400 shadow-lg"
                        disabled={boardData.playerO && boardData.playerX && isHost ? false : true}
                        onClick={startGame}>
                        Start Game
                    </button>
                    <button
                        className="font-bold bg-yellow-500 text-white px-8 py-3 rounded-3xl hover:bg-yellow-400 shadow-lg"
                        onClick={leaveRoom}>
                        Exit Room
                    </button>
                </div>
            : null}
        </div>
    )
}