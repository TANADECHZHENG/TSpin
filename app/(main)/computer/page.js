'use client'
import CardPlayer from "@/components/CardPlayer";
import FieldAI from "@/components/FieldAI";
import { auth } from "@/app/firebase/config";

export default function Page() {
    return (
        <div className="flex justify-center p-10 items-center h-screen w-full">
            <div className="flex-row flex gap-48 justify-center items-start ">
                <CardPlayer name={auth.currentUser.displayName}/>
                <div className="bg-slate-500 w-[500px] h-[560px] flex items-center justify-center">
                    <FieldAI />
                </div>
                <CardPlayer name='Computer'/>
            </div>
        </div>
    )
}