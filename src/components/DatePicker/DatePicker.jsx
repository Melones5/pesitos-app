import React, { useState } from 'react'
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { es } from 'date-fns/locale'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'



const DatePicker = ({ selectedDate, onDateChange }) => {

  const [isShowCalendar, setIsShowCalendar] = useState(false)

  const dateFormattedToCalendarPreview = format(
    selectedDate,
    "dd 'de' MMMM 'de' yyyy",
    { locale: es },
  )

  let footer = (
    <p className="text-gray-500 dark:text-gray-400">
      Por favor, seleccione una fecha.
    </p>
  )

  if (dateFormattedToCalendarPreview) {
    footer = (
      <p className="text-gray-700">
        Usted seleccionó{' '}
        <span className="font-medium text-background-primary">
          {dateFormattedToCalendarPreview}
        </span>
        .
      </p>
    )
  }

  const dateFormattedToInput = format(selectedDate, 'dd/MM/yyyy', {
    locale: es,
  })

  const WHITE = '#FFFFFF'
  const BROWN = {
    300: '#3A2834',
  }
  const GRAY = {
    700: '#363F5F',
  }


  const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    font-weight: 600;
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: ${BROWN[300]};
    color: ${BROWN[300]} !important;
  }
  .my-today { 
    font-weight: bold;
    font-weight: 600;
    background-color: ${BROWN[300]}; 
    color: ${WHITE} !important;
  }
  `;


  function handleToggleCalendar() {
    setIsShowCalendar(!isShowCalendar)
  }


  return (
    <div className="relative">
      <button
        className='w-full px-6 py-5 cursor-pointer border border-gray-200 text-left text-gray-700 font-medium flex rounded-md items-center justify-between transition-all duration-400 focus-within:border-background-primary focus-within:ring-1 focus-within:ring-background-primary focus:outline-none hover:bg-white bg-white'
        id="calendar-button"
        type="button"
        onClick={handleToggleCalendar}
      >
        {dateFormattedToInput}
        <FontAwesomeIcon icon={faCalendar} className='text-background-primary' />
      </button>
      {isShowCalendar && (
        <div className='absolute bottom-20 right-0 z-10 rounded-md border-2 
        border-background-primary bg-white shadow-md drop-shadow-md 
        '>
          <style>{css}</style>
          <DayPicker
            mode="single"
            locale={es}
            selected={selectedDate}
            onSelect={(date) =>
              onDateChange(date !== undefined ? date : selectedDate)
            }
            modifiersClassNames={{
              today: 'my-today',
              selected: 'my-selected',
            }}
            footer={footer}
            styles={{
              caption: {
                color: BROWN[300],
                textTransform: 'capitalize',
              },
              months: {
                justifyContent: 'end',
              },
              nav_icon: {
                color: BROWN[300],
              },
              day: {
                color: GRAY[700],
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default DatePicker