import React from "react";
import './Calendar.css'

const Calendar: React.FC<{}> = () => {
  
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const daysLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const daysOfTheWeek = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag']
  const months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']
  // const [selectedDate, setSelectedDate] = React.useState<string | null>();

  // const handleChange = (e: React.MouseEvent<HTMLDivElement>) => {
  //   setSelectedDate(e.currentTarget.getAttribute('value'))
  // }

  const getStartDayOfMonth = (date: Date) =>{
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    return startDate === 0 ? 7 : startDate
   
  }
  const today = new Date()
  const [date, setDate] = React.useState(today)
  const [day, setDay] = React.useState(date.getDate())
  const [month, setMonth] = React.useState(date.getMonth())
  const [year, setYear] = React.useState(date.getFullYear())
  const [startDay, setStartDay] = React.useState(getStartDayOfMonth(date))

  React.useEffect(() => {
    setDay(date.getDay())
    setMonth(date.getMonth())
    setYear(date.getFullYear())
    setStartDay(getStartDayOfMonth(date))
  }, [date])

  const isLeapYear = (year: number) => {
   return (year % 4 === 0 && year % 100 !== 0 ) || year % 400 === 0
  }
  const displayDays = isLeapYear(year) ? daysLeap : days
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
          {daysOfTheWeek.map((daysText) => (
            <div
              key={daysText}
              className="days-container"
            >
              <p>{daysText}</p>
            </div>
          ))}
          {Array(displayDays[month] + (startDay - 1)).fill(null).map((_, index) => {
            const daysNumber = index - (startDay - 2)
            const checkToday = index + 1 === today.getDate() ;
            return (
              <div>
              <div
                key={index}
                // onClick={() => setDate(new Date(year, month, daysNumber))}
                // onClick={() => console.log(daysNumber, index)}
                className={checkToday ? 'days-container-today' : 'days-container'}
              >
                  {daysNumber > 0 ? daysNumber : ''}                
                </div>
              </div>
              )
            })}
        </div>                                
      </div>     
    </div>
  )
}
export default Calendar;