import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { ChallengesContext } from './ChallengeContext'

interface CountdownProviderData{
  hasFinished: boolean
  isActive:boolean
  minutes: number
  seconds:number
  startCountdown: ()=> void,
  resetCountdown: ()=> void
}

export const CountdownContext = createContext({} as CountdownProviderData)
interface CountdownContextProviderProps{
  children: ReactNode
}

let countdownTimeout: NodeJS.Timeout


export default function CountdownContextProvider ({children}:CountdownContextProviderProps){

  const {startNewChallenge} = useContext(ChallengesContext)

  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(25 * 60)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  
  function startCountdown (){
    setIsActive(true)
  }
  
  function resetCountdown(){
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime( 25 * 60)
    setHasFinished(false)
  }
  useEffect(()=>{
    if(isActive && time > 0){
      countdownTimeout = setTimeout(()=>{
        setTime(time - 1)
      }, 1000)
    }else if (isActive && time === 0){
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }

  }, [isActive, time])

  

  return (
    <CountdownContext.Provider value={{
      hasFinished,
      isActive,
      minutes,
      seconds,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}