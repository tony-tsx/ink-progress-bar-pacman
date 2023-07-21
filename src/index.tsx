import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { Text, TextProps } from "ink";
import { useId } from "./useId.js";
import { setInterval } from "timers";

export interface ProgressBarPacmanProps extends TextProps {
  width: number
  percent: number
  foods?: number
  bar?: ReactNode
  food?: ReactNode
}

const pacmans = ['C', 'c']

const ProgressBarPacman: FC<ProgressBarPacmanProps> = ({
  width,
  percent,
  foods = Math.floor(width * .1),
  bar = '-',
  food = 'o',
  ...props
}) => {
  const id = useId()
  const positions = useMemo(() => Array(foods).fill(null).map((_, index, { length }) => {
    return Math.trunc((width / length) * (index + 1))
  }), [foods, width])
  const current = useMemo(() => {
    return Math.trunc(width * percent)
  }, [width, percent])
  const [pacman, setPacman] = useState(0)
  const isDone = useMemo(() => percent >= 1, [percent])

  useEffect(() => {
    if (isDone) return

    const interval = setInterval(() => {
      setPacman(pacman => (pacman + 1) % pacmans.length)
    }, 600)

    return () => {
      clearInterval(interval)
    }
  }, [isDone])

  return (
    <Text {...props}>
      [{Array(width - 2)
        .fill(null)
        .map((_, index) => {
          if (current === index)
            return (
              <Text key={id} bold color="yellowBright">
                {pacmans[pacman]}
              </Text>
            );

          if (current > index) return bar;

          if (positions.includes(index)) return food;

          return ' ';
        })}]
    </Text>
  )
}

export default ProgressBarPacman
