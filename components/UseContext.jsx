import React, { createContext, useState, useEffect, useRef } from 'react'

const ToggleContext = createContext()

export default function UseContext({ children }) {
  const [isToggled, setIsToggled] = useState(false)
  const [theme, setTheme] = useState("light")
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const navbarRef = useRef(null)


  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        // Check if viewport height decreased (indicating keyboard opening)
        if (entry.contentRect.height < entry.contentRect.width) {
          setIsKeyboardOpen(true)
        } else {
          setIsKeyboardOpen(false)
        }
      }
    })

    observer.observe(document.documentElement)

    return () => {
      observer.disconnect()
    }
  }, [])

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
        isKeyboardOpen
      }
    }>
      {children}
    </ToggleContext.Provider>
  )
}

export {ToggleContext}
