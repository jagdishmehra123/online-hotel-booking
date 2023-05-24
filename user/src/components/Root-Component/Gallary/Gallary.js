
import React, { useEffect, useState } from 'react'
import './Gallery.css'
import axios from '../../../helpers/axios'
import Images from '../view-details/Images'
import Footer from '../Footer/Footer'

const Gallary = () => {

    const [allProperties, setAllProperties] = useState([])
    const [resortName, setResortName] = useState('')
    const [getData, setGetData] = useState(false)
    const [images, setImages] = useState([])
    const [active, setActive] = useState(false)

    const getPropertiesData = async () => {
        // await axios.get(`/hotelbook`)
        await axios.get(`http://localhost:4001/hotelbook`)
            .then((res) => {
                // console.log('property list', res.data)
                setAllProperties(res.data)
                setGetData(true)
                //    setSelectedVal([res.data[0].resortName, res.data[0]._id])
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getPropertiesData();
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (getData) {
            setResortName(allProperties[0]?.resortName)

            const arr = []
            for (let i = 0; i < allProperties[0].rooms.length; i++) {
                for (let j = 0; j < allProperties[0].rooms[i].imgUrl.length; j++) {
                    arr.push(allProperties[0]?.rooms[i].imgUrl[j])
                }
            }
            console.log('default arr', arr)
            setImages(arr)
        }
        // eslint-disable-next-line
    }, [getData])





    // getImages
    const handleGetImages = async (id, name) => {
        try {
            const response = await axios.post(`http://localhost:4001/images/${id}`)
            if (response.data.success) {
                console.log(response.data.resort)
                setActive(true)

                setResortName(response.data.resort[0]?.resortName)
                const arr = []
                for (let i = 0; i < response.data.resort[0]?.rooms.length; i++) {
                    for (let j = 0; j < response.data.resort[0]?.rooms[i].imgUrl.length; j++) {
                        arr.push(response.data.resort[0]?.rooms[i].imgUrl[j])
                    }
                }
                console.log(arr)

            }
        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <div className='gallery-wrap'>
                <div className='header-navbar'>
                    {allProperties.map((resort, i) => {
                        return (
                            <div key={i + 1} >
                                <p onClick={() => handleGetImages(resort._id, resort.resortName)}>
                                    {resort.resortName}
                                </p>
                            </div>
                        )
                    })}
                </div>

                <Images images={images} interval={1800} />
                <div><h5>{resortName}</h5></div>

            </div>
            <Footer />
        </>


    )
}

export default Gallary
