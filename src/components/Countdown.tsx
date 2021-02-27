import styles from '../styles/components/Countdown.module.css'
import {useContext, useEffect, useState} from 'react'
import { CountdownContext } from '../contexts/CountdownContext'

let countdownTimeout: NodeJS.Timeout

export function Countdown (){
  const {minutes, seconds, resetCountdown, hasFinished, isActive, startCountdown} = useContext(CountdownContext)


  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')
  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>  

    { hasFinished ?(
        <button type='button' onClick={ resetCountdown }
        disabled
        className={styles.countdownButton}>
          Finalizou
        </button>      
    ): (
      <>
        { isActive? (
          <button type='button' onClick={ resetCountdown }
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
            Abondonar ciclo
          </button>          
        ):(

          <button type='button' onClick={ startCountdown } className={styles.countdownButton}>
            Iniciar ciclo
          </button>  
        )}
      </>
    ) }

    </div>
  ) 
}