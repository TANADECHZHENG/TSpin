import React from 'react'

const Statistic = ({score, win, lose, draw}) => {
  return (
    <div className="rounded-3xl bg-slate-200 flex flex-col justify-center items-center h-80 w-64 p-4 w-full flex-[2_2_0%]">
      <div className='flex justify-start text-3xl w-full'>
        <h1>Statistics</h1>
      </div>
      <div className='w-full flex flex-1 flex-row gap-8 justify-center items-center text-2xl text-center'>
        <div className='flex-1 flex flex-col items-center'>
          <div>
            Score
          </div>
          <div>
            {score}
          </div>
        </div>
        <div className='flex-1 flex flex-col items-center'>
          <div>
            Total Match
          </div>
          <div>
            {win + lose + draw}
          </div>
        </div>
        <div className='flex-1 flex flex-col items-center'>
          <div>
            Win Rate
          </div>
          <div>
            {win / (win + lose + draw == 0 ? 1 : win + lose + draw) * 100 + "%" }
          </div>
        </div>
      </div>
      <div className='py-4 flex flex-row text-xl w-full'>
        <div className='flex flex-col py-2 items-center min-w-fit' style={{flex: win + lose + draw == 0 ? 1 : win / (win + lose + draw) * 100}}>
          <div className='text-2xl text-green-500'>{win / (win + lose + draw == 0 ? 1 : win + lose + draw) * 100 + "%" }</div>
          <div className='bg-green-500 h-[10px] w-full'></div>
          <div>Win {win}</div>
        </div>
        <div className='flex flex-col py-2 items-center min-w-fit' style={{flex: win + lose + draw == 0 ? 1 : draw / (win + lose + draw) * 100}}>
          <div className='text-2xl text-gray-600'>{draw / (win + lose + draw == 0 ? 1 : win + lose + draw) * 100 + "%" }</div>
          <div className='bg-gray-300 h-[10px] w-full'></div>
          <div>Draw {draw}</div>
        </div>
        <div className='flex flex-col py-2 items-center min-w-fit' style={{flex: win + lose + draw == 0 ? 1 : lose / (win + lose + draw) * 100}}>
          <div className='text-2xl text-red-500'>{lose / (win + lose + draw == 0 ? 1 : win + lose + draw) * 100 + "%" }</div>
          <div className='bg-red-500 h-[10px] w-full'></div>
          <div>Lose {lose}</div>
        </div>
      </div>
    </div>
  )
}

export default Statistic