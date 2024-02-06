import React, { createContext, useState, useEffect, useRef } from 'react'

const ToggleContext = createContext()

export default function UseContext({ children }) {
  const [isToggled, setIsToggled] = useState(false)
  const [theme, setTheme] = useState("light")
  const navbarRef = useRef(null)
  const [isTyping, setIsTyping] = useState(false)

  const toggle = () => {
    setIsToggled(prevState => !prevState)
  }

  function toggleTheme() {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light") 
  }

  function handleFocus() {
    setIsTyping(true)
  }

  function handleBlur() {
    setIsTyping(false)
  }
  useEffect(() => {
    if (isTyping) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isTyping])

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
        handleBlur, handleFocus, isTyping
      }
    }>
      {children}
    </ToggleContext.Provider>
  )
}

export {ToggleContext}
