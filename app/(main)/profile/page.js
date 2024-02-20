import ProfileCard from "@/components/ProfileCard";
import Statistic from "@/components/Statistic";

export default function Page() {
    return(
        <div className="flex flex-row p-5 gap-8 justify-center items-center">
            <ProfileCard />
            <Statistic />
        </div>
    )
}