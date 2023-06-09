import './OurProperties.css'
import React, { useState, useEffect } from 'react'
import axios from "../../../helpers/axios";
import PropertyCard from './Property-Card/PropertyCard'
import OurPropertyBannerVideo from './Our-Properties-Video/Our-Properties-Video';
const Footer = React.lazy(() => import('../Footer/Footer'))


const OurProperties = () => {
  const [allProperties, setAllProperties] = useState("")
  // const [showRoomForm, setRoomForm] = useState(false)
  const [searchResortName, setSearchResortName] = useState('')


  const getPropertiesData = async () => {
    await axios.get(`https://online-hotel-booking-puce.vercel.app/hotelbook`)

      .then((res) => {
        console.log('property list', res.data)
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
  if (!allProperties) {
    return (
      <h1>Loading...</h1>
    )
  }



  return (
    <>
      <main className='our-properties-main'>
        <div className='quba-goa-search'>
          {/* <div className='banner'>
            <h2>The Cuba Goa Properties</h2>
            <h6 style={{ margin: '20px 0' }}>BEACH HUTS, BUNGALOWS & RESORTS</h6>
          </div> */}
          <OurPropertyBannerVideo />
          <div className='properties-to-book'>
            <input type='text' placeholder='Search' name='searchResortName' value={searchResortName}
              onChange={(e) => setSearchResortName(e.target.value.toLowerCase())} style={{ width: '90%', paddingLeft: '1rem' }} />
          </div>
          {/* {searchResortName} */}
          <div className='property-card-wrapper' >
            {allProperties.filter((property) => {
              if (searchResortName === "") {
                return property
              }
              else {
                if (property.resortName.toLowerCase().includes(searchResortName)) {
                  return property
                }
              }
            }).map((property) => {
              return (
                <PropertyCard property={property} />
              )
            })}

          </div>
        </div>
      </main >
      <Footer />
    </>
  )
}

export default OurProperties