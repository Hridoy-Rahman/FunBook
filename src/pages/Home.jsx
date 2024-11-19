/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar, ProfileCard } from '../components'
import FriendsCard from '../components/FriendsCard'

const Home = () => {

  const {user} = useSelector(state => state.user)
  return (
    <div className='w-full px-0  bg-bgColor'>
      <Navbar/>


      <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
        {/* LEFT */}
        <div className='mx-4 flex flex-col gap-4 py-4'>
        <ProfileCard user={user} />
        <FriendsCard friends={user?.friends}/>
        </div>

        {/* CENTER */}

        <div>

        </div>

        {/* RIGHT */}
        <div>

        </div>
      </div>
    </div>
  )
}

export default Home