import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.scss'
import styled from '@emotion/styled'

export default function Star(props): JSX.Element {

  const [timeToFall, setTimeToFall] = useState<number>(5000)
  const [leftIndent, setLeftIndent] = useState<number>(Math.random() * 70)

  setTimeout((): void => {
    if(props.status === true) {
      let timeCopy: number = timeToFall
      if(timeCopy > 0) {
        setTimeToFall(timeCopy  - 25)
      }
    }
  }, 25)

  useEffect(():void => {
    if(timeToFall <= 0) {
      props.deleteStar(props.index, props.value)
    }
  }, [timeToFall])

  const StarMain = styled.div`
    bottom: calc(${timeToFall / 50}vh);
    left: ${leftIndent}%;
  `
  return (
    <StarMain className={styles.star}>
      <p>{props.value}</p>
    </StarMain>
  )
}
