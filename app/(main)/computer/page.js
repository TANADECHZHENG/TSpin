'use client'
import CardPlayer from "@/components/CardPlayer";
import FieldAI from "@/components/FieldAI";
import { auth } from "@/app/firebase/config";

export default function Page() {
    return (
        <div className="flex justify-center p-10 items-center h-screen w-full">
            <div className="big:flex-row flex big:gap-24 justify-center flex-col items-center ">
                <CardPlayer player='X' name={auth.currentUser.displayName} color='border-rose-600'/>
                <div className="w-[500px] flex items-center justify-center">
                    <FieldAI />
                </div>
                <CardPlayer player='O' name='Computer' color='border-indigo-600'/>
            </div>
        </div>
    )
}