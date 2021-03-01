import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.scss'

export default function GamePanel(props): JSX.Element {

  const [timer, setTimer] = useState<number>(0)

  useEffect(():any => {
    const timerInterval = setInterval((): void => {
      if(props.status === true) {
        setTimer(time => time + 1000)
      }
    }, 1000)
    return () => clearInterval(timerInterval)
  }, [props.status])

  const statusButton = ():JSX.Element => {
    if(props.status === true) {
      return (
        <button onClick={props.changeStatus}>Пауза</button>
      )
    } else {
      return (
        <button onClick={props.changeStatus}>Продолжить</button>
      )
    }
  }

  const restart = ():void => {
    setTimer(0)
    props.restart()
  }

  return (
    <div className={styles.gamePanel}>
      <p>Текущая сумма: { props.sum }</p>
      {timer > 59000 ? 
        (<p>Таймер: {('0' + String(Math.floor(timer/60000))).slice(-2)}:{('0' + String(timer/1000%60)).slice(-2)}</p>) : 
        (<p>Таймер: {('0' + String(timer/1000)).slice(-2)}</p>)}
      { statusButton() }
      <button className={styles.restartButton} onClick={restart}>Рестарт</button>
    </div>
  )
}
