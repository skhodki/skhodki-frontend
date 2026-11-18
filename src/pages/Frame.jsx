/**
 * src/pages/Frame.jsx
 *
 * <Frame> is mounted by default.
 */

import { useContext, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { DBContext } from '../state'
import Tabs from './Tabs'
import '../css/frame.css'



export default function Frame() {
  const { users, locations } = useContext(DBContext)


  return (
    <div id="frame">
      <div>
        <Tabs />
        <Outlet />
      </div>
    </div>
  )
}