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
    // await axios(`https://cuba-goa-server.onrender.com/hotelbook`)
      await axios(`http://localhost:4001/hotelbook`)
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


  // Intersection Observer

  useEffect(() => {
    const cards = document.querySelectorAll('.card')
    const observer = new IntersectionObserver(entries => {
      console.log(entries)
      entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
      })
    })
    //cards will show smoothly on page scrolling
    cards.forEach(card => {
      observer.observe(card)
    })

  }, [])


  const [showContent, setShowContent] = useState(false);
  const [showHeading, setShowHeading] = useState(false)
  useEffect(() => {
    setShowContent(true);
    setShowHeading(true)
  },[])




  return (
    <>
      <Video />

      {/* <div style={{ marginTop: '1rem' }} className=''>
        <h2 style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2.5rem' }}>FEATURED PROPERTIES</h2>
        <HomeList currentList={currentList} />
        <Pagination totalPosts={allProperties.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div> */}
      <div className='home-content' >
        <h3 className={`heading ${showHeading ? "animate" : ""}`}>At Cuba Goa, We Provide The Most Luxurious Hospitality Services</h3>
        <div className={`content-wrapper ${showContent ? "animate" : ""}`}>
          <p>
            Welcome to Cuba goa where you will find the perfect city escape that includes all the amenities your family comes to expect from a resort – heated pools, multi-sports courts and playgrounds, and best of all, sandy combed beaches. Think stunning views, beautiful surroundings and endless options for outdoor adventure, for sale or rent.
          </p>
          <p>We provide the most luxurious hospitality services.
            The land of sun, sand, and sea – Goa is synonymous with unhindered beauty and splendid recreation. Cuba Hotels Goa is a captivating paradise for unwinding and revelling, perfect for an idyllic family vacation and conducting important business meetings. Cocooned in the lap of nature, offering a medley of flavours through its world cuisine and regional specialities that are paired with exotic concoctions and cocktails in setting that are relaxing, Cuba Hotels Goa is an oasis of luxury covering Baga in North Goa to Palolem, and Patnem and Agonda in South Goa.
          </p>
        </div>
      </div>

      <div className='' >
        <div className='container1'>
          {allProperties.map((property, i) => {
            return (
              <div className='card' key={i + 1}>
                <div className='img-wrap1'>
                  <img src={property.resortImgURL} alt='resortImg'></img>
                </div>
                <div className='content'>
                  <h3>{property.resortName}</h3>
                  <p>
                    {property.resortDescription}
                  </p>
                  <div className='button-wrap'>
                    <p style={{ color: 'red' }}>view room </p>
                    <div onClick={() => viewRooms(property._id, property.resortName)}
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
          <h3>Cuba Goa Propery Locations</h3>
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
