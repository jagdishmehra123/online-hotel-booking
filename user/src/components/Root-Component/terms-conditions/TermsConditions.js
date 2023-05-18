import React from 'react'
import './TermsConditions.css'
import Footer from '../Footer/Footer'


const TermsConditions = () => {
  return (
    <>
      <div className='policy-wrap'>
        <h3>HOTEL POLICY & BOOKING CONDITIONS</h3>
        <div className='row1'>
          <h5>Hotel Policy</h5>
          <ul >
            <li>All prices are subject to availability.</li>
            <li>Luxury tax and service tax applicable as per government of India regulations.</li>
            <li>Complimentary breakfast (in case the guests are entitled to) will be served as per Breakfast Menu between 08:30 AM to 10:30 AM only.</li>
            <li>Outside Food and Drinks are strictly not allowed.</li>
            <li>Washing of clothes in the room is not allowed.</li>
            <li>You can just pay INR 100 per day and get 10 pieces of clothes washed on daily basis.</li>
            <li>There will be no refund given if there is no complaint for room informed within 3 hrs of check in.</li>
            <li>Late checkout charges of INR 300 will be applicable for any checkout after 11:00 am.</li>
            <li>Security Deposit of INR 1000 to be paid at the time of check in for any damages which is refundable at the time of check out</li>
          </ul>
        </div>

        <div className='row2'>
          <h5>Cancellation Policy</h5>
          <ul>
            <li>Any Cancellation request received up to 15 days prior check in will not attract any cancellation fees.</li>
            <li>Any Cancellation request received from 15 days to 01 days prior to check in will attract 01 night retention charges</li>
            <li> Any cancellation on the day of check-in will be non refundable.</li>
            <li> No show , early check out will be non refundable. </li>
          </ul>
          <h6>Peak Season Cancellation ( 20th December to 5th January) </h6>
          <ul>
            <li>Bookings once made will not be NON-REFUNDABLE, NON-AMENDABLE</li>
            <li> Mandatory Gala Dinner Charges will be applicable for any guest staying on 25th Dec and 31st Dec.</li>
          </ul>
        </div>

        <div className='row3'>
          <h5>Booking Conditions</h5>
          <ul>
            <li>The total price of the reservation will be charged on the day of booking.</li>
            <li>Any type of extra mattress or child's cot/crib is upon request and needs to be confirmed by management.</li>
            <li> Supplements are not calculated automatically in the total costs and will have to be paid for separately during your stay.</li>
          </ul>
        </div>
      </div>
        <p>Note:Please carefully go through our terms and conditions carefully before booking confirmation</p>
      <Footer />
    </>
  )
}

export default TermsConditions