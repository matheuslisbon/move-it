import { createContext, useState, ReactNode, useEffect } from "react";
import challenges from '../../challenge.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from "../components/LevelUpModal";


interface ChallengesProviderProps {
  children: ReactNode;
  level: number
  currentExperience: number
  challengesCompleted: number
}
interface Challenge {
  type: 'body'| 'eye'
  description:string
  amount: number
}
interface ChallengesContextData {
  level: number
  currentExperience: number
  levelUp: () => void 
  startNewChallenge: () => void
  resetChallenge: () => void
  challengesCompleted:number
  activeChallenge: Challenge
  experienceToNextLevel:number
  completedChallenge: () => void
  closeLevelModal: () => void
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true)
  }
  useEffect(()=>{
    Notification.requestPermission()
  }, [])

  function closeLevelModal (){
    setIsLevelUpModalOpen(false)
  }
  useEffect(()=> {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)
    new Audio('/notification.mp3').play()
    if(Notification.permission === 'granted'){
      new Notification('Novo desafio', {
        body:`Valendo ${challenge.amount} xp`
      })
    }
    
  }

  function resetChallenge(){
    setActiveChallenge(null)
  }

  function completedChallenge (){
    if(!activeChallenge) {
      return
    }
    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount
  
    if(finalExperience > experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }
    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted+1)
  
  }

  const experienceToNextLevel = Math.pow((level + 1 ) * 4, 2)

  return (
    <ChallengesContext.Provider
      value={{
        startNewChallenge,
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completedChallenge,
        closeLevelModal
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal/> }
    </ChallengesContext.Provider>
  );
}
