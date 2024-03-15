import React from 'react'

const CardPlayer = ({ player, name, color }) => {
  return (
    <div className={`rounded-[100px] bg-slate-200 w-64 big:w-64 h-24 big:h-64 flex justify-center big:justify-evenly flex-col items-center py-2 big:pb-12 border-solid border-4 ${color}`}>
        <h1 className='text-center text-3xl'>Player: {player}</h1>
        <h2 className='text-center text-2xl'>{name}</h2>
    </div>
  );
};

export default CardPlayer