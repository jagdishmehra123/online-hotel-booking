import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../helpers/axios";
import Footer from '../Footer/Footer'
import "./Spa-details.css";
import { location2 } from 'react-icons-kit/icomoon/location2'
import { Icon } from 'react-icons-kit'


export default function SpaDetails() {
    const [details, setDetails] = useState({});
    const navigate = useNavigate();
    const { spaId } = useParams();

    const fetchDetails = async (id) => {
        console.log(spaId)
        try {
            const response = await axios.get(`https://online-hotel-booking-puce.vercel.app/spaDetails/${spaId}`);
            console.log(response.data.data);
            setDetails(response.data.data)

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchDetails();
        // eslint-disable-next-line
    }, [spaId])

    const [spaForm, setSpaForm] = useState({
        name: '', email: '', contact: '', date: '', noOfFemale: '', therapyChoice: ''
    })
    const handleInputs = (e) => {
        setSpaForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const handleBooking = async (e) => {
        console.log(spaForm)
        e.preventDefault()
        try {
            const response = await axios.post('/spa-booking', spaForm)
            console.log(response.data)
            alert('We reserved your booking')
            navigate('/spa')
        }
        catch (err) {
            console.log(err)
        }
    };

    return (
        <>
            <div className="detailed-spa-container">

                <section className="spa-details-section">
                    <div className="spa-details-img">
                        <img src={details.imgUrl} alt="Spa" />
                    </div>
                    <div className='headings'>
                        <h2>{details.name}</h2>
                        <h4>AYURVEDIC SPA TREATMENT AT CUBA GOA</h4>
                    </div>
                    <div className="spa-details-content">

                        <ul>
                            <li>{details.details}</li>
                            <li>
                                {details.benefits}
                            </li>
                        </ul>

                        <div className="form">
                            <form >
                                <h5 style={{ textAlign: 'center' }}>BOOK SESSION</h5>

                                <div class="form-group">
                                    <label for="name">Name:</label>
                                    <input type="text" id="name" name="name" required
                                        value={spaForm.name} onChange={handleInputs} />
                                </div>
                                <div class="form-group">
                                    <label for="email">Email:</label>
                                    <input type="email" id="email" name="email" required
                                        value={spaForm.email} onChange={handleInputs} />
                                </div>
                                <div class="form-group">
                                    <label for="contact">Contact:</label>
                                    <input type="tel" id="contact" name="contact" required
                                        value={spaForm.contact} onChange={handleInputs} />
                                </div>
                                <div class="form-group">
                                    <label for="date">Date:</label>
                                    <input type="date" id="date" name="date" required
                                        value={spaForm.date} onChange={handleInputs} />
                                </div>
                                <div class="form-group">
                                    <label for="noOfFemale">No of Female:</label>
                                    <input type="number" id="noOfFemale" name="noOfFemale" required
                                        value={spaForm.noOfFemale} onChange={handleInputs} />
                                </div>
                                <div class="form-group">
                                    <label for="therapyChoice">Therapy Choice:</label>
                                    <input type="text" id="therapyChoice" name="therapyChoice" required
                                        value={spaForm.therapy} onChange={handleInputs} />
                                </div>
                                <div>
                                    <buttom className='btn btn-primary' type="submit" onClick={handleBooking}>BOOK</buttom>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>


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
    );
}