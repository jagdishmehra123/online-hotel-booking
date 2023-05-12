// import axios from 'axios';
import { useState } from 'react'
import './PropertyCard.css'
import { useNavigate } from 'react-router-dom'
// import AddMoreRoomForm from '../AddMoreRoomForm';


const PropertyCard = ({ property }) => {

    const navigate = useNavigate()
    //SHOW ROOMS
    const viewRooms = (id, resortname) => {
        navigate(`/${resortname}/${id}/rooms`)
        console.log(resortname, id)
    }



    return (
        <div className="property-card-container">
            <div id="property-card-img" style={{
                background: `url(${property.resortImgURL})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center'
            }}>
                <button id='view-details-btn' onClick={() => viewRooms(property._id, property.resortName)}>view rooms</button>
            </div>
            <div className="card-footer">
                <div className="card-footer-lb">
                    <div>
                        {property.resortLocation + ",  India"}
                    </div>
                    <div>
                        {property.resortName}
                    </div>
                </div>

            </div>
        </div>

    )
}

export default PropertyCard;