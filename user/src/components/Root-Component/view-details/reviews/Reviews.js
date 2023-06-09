import axios from '../../../../helpers/axios'
import './Reviews.css'
import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa';
import user from '../../../../assets/profile.png'
const Reviews = ({ reviews, setReviews, id }) => {


    const getRatingList = async () => {
        // console.log('id=>', id)
        const response = await axios.get(`https://online-hotel-booking-puce.vercel.app/get-reviews/${id}`)
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
                        <div className='card' key={i + 1} style={{ border: '1px solid lightgrey' }}>
                            <div>
                                <div>
                                    <div>
                                        <img src={user} alt='userIcon' />
                                    </div>
                                    <h6>{item.name}</h6>
                                </div>

                                <div>
                                    {/* <span>{item.rating}</span> */}
                                    {[...Array(item.rating)].map((_, i) => {
                                        return (
                                            <FaStar size={17} style={{ color: 'orange' }} key={i + 1} />

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
        </div >    )
}

export default Reviews
