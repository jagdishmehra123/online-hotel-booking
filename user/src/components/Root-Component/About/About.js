import React from 'react';
import './About.css'
import Footer from '../Footer/Footer';


const bannerimg = 'https://www.tusktravel.com/blog/wp-content/uploads/2021/07/Goa-open-for-tourist.jpg'



function About() {
  // const images = [
  //     { title: 'TEAM', para: 'Our team comprises highly skilled and knowledgeable individuals with a passion for real estate. We understand that buying or selling a property can be a daunting task, which is why we are committed to making the process as smooth and stress-free as possible for our clients.' },
  //     { title: 'TECHNOLOGY', para: 'We specialize in providing personalized and professional service, and our team is equipped with the latest technology and market data to ensure that our clients receive the most accurate and up-to-date information.' },
  //     { title: 'MISSION', para: 'Whether you are looking to buy your first home, sell your current property, or invest in real estate, we are here to guide you every step of the way. Our mission is to help our clients achieve their real estate goals by providing top-notch service, expertise, and support.' },
  //     { title: 'GOAL', para: 'We take pride in building long-term relationships with our clients, and we are committed to exceeding their expectations. Our goal is to make sure that each and every client is satisfied with our service and confident in their real estate decisions.' }]

  // const [activeIndex, setActiveIndex] = useState(0);

  // const handleSlideChange = (index) => {
  //     setActiveIndex(index);
  // };

  return (
    <>
      <div className='aboutus-wrapper'>
        <h5 className='title'>
          About Cuba Goa - Beach Huts, Bungalows & Resorts
          <br /><br /><br />
          WHERE...TIME TAKES A BREAK!
        </h5>
        <section className='aboutus-body'>
          <div className="aboutus-lb">
            {/* <div className="">
                        <h6>{images[0].title}</h6>
                        <p>{images[0].para}</p>
                    </div>
                    <div className="">
                        <h6>{images[1].title}</h6>
                        <p>{images[1].para}</p>
                    </div>
                    <div className="">
                        <h6>{images[2].title}</h6>
                        <p>{images[2].para}</p>
                    </div>
                    <div className="">
                        <h6>{images[3].title}</h6>
                        <p>{images[3].para}</p>
                    </div> */}
            <h4>
              We Provide The Most Luxurious Hospitality Services
            </h4>
            <p style={{ paddingRight: '2rem' }}>
              The land of sun, sand, and sea – Goa is synonymous with unhindered beauty and splendid recreation. Cuba Hotels Goa is a captivating paradise for unwinding and revelling, perfect for an idyllic family vacation and conducting important business meetings. Cocooned in the lap of nature, offering a medley of flavours through its world cuisine and regional specialities that are paired with exotic concoctions and cocktails in setting that are relaxing, Cuba Hotels Goa is an oasis of luxury covering Baga in North Goa to Palolem, and Patnem and Agonda in South Goa. Embrace the languid and laid-back life that is characteristic of Goa, while our service takes care of your needs round the clock. The unique bungalows and splendid beach huts with sun beds are certain to redefine the experience of a truly enjoyable holiday leaving you in a state of wonderment and awe. A buoyant haven for an unwinding retreat, Cuba Goa perfectly imbues Goa’s much anticipated laidback vibe. A vibrant concoction of colours & comfort, all five properties spread across South Goa make for the best suit for a relaxed chilling experience. Bridging the gap between luxury & rustic, our whimsical Beach huts, bungalows, & resorts at Palolem, Agonda, and Patnem are truly cocooned in the lap of nature. Grab a drink, feast on exotic seafood & other delicious delicacies and just chill by the golden sands and the waves; & we, at Cuba Goa, will ensure you the best staycations ever! We do entertain you with band performances, happy hours, & special requests too!                    </p>
          </div>
          <div className="aboutus-rb">
            <img src={bannerimg} alt='aboutusimg' />
            {/* <img src={aboutusimg} alt='aboutusimg'/> */}
          </div>
        </section>

      </div>
      <Footer />


    </>

  );
}

export default About;