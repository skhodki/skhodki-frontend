/**
 * src/state/DBContext.jsx
 *
 * description
 */


import { createContext, useState, useEffect } from 'react'


const isDev = /517\d/.test(location.port)
console.log("isDev:", isDev)
const END_POINTS = {
  users: `${isDev ? "/api" : ""}/users`,
  locations: `${isDev ? "/api" : ""}/locations`,
  events: `${isDev ? "/api" : ""}/events`,
}


export const DBContext = createContext()


export const DBProvider = ({ children }) => {
  const [ users, setUsers ] = useState([])
  const [ locations, setLocations ] = useState([])


  const createEvent = payload => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
    fetch(END_POINTS.events, options)
    .then(response => response.json())
    .then(json => console.log(
      "json", JSON.stringify(json, null, '  '))
    )
  }
  

  const getUsers = () => {
    fetch(END_POINTS.users)
    .then(response => response.json())
    .then(users => setUsers(users))
    .catch(error => console.warn(error))
  }


  const getLocations = () => {
    fetch(END_POINTS.locations)
    .then(response => response.json())
    .then(locations => setLocations(locations))
    .catch(error => console.warn(error))
  }


  const getDBBasics = () => {
    getUsers()
    getLocations()
  }


  useEffect(getDBBasics, [])


  return (
    <DBContext.Provider
      value ={{
        locations,
        setLocations,
        users,
        setUsers,
        createEvent
      }}
    >
      {children}
    </DBContext.Provider>
  )
}


export default {
  label: "DB",
  Context: DBContext,
  Provider: DBProvider
}
