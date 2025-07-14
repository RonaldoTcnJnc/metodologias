import React, {use, useState} from 'react'

export default function ComponentesMain() {

    const[text,setText]=useState
    const textOnChange = (event) => {event.target.value}

  return (
    <div>
        <input type="text" value={text} onChange={textOnChange} />
        <button>Iniciar Sesion</button>
        <button>Registrarse</button>
    </div>
  )
}
