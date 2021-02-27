import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal(){
  const {level, closeLevelModal} = useContext(ChallengesContext)

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
       <header>
         {level}
       </header>

       <strong>Parabéns</strong>

       <p>você alcançou um novo level</p>

       <button onClick={closeLevelModal}>
         <img src="/icons/close.svg" alt="fechar"/>
       </button>
      </div>      
    </div>

  )
}