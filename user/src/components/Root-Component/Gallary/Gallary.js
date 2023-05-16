import React, { useState, useEffect } from 'react'
import './Gallary.css'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import axios from '../../../helpers/axios';

const galleryStyles = {
    width: '100%',
    height: '100%',
    padding: '0',
    objectFit: 'contain'
}

const slideWrapStyle = {
    width: '100%',
    height: '100%'
}

const imageStyles = {
    width: '70%',
    height: '34rem',
    padding: '0',
}


const Gallery = ({ images }) => {
    const [imgData, setImgData] = useState([])

    const getImages = async () => {
        try {
            const response = await axios.get('http://localhost:4001/images')
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

    const galleryImages = imgData.map((image) => ({
        original: image,
        thumbnail: image,
    }));

    return (
        <div className='gallary-wrap'>
            <ImageGallery items={galleryImages}
                style={galleryStyles}
                slideWrapStyle={slideWrapStyle}
                renderItem={(item) => (
                    <div className='image-gallery-image' >
                        <img src={item.thumbnail} alt=''
                            style={imageStyles} />
                    </div>
                )}
            />
        </div>
    );
};



export default Gallery