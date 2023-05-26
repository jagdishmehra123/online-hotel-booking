import React, { useEffect, useState } from 'react';
import './About.css'
import Footer from '../Footer/Footer';
import axios from "../../../helpers/axios"
// import PreLoader from '../../Preloader-Component/Preloader-Component';

// const bannerimg = 'https://www.tusktravel.com/blog/wp-content/uploads/2021/07/Goa-open-for-tourist.jpg'



function About() {

  const [aboutUsData, setAboutUsData] = useState();
  const [showAboutUsForm, setShowAboutUsForm] = useState(false);

  const fetchData = async () => {
    await axios.get("https://online-hotel-booking-puce.vercel.app/about-us")
      .then((res) => {
        console.log(res.data.data[0])
        setAboutUsData(res.data.data[0])
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // console.log(aboutUsData)
  // fetchData()
  useEffect(() => {
    fetchData()
  }, [])

  // if(!aboutUsData){
  //   return(
  // <PreLoader/>
  //   )
  // }

  return (
    <>
      <div className='aboutus-wrapper'>
        <h5 className='title'>
          {aboutUsData?.heading1}
          <br /><br /><br />
          {aboutUsData?.heading2}
        </h5>
        <section className='aboutus-body'>
          <div className="aboutus-lb">
            <h4>
              {aboutUsData?.heading3}
            </h4>
            <p style={{ paddingRight: '2rem' }}>
              {aboutUsData?.description}
            </p>
          </div>
          <div className="aboutus-rb">
            <img src={aboutUsData?.bannerImgUrl} alt='aboutusimg' />
            {/* <img src={aboutusimg} alt='aboutusimg'/> */}
          </div>
        </section>

      </div>
      <Footer />

    </>

  );
}

export default About;