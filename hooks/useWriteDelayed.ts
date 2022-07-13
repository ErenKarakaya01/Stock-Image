import { useState, useEffect } from "react"

// This hook makes an effect like keyboard writing of texts
const useWriteDelayed = (
  writing: string,
  setWriting: React.Dispatch<React.SetStateAction<string>>,
  article: string
) => {
  const [index, setIndex] = useState(0)
  const [time, setTime] = useState(500)

  useEffect(() => {
    setTimeout(() => {
      setIndex((prev) => prev + 1)
      if (/[.,:!?]/.test(article.charAt(index))) setTime(500)
      setWriting((prev) => {
        return prev + article.charAt(index)
      })
      setTime(100)
    }, time)
  }, [writing])
}

export default useWriteDelayed
