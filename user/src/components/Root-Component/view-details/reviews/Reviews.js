import axios from '../../../../helpers/axios'
import './Reviews.css'
import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa';

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
        <div className='review-wrapper'>
            <h5>Reviews</h5>
            <div className='wrapper' >
                {reviews.map((item, i) => {
                    return (
                        <div className='card'>
                            <div>
                                <h6>{item.name}</h6>
                                <div>
                                    {/* <span>{item.rating}</span> */}
                                    {[...Array(item.rating)].map((_, i) => {
                                        return (
                                            <FaStar size={19} style={{ color: 'orange' }} key={i + 1} />

                                        )
                                    })}
                                </div>
                            </div>
                            <div>
                                {item.additionalComments}
                                </div>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default Reviews