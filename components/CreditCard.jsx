import Image from 'next/image'
import React from 'react'

const CreditCard = ({name, image, handle}) => {
  return (
    <div className="rounded-3xl bg-slate-200 w-64 h-72 flex justify-center items-center pt-4">
      <h1 className='text-center text-xl'>{name}</h1>
      <Image src={image} width={100} height={100}/>
    </div>
  )
}

export default CreditCard