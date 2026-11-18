/**
 * src/pages/UsersLocations.jsx
 */



import { useContext, useState, useEffect } from 'react'
import { DBContext } from '../state'


export default function UsersLocations() {
  const { users, locations } = useContext(DBContext)
  const [ userData, setUserData ] = useState("")
  const [ locationData, setLocationData ] = useState("")
  const [ initialized, setInitialized ] = useState(false)
  

  const setUser = ({ target }) => {
    const { value } = target
    const userData = users.find(({ user_id }) => (
      user_id === Number(value)
    ))
    setUserData(JSON.stringify(userData, null, '  '))
  }


  const setLocation = ({ target }) => {
    const { value } = target
    const locationData = locations.find(({ location_id }) => (
      location_id === Number(value)
    ))
    setLocationData(JSON.stringify(locationData, null, '  '))
  }


  const initialize = () => {
    if (initialized) { return }

    if (locations.length) {
      setLocation({ target: { value: locations[0].location_id }})

      if (users.length) {
        setUser({ target: { value: users[0].user_id }})
        setInitialized(true)
      }
    }
  }


  const userOptions = users.map(user => {
    // {
    //   "user_id": 1,
    //   "username": "Anya",
    //   "email": "anya@example.com",
    //   "city": "Moscow",
    //   "bio": null,
    //   "created_at": "2026-11-16T22:18:12.871690"
    // }
    const { user_id, username } = user
    return (
      <option
        key={user_id}
        value={user_id}
      >
        {username}
      </option>
    )
  })


  const locationOptions = locations.map(location => {
    // { location_id: 1,
    //   name: 'Board Game Cafe "Zerno"',
    //   address: "15 Lenin Street",
    //   capacity: 20,
    //   description: "Cozy place for board games"
    // }
    const { location_id, name } = location
    return (
      <option
        key={location_id}
        value={location_id}
      >
        {name}
      </option>
    )
  })


  useEffect(initialize, [users])


  return (
    <details>
      <summary>Users & Locations</summary>
      <select
        onChange={setUser}
      >
        {userOptions}
      </select>
      <pre>{userData}</pre>
      <select
        onChange={setLocation}
      >
        {locationOptions}
      </select>
      <pre>{locationData}</pre>
    </details>
  )
}