import React, { useState } from 'react';
import './RatingForm.css'
import { FaStar } from 'react-icons/fa';
import axios from "../../../helpers/axios";
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-hot-toast'


const RatingForm = () => {
  const navigate=useNavigate()
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const { resortId } = useParams()

  const [ratingform, setratingform] = useState({
    name: '', email: '', platform: '', additionalComments: '', rating: rating,
    resortId: resortId
  })

  const handleInputs = (e) => {
    setratingform(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const token = localStorage.getItem('token')
  const handleSubmit = async () => {
    console.log(ratingform)
    // try{
    const response = await axios.post('/rate-us', ratingform, {
      headers: {
        authorization: token
      }
    })
    console.log(response)
    toast.success('Thank you for your feedback!')
    navigate('/our-properties')

    // }
    // catch(err){
    //   console.log(err)
    // }
  }



  return (
    <>
      <div className='rating-form-wrapper'>
        <div><input type='text' placeholder='Full Name' name='name' value={ratingform.name} onChange={handleInputs}></input></div>
        <div><input type='email' placeholder='Email' name='email' value={ratingform.email} onChange={handleInputs}></input></div>
        <div>
          <h6>Where do you get to know about us?</h6>
          <div>
            <select name='platform' value={ratingform.platform} onChange={handleInputs}>
              <option value='none'>select</option>
              <option value='socila-media'>Social Media</option>
              <option value='google-search'>Google Search</option>
              <option value='recommended'>Recommended</option>
            </select>
          </div>
        </div>
        <div>
          <textarea placeholder='additional comments' name='additionalComments'
            value={ratingform.additionalComments} onChange={handleInputs} />
        </div>
        <div>
          <h6>RATINGS</h6>
          {[...Array(5)].map((star, index) => {
            const ratingValue = (index + 1);

            return (
              <label key={index}>
                <input style={{ display: 'none' }}
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  onChange={handleInputs}
                />
                <FaStar
                  className="star"
                  color={ratingValue <= (hover || ratingform.rating) ? '#ffc107' : '#e4e5e9'}
                  size={25}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>

        <button onClick={handleSubmit}>submit</button>
      </div>
    </>
  );

};

export default RatingForm;
