import Link from "next/link";

export default function Page() {

    return (
        <div className="h-full flex justify-center items-center">
            <div className="rounded-2xl bg-slate-100 h-96 w-96 flex items-center flex-col gap-8 justify-center">
                <form className="flex flex-col px-4 gap-2">
                    <h3 className="text-yellow-950 font-medium">Email</h3>
                    <input type='email' className="text-black border-solid"></input>
                    <h3 className="text-yellow-950 font-medium">Password</h3>
                    <input type='password' className="text-black border-solid"></input>
                </form>
                <button className="flex justify-center items-center bg-yellow-400 px-12 py-2 rounded-2xl" type="submit">
                    <Link href='/lobby'>sign Up</Link>
                </button>
            </div>
        </div>
    );
}