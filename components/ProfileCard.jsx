import React from 'react'

const ProfileCard = ({user}) => {
  return (
    <div className="rounded-3xl p-4 bg-slate-200 flex justify-center items-center h-80 w-32 text-xl flex-1 w-full flex flex-col">
      <div className='w-full text-3xl'>
        Profile
      </div>
      <div className='flex-1 flex items-center text-2xl'>
        Name: {user}
      </div>
    </div>
  )
}

export default ProfileCard