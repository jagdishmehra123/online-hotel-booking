import React, { useEffect, useState } from 'react';
import './Header.css';
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line
// import logo from '../../assets/logo.png';
import { FaAlignJustify } from 'react-icons/fa';

import { Icon } from 'react-icons-kit'
import { cross } from 'react-icons-kit/icomoon/cross'


const Header = ({ auth, setAuth }) => {
  const navigate = useNavigate()


  const token = localStorage.getItem('token')
  useEffect(() => {
    setAuth(token);
    //eslint-disable-next-line
  }, [token])





  /*    navbar changing its color   */
  const [navBackground, setNavBackground] = useState('transparent');
  //handle scroll
  const handleScroll = () => {
    if (window.pageYOffset > 10) {
      setNavBackground('lightblue');
    } else {
      setNavBackground('transparent');
    }
  }
  //useffect
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // ***navbar changin its color ends



  /*  handling responsive navbar */
  const [showNavbar, setShowNavbar] = useState('none')
  // eslint-disable-next-line
  const [navbarHidden, setNavbarHidden] = useState(true)
  //funtion to show or hide navbar on clicking menu icon
  const handleOpenNavbar = () => {
    setShowNavbar('block');
    setNavbarHidden(false)
  }
  const handleCloseNavbar = () => {
    setShowNavbar('none');
    setNavbarHidden(false)
  }
  /*   handling responsive navbar ends */


  return (
    <div className='app-bar' style={{ backgroundColor: navBackground }}>

      {/* desktop view navbar */}
      <div className='desktop-section'>
        <section className='appbar-col-1'>
          <Typography className='title' onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}>CUBA GOA</Typography>
          {/* <div className='logoWrapper' onClick={() => navigate('/')}><img src={logo} alt='banner' />
          </div> */}
        </section>
        <section className='appbar-col-2'>
          <Box className='col-2-box'>
            <Button className='btn-item' onClick={() => navigate('/')}>Home</Button>
            <Button className='btn-item' onClick={() => navigate('/our-properties')}>OUR PROPERTIES</Button>
            <Button className='btn-item' onClick={() => navigate('/spa')}>SPA</Button>
            <Button className='btn-item' onClick={() => navigate('/gallery')}>GALLERY</Button>

            <Button className='btn-item' onClick={() => navigate('/aboutus')}>About Us</Button>
            <Button className='btn-item' onClick={() => navigate('/contactus')}>Contact Us</Button>
            {auth ? (<Button className='btn-item' onClick={() => { navigate('/my-bookings') }}>MY BOOKINGS</Button>) : (null)}

            {auth ?
              (<Button className='btn-item' onClick={() => {
                localStorage.clear();
                navigate('/');
              }} >LOGOUT</Button>)
              :
              (<Button className='btn-item' onClick={() => navigate('/signin')}>LOGIN</Button>)}
          </Box>

          <div className='menu' onClick={handleOpenNavbar}><FaAlignJustify /></div>

        </section>
      </div>


      {/* mobile view navbar */}
      <div className='right-side-navbar' style={{ display: showNavbar }}>
        <Box className='col-2-box' style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <Icon icon={cross} size={15} style={{ float: 'left', paddingLeft: '1rem', marginTop: '1rem' }}
              onClick={handleCloseNavbar} />
          </div>
          <Button className='btn-item' onClick={() => { navigate('/'); handleCloseNavbar() }}>Home</Button>
          <Button className='btn-item' onClick={() => { navigate('/our-properties'); handleCloseNavbar() }}>OUR PROPERTIES</Button>
          <Button className='btn-item' onClick={() => { navigate('/spa'); handleCloseNavbar() }}>SPA</Button>
          <Button className='btn-item' onClick={() => { navigate('/gallery'); handleCloseNavbar() }}>GALLERY</Button>
          <Button className='btn-item' onClick={() => { navigate('/aboutus'); handleCloseNavbar() }}>About Us</Button>
          <Button className='btn-item' onClick={() => navigate('/contactus')}>Contact Us</Button>
          {auth ? (<Button className='btn-item' onClick={() => { navigate('/my-bookings'); handleCloseNavbar() }}>MY BOOKINGS</Button>)
            : (null)}

          {auth ?
            (<Button className='btn-item' onClick={() => {
              localStorage.clear();
              navigate('/');
              handleCloseNavbar()
            }} >LOGOUT</Button>)
            :
            (<Button className='btn-item' onClick={() => { navigate('/signin'); handleCloseNavbar() }}>LOGIN</Button>)}
        </Box>
      </div>

      {/* mobile view navbar ends */}




    </div >
  )
}

export default Header
