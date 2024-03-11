'use client'
import React from 'react'
import Link from 'next/link'

const Button = ({text, link}) => {
  return (
    <button className='flex justify-center items-center bg-yellow-400 px-12 py-2 mx-10 rounded-2xl'>
        <Link href={link}>{text}</Link>
    </button>
  )
}

export default Button