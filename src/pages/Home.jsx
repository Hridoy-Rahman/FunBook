/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar, ProfileCard } from '../components'

const Home = () => {

  const {user} = useSelector(state => state.user)
  return (
    <div className='w-full px-0  bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
      <Navbar/>


      <div>
        {/* LEFT */}
        <div>
        <ProfileCard user={user} />
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