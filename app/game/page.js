import CardPlayer from "@/components/CardPlayer";
import Field from "@/components/Field";

export default function Page() {
    return (
        <div className="flex justify-center p-10 items-center h-screen w-full">
            <div className="flex-row flex gap-48 justify-center items-start ">
                <CardPlayer />
                <div className="bg-slate-500 w-[450px] h-[480px] flex items-center justify-center">
                    <Field />
                </div>
                <CardPlayer />
            </div>
        </div>
    )
}