import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import { Suspense } from 'react';
import Footer from './components/Root-Component/Footer/Footer';
import { useState } from 'react';
import Register from './components/Root-Component/Register/Register'
import RatingForm from './components/Root-Component/rating-form/RatingForm';
import MyBookings from './components/Root-Component/my-bookings/MyBookings';
import ViewDetails from './components/Root-Component/view-details/ViewDetails';
import Header from './components/Header/Header';
import SpaDetails from './components/Root-Component/spa/Spa-details';
import About from './components/Root-Component/About/About';
import BookingPage from './components/Root-Component/view-details/BookingPage/BookingPage'

const Home = React.lazy(() => import('./components/Root-Component/Home/Home'))
const Spa = React.lazy(() => import('./components/Root-Component/spa/Spa'))

// const Resorts = React.lazy(() => import('./components/Root-Component/Resorts/Resorts'))
const OurProperties = React.lazy(() => import('./components/Root-Component/OurProperties/OurProperties'))
const ContactUs = React.lazy(() => import('./components/Root-Component/Contact/ContactUs'))
const Gallery = React.lazy(() => import('./components/Root-Component/Gallery/Gallery'))
// const BookingPage = React.lazy(() => import('./components/Root-Component/BookingPage/BookingPage'))
const Signin = React.lazy(() => import('./components/Root-Component/signin/Signin'))
const ShowInfoOfRoomCart = React.lazy(() => import('./components/Root-Component/Home/ShowInfoOfRoomCart'))
const LearnMore = React.lazy(() => import('./components/Root-Component/Home/LearnMore'))



function App() {
  const [auth, setAuth] = useState('')
  return (
    <div style={{ position: 'relative' }}>

      <BrowserRouter>
        <Header auth={auth} setAuth={setAuth} />

        <Routes>

          <Route path='/signin' element={<Suspense fallback={<p>Loading....</p>}>
            <Signin />
          </Suspense>}>
          </Route>
          <Route path='/register' element={<Register />}></Route>

          <Route path='/' element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <Home />
              </>
            </Suspense>
          } />
          <Route path='/rating-form/:resortId' element={<RatingForm />}> </Route>
          <Route path='/my-bookings' element={<MyBookings />}> </Route>
          <Route path='/aboutus' element={<About />}></Route>

          <Route path='/booking-summary/:resortname/:resortId/:roomId' element={<BookingPage />}></Route>

          <Route path="/spa" element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <Spa />
                <Footer />
              </>
            </Suspense>
          } />


          {/* <Route path='/:roomId/:adults/:children/:staylength/reserve-room' element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <Footer />
                </>
              </Suspense>
            } /> */}





          <Route path='/our-properties' element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <OurProperties />
              </>
            </Suspense>

          } />

          <Route path='/:resortname/:id/rooms' element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <ViewDetails />
              </>
            </Suspense>

          } />

          <Route path='/spa-details/:spaId' element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <SpaDetails />
              </>
            </Suspense>

          } />
          <Route path='/contact-us' element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <ContactUs />
                <Footer />
              </>
            </Suspense>

          } />

          <Route path='/gallery' element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <Gallery />
                <Footer />
              </>
            </Suspense>} />

          <Route path='/view-room-info/:id/:idChild'
            element={
              <Suspense fallback={<p>Loading....</p>}>
                <ShowInfoOfRoomCart />
              </Suspense>
            } />
          <Route path="/leran-More" element={
            <Suspense fallback={<p>Loading....</p>}>
              <LearnMore />
            </Suspense>
          } />






        </Routes>
      </BrowserRouter>


    </div >
  );
}

export default App;
