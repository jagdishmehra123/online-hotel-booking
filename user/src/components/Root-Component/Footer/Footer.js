import React from 'react'
import './Footer.css'
import { AiOutlineRight } from 'react-icons/ai';
import logo from '../../../assets/logo.png'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate()
  return (
    <>
      {/* <div className='fintPrintBar'>
        <div className='row'>
          <p><strong>Please note the current interest rate as of November 2022:</strong></p>
          <p >From 7.99% OAC with amortization of 180 months for new cottages. Maximum to finance $200,000. These rates are subject to change without notice. E &amp; O.E. For down payments, a maximum of $20,000 can be paid using a credit card. Any further payments can be paid by transfer or certified cheque.</p>
        </div>
      </div> */}


      <footer id='footer'>

        <div className='footer1 another '>

          <div className='footer2'>
            <div>
              {/* <h3>CORPORATE OFFICE</h3> */}
              {/* <h4>612-A Welland Avenue St. Catharines,<br /> ON L2M 5V6Toll-Free: +1 877-814-4141<br /></h4> */}
              <img src={logo} alt="Great Blue Resorts"></img>
            </div>

          </div>



          <div className="newsletter">
            <h4>
              Helpful links
            </h4>
            <p>
              <p onClick={() => { navigate('/') }}>Home</p>
              <p onClick={() => { navigate('/our-properties') }}>Properties</p>
              <p onClick={() => { navigate('/spa') }}>Spa</p>
              <p onClick={() => { navigate('/gallery') }}>Gallery</p>
              <p onClick={() => { navigate('/aboutus') }}>Abouts us</p>
              <p onClick={() => { navigate('/contactus') }}>Contact us</p>
              <p onClick={() => { navigate('/terms') }}>Term and Conditions</p>
            </p>
          </div>
          <div className="social page">
            <h3>Let's Get Social</h3>

            <div class="socialLinks">

              {// eslint-disable-next-line
                <a style={{ marginRight: '2rem' }}
                  href="https://www.facebook.com/cubagoa/" target="_blank" title="Like us on facebook">
                  <img src="https://www.greatblueresorts.com/wp-content/themes/do180-theme/images/facebook-2.png" alt="Facebook" />
                </a>
              }
              {// eslint-disable-next-line
                <a href="https://www.instagram.com/cubagoa/?hl=en" target="_blank" title="Follow us on instagram">
                  <img src="https://www.greatblueresorts.com/wp-content/themes/do180-theme/images/instagram-2.png" alt="instagram" />
                </a>
              }

            </div>


          </div >

        </div >


      </footer >
      {/* <div className='formTab tellMe open'>
        <h3 className="mainFormTitle open" onClick={() => navigate('/spa')}> DISCOVER MORE {<AiOutlineRight />}</h3>
      </div> */}
    </>
  )
}

export default Footer