import React, { createContext, useState, useEffect, useRef } from 'react'

const ToggleContext = createContext()

export default function UseContext({ children }) {
  const [isToggled, setIsToggled] = useState(false)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const navbarRef = useRef(null)


  const toggle = () => {
    setIsToggled(prevState => !prevState)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsToggled(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <ToggleContext.Provider value={
      { isToggled, toggle, 
         navbarRef,  setIsToggled,
        isKeyboardOpen
      }
    }>
      {children}
    </ToggleContext.Provider>
  )
}

export {ToggleContext}
