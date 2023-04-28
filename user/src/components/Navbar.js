import './OurProperties.css'
import React from 'react'
import PropertyCard from './Property-Card/PropertyCard'

const Footer = React.lazy(() => import('../Footer/Footer'))



const OurProperties = () => {

  return (
    <>
      <main className='our-properties-main'>
        <div className='quba-goa-search'>
          <div className='banner'>
            <h2>The Cuba Goa Properties</h2>
            <h6 style={{ margin: '20px 0' }}>BEACH HUTS, BUNGALOWS & RESORTS</h6>
          </div>
          <div className='properties-to-book'>
            {/* filter section do at veyr last */}
          </div>
          <div>
            <PropertyCard/>
          </div>
        </div>
      </main >
      <Footer />
    </>
  )
}

export default OurProperties