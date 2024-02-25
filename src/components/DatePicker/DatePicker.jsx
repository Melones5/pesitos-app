import React, { useState } from 'react'
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { es } from 'date-fns/locale'


const DatePicker = () => {
  const [selected, setSelected] = useState();

  let footer = <p>Por favor, elija una fecha</p>;
  if (selected) {
    footer = <p>Elegiste {format(selected, 'PP')}.</p>;
  }

  return (
    <DayPicker
      mode="single"
      locale={es}
      selected={selected}
      onSelect={setSelected}
      footer={footer}
    />
  );
}

export default DatePicker