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
        <div className="flex flex-row p-5 gap-8 justify-center items-center">
            <ProfileCard user={userData.username}/>
            <Statistic
            score={userData.score}
            win={userData.win}
            lose={userData.lose}
            draw={userData.draw}/>
        </div>
    )
}