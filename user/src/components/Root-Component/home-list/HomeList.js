import React from 'react'
// import { useNavigate } from 'react-router'
import './HomeList.css'
import HomeCard from '../home-card/HomeCard'

const HomeList = ({currentList}) => {
  // const navigate = useNavigate()
  


  // function navigateToViewInfoRoom(id, idChild) {
  //   navigate(`/view-room-info/${id}/${idChild}`)
  // }

  // function LearnMore() {
  //   navigate('/leran-More')
  // }
  return (
    <div className='homecards-wrapper'>
      {currentList.map((property, i) => {
        return (
          <HomeCard property={property} />
        )
      })}
    </div>
  )
}

export default HomeList