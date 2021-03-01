import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import React, { useState, useEffect } from 'react'
import Star from '../components/star.tsx'
import GamePanel from '../components/gamePanel.tsx'

export default function Home(): JSX.Element {

  const [status, setStatus] = useState<boolean>(true)
  const [regulator, setRegulator] = useState<boolean>(true)
  const [stars, setStars] = useState<(number|null)[]>([])
  const [sum, setSum] = useState<number>(0)

  useEffect(():any => {
    const starsCreatingInterval = setInterval((): void => {
      createStar()
    }, 2200)
    return () => clearInterval(starsCreatingInterval)
  }, [status])

  const changeStatus = ():void => {
    setStatus(status => !status)
  }

  const restart = ():void => {
    setStatus(status => !status)
    setSum(0)
    setStars([])
    setTimeout((): void => {
      setStatus(true)
    }, 100)
  }

  const createStar = ():void => {
    if(status === true) {
      if(stars.filter(star => star !== null).length < 3) {
        setTimeout((): void => {
          let arrayCopy: (number|null)[] = stars
  
          let randomNum: number = Math.ceil(Math.random()*10)
          if(randomNum > 5) {
            randomNum -= 11
          }
          if(stars.indexOf(null) !== -1) {
            arrayCopy.splice(stars.indexOf(null), 1, randomNum)
          } else {
            arrayCopy[stars.length] = randomNum
          }
          setStars(arrayCopy)
          setRegulator((prevValue) => !prevValue)

        },  Math.random() * 1500)
      }
    }
  } 

  const deleteStar = (id, value):void => {
    let arrayCopy: (number|null)[] = stars
    arrayCopy.splice(id, 1, null)
    setSum((sum) => sum + value)
    setStars(arrayCopy)
  }

  const starDisplay = ():(number|null)[] => stars.map((item, index):any => {
      if(item !== null) {
        return (
          <Star 
            key={index} 
            value={item} 
            status={status}
            index={index} 
            deleteStar={deleteStar} 
          />
        )
      }
  })

  return (
    <div>
      <Head>
        <title>sirius-test app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <GamePanel 
          status={status}
          sum={sum}
          changeStatus={changeStatus}
          restart={restart}
        />
        <div className={styles.gameZone}>
          { starDisplay() }
        </div>
      </div>

    </div>
  )
}
