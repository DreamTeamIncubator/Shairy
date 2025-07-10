'use client'

import { Button } from '@/shared/ui/Button/Button'
import styles from './PostDescription.module.scss'
import { useState } from 'react'

type PropsDescription = {
  description: string
}

const textTrimmer = (text: string) => {
  return text.length > 67 ? text.substring(0, 67) + '...' : text
}

export const PostDescription = ({ description }: PropsDescription) => {
  const [showDescription, setShowDescription] = useState(false)

  return (
    <div className={styles.description}>
      {showDescription ? description : textTrimmer(description)}

      {description.length > 70 && (
        <Button onClick={() => setShowDescription(!showDescription)} variant="textButton">
          {showDescription ? 'hide' : 'show more'}
        </Button>
      )}
    </div>
  )
}
