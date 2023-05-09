import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../helpers/axios";

import "./Spa-details.css";

export default function SpaDetails() {
    const [details, setDetails] = useState({});
    const navigate = useNavigate();
    const { spaId } = useParams();

    const fetchDetails = async (id) => {
        console.log(spaId)
        try {
            const response = await axios.get(`/spaDetails/${spaId}`);
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
        name: '', email: '', contact: '', date: ''
    })
    const handleInputs = (e) => {
        setSpaForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const handleBooking = async(e) => {
        // Redirect user to booking page
        e.preventDefault()
        try {
            const response =await axios.post('/spa-booking', spaForm)
            console.log(response.data)
            alert('We reserved your booking')
            navigate('/spa')
        }
        catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="detailed-spa-container">

            <section className="spa-details-section">
                <div className="spa-details-img">
                    <img src={details.imgUrl} alt="Spa" />
                </div>

                <div className="spa-details-content">
                    <h2>{details.name}</h2>
                    <h4>AYURVEDIC SPA TREATMENT AT CUBA GOA</h4>
                    <p>
                        Welcome to a World of Rejuvenation. At Kalpaka Spa– Find Yourself In
                        The Hands Of Our Expert Masseurs – All The Way From Kerala.
                    </p>
                    <ul>
                        <li>{details.details}</li>
                        <li>
                            {details.benefits}
                        </li>
                    </ul>

                    <div className="form">
                        <form >
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
                            <div ><buttom className='btn btn-primary' type="submit" onClick={handleBooking}>BOOK</buttom></div>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    );
}