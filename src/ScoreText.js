import React from 'react'
import Typography  from '@mui/material/Typography'

const ScoreText = ({score}) => {
    let text = 'Your score is '
    switch(score){
        case 1:
        text += 'weak!'
        break
        case 2:
        text += 'neutral!'
        break
        case 3:
        text += 'strong!'
        break
        case 4:
        text += 'too strong!'
        break
        default:
        text += 'too weak!'
    }

    return <Typography variant="h6" sx={{fontWeight: 'bold'}} gutterBottom>{text}</Typography>
}

export default ScoreText