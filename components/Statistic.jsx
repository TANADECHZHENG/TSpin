import React from 'react'

const Statistic = ({score, win, lose, draw}) => {
  return (
    <div className="rounded-3xl bg-slate-200 flex flex-col items-center h-80 w-64 py-4">
      <h1>Statistic</h1>
      <ul>
        <li>
          Score: {score}
        </li>
        <li>
          Win: {win}
        </li>
        <li>
          Lose: {lose}
        </li>
        <li>
          Draw: {draw}
        </li>
      </ul>
    </div>
  )
}

export default Statistic