import React, { useState, useEffect } from 'react';
import './Images.css';

const Images = ({ images, interval }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        setFade(false);
      }, 500); // Adjust the duration of the fade transition as needed
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [images.length, interval]);

  return (
    // <div style={{ border: '1px solid black' }}>
    <div className="slider" style={{ width: '100%', padding: '0' }}  >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`SliderImage ${index}`}
          className={index === currentImage ? 'active' : ''}
          style={{ animationDelay: `${index * interval}ms`, borderRadius: '0', padding:'0' }}
        />
      ))}
    </div>
    // </div>

  );

};

export default Images;
