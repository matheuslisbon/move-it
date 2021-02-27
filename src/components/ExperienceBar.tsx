import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/ExperienceBar.module.css'

export default function ExperienceBar (){
  const {currentExperience, experienceToNextLevel} = useContext(ChallengesContext)

  const percentToNextLevel = (currentExperience * 100) / experienceToNextLevel

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>

        <div style={{width:`${percentToNextLevel}%` }}/>

        <span className={styles.currentExperience} style={{left:`${percentToNextLevel}%`}} >{currentExperience} xp</span>
      
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}