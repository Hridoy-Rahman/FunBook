/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar } from '../components'

const Home = () => {

  const user = useSelector(state => state.user)
  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default Home