import CreditCard from "@/components/CreditCard";
import img1 from '@/assets/member/64070004.png'
import img2 from '@/assets/member/64070081.png'
import img3 from '@/assets/member/64070157.jpg'
export default function Page() {
    return (
        <div className="w-full flex justify-center items-center flex-row h-full gap-24">
            <CreditCard name='Kongpop' image={img1}/>
            <CreditCard name='Pairat' image={img2}/>
            <CreditCard name='Tanadech' image={img3}/>
        </div>
    )
}