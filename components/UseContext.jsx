import React, { createContext, useState, useEffect } from 'react'

const ToggleContext = createContext()

export default function UseContext({ children }) {
  const [isToggled, setIsToggled] = useState(false)
  const [theme, setTheme] = useState("light")

  const toggle = () => {
    setIsToggled(prevState => !prevState)
  }

  function toggleTheme() {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light") 
  }

  return (
    <ToggleContext.Provider value={{ isToggled, toggle, theme, toggleTheme }}>
      {children}
    </ToggleContext.Provider>
  )
}

export {ToggleContext}
