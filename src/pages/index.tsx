import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ChallengeBox } from '../components/ChallengeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import ExperienceBar from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { ChallengesProvider } from '../contexts/ChallengeContext'
import CountdownContextProvider, { CountdownContext } from '../contexts/CountdownContext'

import styles from '../styles/pages/Home.module.css'

interface homeProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Home(props: homeProps) {

  return (
        <ChallengesProvider level={props.level} currentExperience={props.currentExperience} challengesCompleted={props.challengesCompleted}>

      <Head>
        <title>Home</title>
      </Head>

      <div className={styles.container}>

        <ExperienceBar />    

        <CountdownContextProvider>
        <section>

          <div>
            <Profile/>
            <CompletedChallenges/>
            <Countdown />
          </div>

          <div>
            <ChallengeBox/>
          </div>

        </section>   

        </CountdownContextProvider>
      </div>
 
      </ChallengesProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies
  return {
    props:{
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}