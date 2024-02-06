import React, { createContext, useState, useEffect, useRef } from 'react'

const ToggleContext = createContext()

export default function UseContext({ children }) {
  const [isToggled, setIsToggled] = useState(false)
  const [theme, setTheme] = useState("light")
  const navbarRef = useRef(null)

  const toggle = () => {
    setIsToggled(prevState => !prevState)
  }

  function toggleTheme() {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light") 
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
      { isToggled, toggle, theme, 
        toggleTheme, navbarRef,  setIsToggled,
      }
    }>
      {children}
    </ToggleContext.Provider>
  )
}

export {ToggleContext}
