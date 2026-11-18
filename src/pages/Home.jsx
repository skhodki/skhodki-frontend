/**
 * src/pages/Home.jsx
 */


import { useContext, useState, useEffect } from 'react'
import { DBContext } from '../state'
import CreateEvent from './CreateEvent'


export default function Home() {


  return (
    <>
      <CreateEvent />
    </>
  )
}