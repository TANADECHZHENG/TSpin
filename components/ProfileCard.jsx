import React from 'react'

const ProfileCard = ({user}) => {
  return (
    <div className="rounded-3xl bg-slate-200 flex justify-center items-center h-80 w-32">{user}</div>
  )
}

export default ProfileCard