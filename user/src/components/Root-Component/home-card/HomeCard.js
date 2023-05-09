import './HomeCard.css'
// import { useState } from 'react';

import { useNavigate } from 'react-router-dom'


const HomeCard = ({ property }) => {

    const navigate = useNavigate()
    //SHOW ROOMS
    const viewRooms = (id, resortname) => {
        navigate(`/${resortname}/${id}/rooms`)
        console.log(resortname, id)
    }

    // const [showRoomForm, setRoomForm] = useState(false)
    console.log("allProperties =>", property)
    // if (!allProperties) {
    //     return (
    //         <h1>Loading...</h1>
    //     )
    // }

    return (
        <>
            {/* <div className='about-hotel'>
                <div className="property-card-container" key={key}>
                    <div className='properties-card-header' style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className='view-prop-card-details-btn' onClick={() => viewRooms(property._id, property.resortName)}>View Details</div>
                    </div>
                    <div id="property-card-img" key={key}>
                        <img src={property.resortImgURL} alt={property.resortName} />
                    </div>
                </div>
            </div> */}
            <div className='homecard' onClick={()=>{viewRooms(property._id, property.resortName)}} style={{
                background: `url(${property.resortImgURL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
            }}>
                <div className='content-wrapper'>
                    <h5>{property.resortName}</h5>
                    <h6>{property.resortLocation}</h6>
                </div>
            </div>
        </>
    )
}

export default HomeCard;