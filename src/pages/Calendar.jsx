import { useState } from 'react'
import Calendar from 'react-calendar'

export function Calendar({  }) {
  const [value, setValue] = useState(new Date())


  const onChange = ({ target }) => {
    setValue(target.value)
  }

  return (
    <details>
      <summary>{value}</summary>
      <div className="calendar">
        <Calendar
          minDate={new Date()}
          onChange={onChange}
          value={value}
        />
      </div>
    </details>
  );
}