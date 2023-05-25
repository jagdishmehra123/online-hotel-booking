import React, { useState, useEffect } from "react";
import "./Spa.css";
import axios from "../../../helpers/axios";
import SpaCard from "./SpaCard";
import { Row } from "react-bootstrap";
import { Icon } from 'react-icons-kit'
import arrow from '../../../assets/arrow.png'
import { useNavigate } from 'react-router-dom'

const Spa = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  const getSpaList = async () => {
    try {
      const response = await axios.get("/allSpaList");
      if (response.data.success) {
        console.log(response.data.data);
        setData(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSpaList();
  }, []);

  return (
    <main class="spa-parent">
      <section className="entry-point-spa" style={{ padding: '0' }}>

        <div className="spa-main-cont">
          <div className="firts-content-spa">
            <h2>SPA</h2>
          </div>
          <h4 >AYURVEDIC SPA TREATMENTS IN GOA</h4>
        </div>


        <div style={{ marginTop: '2rem' }}>
          <h5 style={{ textAlign: 'center' }}>
            Welcome to a World of Rejuvenation. At Kalpaka Spa– Find Yourself
            In The Hands Of Our Expert Masseurs – All The Way From Kerala.
          </h5>
        </div>

      </section>


      <div className='card-wrapper'>
        {data.map((spa, index) => {
          return (
            <div className='card' key={index + 1} data-aos={(index % 2 === 0) ? ('flip-left') : ('flip-right')} data-aos-delay="10" >
              <div className='img-wrap1'>
                <img src={spa.imgUrl} alt='resortImg'></img>
              </div>
              <div className='content'>
                <h3 style={{}}>{spa.name}</h3>
                <p>
                  {spa.details}
                </p>
                <p>
                  {spa.benefits}
                </p>
                <div className='button-wrap' style={{ cursor: 'pointer' }}>
                  <p style={{ color: 'darkblue' }}
                    onClick={() => { navigate(`/spa-details/${spa._id}`) }}
                  >Book Session</p>
                  <div
                    style={{ cursor: 'pointer' }}>
                    <img src={arrow} alt='' /></div>
                </div>
              </div>

              <div className='img-wrap2'>
                <img src={spa.imgUrl} alt='resortImg'></img>
              </div>
            </div>
          )
        })}
      </div>
    </main>




  );
};

export default Spa;
