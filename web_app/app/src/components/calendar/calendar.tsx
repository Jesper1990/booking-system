import React, { useState, useEffect } from "react";
import './Calendar.css'

const Calendar = () => {
  // const test = new Date().toString().split('20')[0]
  // console.log(test)
  // const test = new Date()
  // const month = test.toLocaleString('sv-SE', { month: 'long', day: 'numeric', year: 'numeric'})
  // console.log(month);
 
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const daysLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const daysOfTheWeek = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag']
  const months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']

  function getStartDayOfMonth(date: Date) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    return startDate === 0 ? 7 : startDate
  }
  const today = new Date()
  const [date, setDate] = React.useState(today)
  const [day, setDay] = React.useState(date.getDate())
  const [month, setMonth] = React.useState(date.getMonth())
  const [year, setYear] = React.useState(date.getFullYear())
  const [startDay, setStartDay] = React.useState(getStartDayOfMonth(date))

  useEffect(() => {
    setDay(date.getDay())
    setMonth(date.getMonth())
    setYear(date.getFullYear())
    setStartDay(getStartDayOfMonth(date))
  }, [date])

  function isLeapYear(year: number) {
   return (year % 4 === 0 && year % 100 !== 0 ) || year % 400 === 0
  }
  const displayDays = isLeapYear(year) ? daysLeap : days

  const isToday = () => {
    if (today === date)
      return true
  }
  return (
    <div className="main">
      <div className="content">
        <div className="month-year">
          <button onClick={() => setDate(new Date(year, month - 1, day))}>Föregående</button>
            <div>
              {months[month]} {year}
            </div>
          <button onClick={() => setDate(new Date(year, month + 1, day))}>Nästa</button>
        </div>
        <div className="days-of-week">
          {daysOfTheWeek.map((d) => (
            <div key={d}>
              <p>{d}</p>
            </div>
          ))}
          </div>
          <div className="days-number">
            {Array(displayDays[month] + (startDay - 1)).fill(null).map((_, index) => {
            const d = index - (startDay - 2)
            return (
              <div
                key={index}
                onClick={() => setDate(new Date(year, month, d))}
              >
                {d > 0 ? d : ''}
              </div>
            )
          })}
          </div>          
                
      </div>     
    </div>
  )
}
export default Calendar;