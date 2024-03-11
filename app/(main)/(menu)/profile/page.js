'use client'
import { auth, database } from "@/app/firebase/config";
import ProfileCard from "@/components/ProfileCard";
import Statistic from "@/components/Statistic";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function Page() {
    const [userData, setUserData] = useState([])
    const userRef = ref(database, `Scoreboard/${auth.currentUser.uid}`)
    
    useEffect(() => {
        try {
            onValue(userRef, async (snapshot) => {
                const data = snapshot.val()
                setUserData(data);
                console.log(data)
            })
        } catch (err) {
            console.log(err);
        }
    }, [])


    return(
        <div className="w-full h-full justify-center items-center flex py-6">
            <div className="border-4 border-[#FFFFFFBB] p-2 w-full mx-2 mid:mx-10 big:w-[960px] rounded-[75px]">
                <div className="flex flex-col justify-center items-center gap-2 p-4 py-8 w-full h-full rounded-[75px] border-4 border-[#FFFFFFBB]">
                    <div className="flex flex-row p-5 gap-8 justify-center items-center">
                        <ProfileCard user={userData.username}/>
                        <Statistic
                        score={userData.score}
                        win={userData.win}
                        lose={userData.lose}
                        draw={userData.draw}/>
                    </div>
                </div>
            </div>
        </div>
    )
}