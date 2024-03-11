'use client'
import { useAuthContext } from "@/app/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, React } from "react";


export default function load({ children }){
    const { user } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (user == null) router.push("/")
    }, [user])
    return (
        <div className="flex h-screen flex-col">
            <main className="flex-1">
                {children}
            </main>
        </div>
    )
}