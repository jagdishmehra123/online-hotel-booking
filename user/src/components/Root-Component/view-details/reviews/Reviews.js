import axios from '../../../../helpers/axios'
import './Reviews.css'
import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa';
import user from '../../../../assets/profile.png'
const Reviews = ({ reviews, setReviews, id }) => {


    const getRatingList = async () => {
        // console.log('id=>', id)
        const response = await axios.get(`/get-reviews/${id}`)
        // console.log(response.data.list)
        setReviews(response.data.list)
    }
    useEffect(() => {
        getRatingList();
        //eslint-disable-next-line
    }, [])
    return (
       <div></div>
    )
}

export default Reviews
