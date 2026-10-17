import { useState } from 'react'

function useTheme() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  const toggleTheme = () => {
    const dark = document.documentElement.classList.toggle('dark')
    setIsDark(dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {}
  }

  return { isDark, toggleTheme }
}

export default useTheme