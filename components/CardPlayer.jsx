import React from 'react'

const CardPlayer = ({name}) => {
  return (
    <div className="rounded-3xl bg-slate-200 w-64 h-72 flex justify-center pt-4">
        <h1 className='text-center'>{name}</h1>
    </div>
  )
}

export default CardPlayer