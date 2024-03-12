import CreditCard from "@/components/CreditCard";
import img1 from '@/assets/member/64070004.png'
import img2 from '@/assets/member/64070081.png'
import img3 from '@/assets/member/64070157.jpg'
export default function Page() {
    return (
        <div className="w-full flex justify-center items-center mid:flex-row flex-col mt-4 big:mt-0 h-full gap-6 big:gap-24">
            <CreditCard name='นายก้องภพ อ่อนทอง' image={img1} code='64070004'/>
            <CreditCard name='นายไพรัช ชื่นชม' image={img2} code='64070081'/>
            <CreditCard name='นายธนเดช เจิ้ง' image={img3} code='64070157'/>
        </div>

    )
}