import React from 'react'

const Bar = ({backgroundColor}) => <div style={{width: '100%', height: '8px', backgroundColor}}></div>
const Space = () => <div style={{width: '16px'}}></div>
const ScoreBar = ({score}) => {
  let color = '#DDDDDD'
  switch(score){
    case 0:
      color = '#ef4836'
      break
    case 1:
      color = '#eb4132'
      break
    case 2:
      color = '#f6b44d'
      break
    case 3:
      color = '#2b90ef'
      break
    case 4:
      color = '#25c281'
      break
    default:
      color = '#DDDDDD'
  }
  return (
    <div style={{display: 'flex', alignItems: 'center', margin: '5px 0px 0px', width: '100%'}}>
      <Bar backgroundColor={color}/>
      <Space />
      <Bar backgroundColor={color}/>
      <Space />
      <Bar backgroundColor={color}/>
      <Space />
      <Bar backgroundColor={color}/>
      <Space />
      <Bar backgroundColor={color}/>
    </div>
  )
}

export default ScoreBar