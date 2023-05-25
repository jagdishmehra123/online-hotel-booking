import React from 'react'
import './Home.css'
import Video from '../../video/Video'
import { useState, useEffect } from 'react'
// import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
// import { Link } from 'react-router-dom'
// import { Image } from 'react-bootstrap'
import axios from '../../../helpers/axios';
// import HomeList from '../home-list/HomeList';
// import Pagination from '../home-list/Pagination';
// import resortImage from '../../../assets/CUBA_PATNEM_BEACH_BUNGALOWS.jpg'
import { useNavigate } from 'react-router-dom'
import arrow from '../../../assets/arrow.png'
import { location2 } from 'react-icons-kit/icomoon/location2'
import { Icon } from 'react-icons-kit'

const Footer = React.lazy(() => import('../Footer/Footer'))

const Home = () => {
  const navigate = useNavigate()
  //SHOW ROOMS
  const viewRooms = (id, resortname) => {
    navigate(`/${resortname}/${id}/rooms`)
    console.log(resortname, id)
  }

  const [allProperties, setAllProperties] = useState([])
  const getPropertiesData = async () => {
    await axios.get(`https://online-hotel-booking-puce.vercel.app/hotelbook`)
      // await axios(`http://localhost:4001/hotelbook`)
      .then((res) => {
        // console.log(res.data)
        setAllProperties(res.data)
        //    setSelectedVal([res.data[0].resortName, res.data[0]._id])
      })
      .catch((err) => {
        console.log(err)
      })
  }
  console.log("allProperties =>", allProperties)
  useEffect(() => {
    getPropertiesData()
  }, [])

  // useEffect(() => {
  //   const boxes = document.querySelectorAll('.card')
  //   window.addEventListener('scroll', checkBoxes)
  //   checkBoxes()
  //   function checkBoxes() {
  //     const triggerBottom = window.innerHeight / 5 * 6
  //      boxes.forEach(box => {
  //       const boxTop = box.getBoundingClientRect().top
  //       if (boxTop < triggerBottom) {
  //         box.classList.add('show')
  //       }
  //       else {
  //         box.classList.remove('show')
  //       }
  //     })
  //   }
  // }, [])



  return (
    <>
      <Video />
      {/* <div style={{ marginTop: '1rem' }} className=''>
        <h2 style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2.5rem' }}>FEATURED PROPERTIES</h2>
        <HomeList currentList={currentList} />
        <Pagination totalPosts={allProperties.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div> */}
      <div className='home-content' >
        <div className='content-wrapper' data-aos='zoom-in' data-aos-delay='80'>
          <h6>
            Discover CUBA GOA, a distinguished collection of independent luxury hotels in the captivating region of Goa, India. Uncover a world of unparalleled hospitality and luxury.
            Explore our exquisite properties now!
          </h6>
          <div className='inner-wrapper'  >
            <p   >
              Find the ultimate escape at Cuba Goa, where sandy beaches, multi-sports courts, and playgrounds await you and your family.
              With breathtaking views and plentiful outdoor adventures available for rent,
              this resort is the ideal city getaway. Expect all the amenities you desire in a vacation destination, including stunning surroundings.
              With hospitality services that exude grandeur, we offer a respite from the mundane.
            </p>
            <p >
              Goa, a destination known for its sun-kissed beaches and breathtaking scenery,
              is a treasure trove of relaxation. Cuba Hotels Goa is an unmatched haven for both leisure and business, crafting a perfect getaway
              for families and fruitful conclaves. Nestled in the arms of nature,
              delightful flavors await across a diverse international and regional menu. These delectable dishes perfectly pair with our exotic cocktails,
              complementing the serene ambiance that spans across South Goa - an oasis of refined luxury.
            </p>
          </div>

        </div>
      </div>

      <div className='' >
        <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Featured Properties</h2>
        <div style={{ border: '0.2px solid lightgrey', width: '30%', margin: 'auto' }}></div>
        <div className='container1' >
          {allProperties.map((property, index) => {
            return (
              <div className='card' key={index + 1} data-aos={(index % 2 === 0) ? ('flip-left') : ('flip-right')} data-aos-delay="35" >
                <div className='img-wrap1'>
                  <img src={property.resortImgURL} alt='resortImg'></img>
                </div>
                <div className='content'>
                  <h3 style={{}}>{property.resortName}</h3>
                  <p>
                    {property.resortDescription}
                  </p>
                  <div className='button-wrap' style={{ cursor: 'pointer' }}
                    onClick={() => viewRooms(property._id, property.resortName)}>
                    <p style={{ color: 'red' }}>view room </p>
                    <div
                      style={{ cursor: 'pointer' }}>
                      <img src={arrow} alt='' /></div>
                  </div>
                </div>

                <div className='img-wrap2'>
                  <img src={property.resortImgURL} alt='resortImg'></img>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      <div className='property-locations'>
        <div className='location-header'>
          <div><Icon icon={location2} size={30} style={{ color: 'orange' }}></Icon></div>
          <h3 style={{}}>Cuba Goa Propery Locations</h3>
        </div>
        <div className='dummy-border' ></div>

        <div className='location-addresses'>
          <section className='address-section'>
            <h6>CUBA BEACH BUNGALOWS</h6>
            <div></div>
            <p>Center of Palolem Beach, Palolem Beach, Canacona, Goa - 403702</p>
          </section>
          <section className='address-section'>
            <h6>CUBA PATNEM BEACH BUNGALOWS</h6>
            <div></div>
            <p>North side of Patnem Beach, Palolem-Patnem Road, Canacona, Goa - 403702</p>
          </section>
          <section className='address-section'>
            <h6>CUBA PREMIUM HUTS</h6>
            <div></div>
            <p>Center of Palolem Beach, Palolem Beach, Canacona, Goa - 403702</p>
          </section>
          <section className='address-section'>
            <h6>PALOLEM BEACH RESORT</h6>
            <div></div>
            <p>Entrance of Palolem Beach, Besides car parking area, Palolem Beach, Canacona, Goa - 403702</p>
          </section>
          <section className='address-section'>
            <h6>CUBA AGONDA</h6>
            <div></div>
            <p>Tambli Val, Agonda Beach Road, Agonda, Canacona, Goa - 403702</p>
          </section>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Home
