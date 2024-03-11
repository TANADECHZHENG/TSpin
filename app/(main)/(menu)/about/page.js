import CardPlayer from "@/components/CardPlayer";

export default function Page() {
    return (
        <div className="w-full flex justify-center items-center flex-row h-full gap-24">
            <CardPlayer name='Kongpop'/>
            <CardPlayer name='Pairat'/>
            <CardPlayer name='Tanadech'/>
        </div>
    )
}