import Image from 'next/image'
import React from 'react'

const CreditCard = ({name, image, code}) => {
  return (
    <div className="rounded-3xl bg-slate-200 w-64 h-72 flex flex-col gap-y-4 justify-center items-center p-4">
      <h1 className='text-center text-xl'>{name}</h1>
      <div>
        <Image className='rounded-full w-40 h-40 object-cover border-solid border-4 border-yellow-400' src={image} alt='member' loading="lazy"/>
      </div>
      <h1 className='text-center text-xl'>{code}</h1>
    </div>
  )
}

export default CreditCard