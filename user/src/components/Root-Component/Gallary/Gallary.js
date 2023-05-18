import React, { useState, useEffect } from 'react'
import './Gallery.css'
import 'react-image-gallery/styles/css/image-gallery.css';
import axios from '../../../helpers/axios';
import { Icon } from 'react-icons-kit'
import { circleLeft } from 'react-icons-kit/icomoon/circleLeft'
import { circleRight } from 'react-icons-kit/icomoon/circleRight'
import Footer from '../Footer/Footer';


const Gallery = ({ images }) => {
    const [imgData, setImgData] = useState([])
    const [current, setCurrent] = useState(0)

    const getImages = async () => {
        try {
            const response = await axios.get('/images')
            console.log(response)
            setImgData(response.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getImages();
    }, [])



    const prevBtn = () => {
        setCurrent((current === 0) ? (imgData.length - 1) : (current - 1))
    }
    const nextBtn = () => {
        setCurrent((current === imgData.length) ? (0) : (current + 1))
    }


    //handle on click image. it will set the index of image to currentImg
    const handleCurrentImg = (index) => {
        setCurrent(index)
        console.log(index)
    }


    return (
        <>
            <div className='gallary-wrap'>
                <div className='img-wrap' >
                    <div className='icon1'><Icon icon={circleLeft} onClick={prevBtn} size={25} /></div>
                    <img src={imgData[current]} alt='roomimage' />
                    <div className='icon2'><Icon icon={circleRight} onClick={nextBtn} size={25} /></div>
                </div>
                <div className='images-wrap'>
                    {imgData.length > 0 && imgData.map((image, index) => {
                        return (
                            <img src={image} alt=''
                                onClick={() => handleCurrentImg(index)} />
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    );
};



export default Gallery