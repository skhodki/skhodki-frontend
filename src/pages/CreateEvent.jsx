/**
 * src/pages/CreateEvent.jsx
 */


import { useState, useContext, useEffect } from 'react'
import { DBContext } from '../state'
import Calendar from 'react-calendar'
import TimePicker from '../components/TimePicker'


const INTERVAL = 15


export default function CreateEvent(props) {
  const { users, locations, createEvent } = useContext(DBContext)

  const [ title, setTitle ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ locationData, setLocationData ] = useState({})
  const [ max, setMax ] = useState(10)
  const [ userData, setUserData ] = useState({})
  const [ date, setDate ] = useState(() => trimToZulu(new Date()))
  const [ time, setTime ] = useState(() => trimToTime(new Date()))
  const [ event_date, setEventDate ] = useState(() => (
    getEventDate(date, time)
  ))


  const [ initialized, setInitialized ] = useState(false)


  function trimToZulu (date) {
    const hours = date.getHours() * 3600
    const minutes = date.getMinutes() * 60
    const seconds = date.getSeconds()
    const ms = date.getMilliseconds()
             + 1000 * (seconds + minutes + hours)
    date = new Date(date - ms)

    return date
  }


  function trimToTime (date) {
    const hours = date.getHours()
    const minutes = Math.round(
      (date.getMinutes() / INTERVAL)
    ) * INTERVAL

    const time = (hours * 60 + minutes) * 60000
    return time
  }


  function getEventDate(date, time) {
    return new Date(date.getTime() + time)
  }

  // + event.title,
  // + event.description,
  // + event.location_id
  // event.event_date,
  // event.min_participants,
  // event.max_participants,
  // + event.creator_id




  const initialize = () => {
    if (initialized) { return }

    if (locations.length) {
      locationChange({ target: { value: locations[0].location_id }})

      if (users.length) {
        creatorChange({ target: { value: users[0].user_id }})
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


  const titleChange = ({ target }) => {
    setTitle(target.value)
  }


  const descriptionChange = ({ target }) => {
    setDescription(target.value)
  }


  const locationChange = ({ target }) => {
    const { value } = target
    const locationData = locations.find(({ location_id }) => (
      location_id === Number(value)
    ))
    setLocationData(locationData)
  }


  const maxChange = ({ target }) => {
    setMax(target.value)
  }


  const timeChange = (time) => {
    time = trimToTime(time)
    setTime(time)
    setEventDate(getEventDate(date, time))
  }


  function dateChange (date) {
    date = trimToZulu(date)
    setDate(date)
    setEventDate(getEventDate(date, time))
  }


  const creatorChange = ({ target }) => {
    const { value } = target
    const userData = users.find(({ user_id }) => (
      user_id === Number(value)
    ))
    setUserData(userData)
  }


  const sendCreateEventRequest = (event) => {
    event.preventDefault()

    const payload = {
      title,
      description,
      location_id: locationData.location_id,
      event_date,
      max_participants: max,
      // min_participants DEFAULT = 2
      creator_id: userData.user_id
    }

    createEvent(payload)
  }


  const refreshMax = () => {
    if (!locationData?.capacity) { return }

    setMax(locationData.capacity)
  }


  useEffect(initialize, [users])
  useEffect(refreshMax, [locationData])


  const disabled = !title || !description


  return (
    <form>
      <label>
        <span>Event title</span>
        <input
          type="text"
          value={title}
          onChange={titleChange}
        />
      </label>
      <label>
        <span>Description</span>
        <textarea
          value={description}
          onChange={descriptionChange}
        />
      </label>
      <label>
        <span>Location</span>
        <select
          onChange={locationChange}
        >
          {locationOptions}
        </select>
      </label>

      <label
        className="no-colon"
      >
        <span>
          Max Participants: {max}
        </span>
        <input
          type="range"
          name=""
          id=""
          max={locationData.capacity}
          min={2}
          value={max}
          onChange={maxChange}
        />
      </label>

      <details open>
        <summary>When: {event_date.toLocaleString()}</summary>
        <label>
          <span>Time</span>
          <TimePicker
            onChange={timeChange}
            display={[ "hours", "minutes" ]}
            minutesInterval={INTERVAL}
            date={event_date}
          />
        </label>
        <label>
          <span>Date</span>
          <div className="calendar">
            <Calendar
              minDate={new Date()}
              onChange={dateChange}
              value={event_date}
            />
          </div>
        </label>
      </details>

      <label>
        <span>Creator</span>
        <select
          onChange={creatorChange}
          value={userData.user_id}
        >
          {userOptions}
        </select>
      </label>

      <div className="buttons">
        <button className="primary"
          onClick={sendCreateEventRequest}
          disabled={disabled}
        >
          Create Event
        </button>
      </div>
    </form>
  )
}