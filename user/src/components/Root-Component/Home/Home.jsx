import React from 'react'
import './Home.css'
import Video from '../../Video'
import { useState, useEffect } from 'react'
// import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
// import { Link } from 'react-router-dom'
// import { Image } from 'react-bootstrap'
import axios from '../../../helpers/axios';
import HomeList from '../home-list/HomeList';
import Pagination from '../home-list/Pagination';
const Footer = React.lazy(() => import('../Footer/Footer'))

const Home = () => {

  // const [activeDot, setActiveDot] = useState(0)
  // const [move, setMove] = useState(0)
  // const [valnum, setVal] = useState(3)
  // const [valnum2, setVal2] = useState(0)
  // const [ourRooms, setOurRooms] = useState([])
  // const navigate = useNavigate()

  const [allProperties, setAllProperties] = useState([])
  // const [showRoomForm, setRoomForm] = useState(false)
  const getPropertiesData = async () => {
    await axios(`https://cuba-goa-server.onrender.com/hotelbook`)
      // await axios(`http://localhost:4001/hotelbook`)
      .then((res) => {
        // console.log(res.data)
        setAllProperties(res.data)
        //    setSelectedVal([res.data[0].resortName, res.data[0]._id])
      })
      .catch((err) => {
        console.log(err)
      })
  }
  console.log("allProperties =>", allProperties)
  useEffect(() => {
    getPropertiesData()
  }, [])

  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  // eslint-disable-next-line 
  const [postPerPage, setPostPerPage] = useState(4)
  const lastIndex = currentPage * postPerPage
  const firstIndex=lastIndex-postPerPage
  const currentList=allProperties.slice(firstIndex,lastIndex)

  const comments = [
    {
      username: 'tony',
      comments: `NextPrevious
    Dylan was exceptional! He was friendly, 
    enthusiastic and presented all info in an interesting manner also.
     He was more than willing to answer all questions NextPrevious
     Dylan was exceptional! He was friendly, enthusiastic and presented 
     all info in an interesting manner also. He was more than willing to answer all questions`
    }
  ]

  // const breakPoints = [
  //   { width: 1, itemsToShow: 1 },
  //   { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  //   { width: 850, itemsToShow: 3 },
  //   { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
  //   { width: 1450, itemsToShow: 5 },
  //   { width: 1750, itemsToShow: 6 },
  // ]


  return (
    <>
      <main className='Home'>
        <Video />

        {/* list of home cards */}
        <div style={{marginTop:'1rem'}} className=''>
          <h2 style={{textAlign:'center', marginTop:'2rem',marginBottom:'2.5rem'}}>FEATURED PROPERTIES</h2>
          <HomeList currentList={currentList} />
          <Pagination totalPosts={allProperties.length} postPerPage={postPerPage}  setCurrentPage={setCurrentPage} currentPage={currentPage}/>
        </div>

        <div className='entry-content'>
          <div className='mid'>
            <h2 className='entry-title'>Own your own piece of Ontario’s Cottage Country at Cuba gua.</h2>
          </div>
          <div className='large-columns'>
            <p>Welcome to Cuba gua where you will find the perfect city escape that includes all the amenities your
              family comes to expect from a resort – heated pools, multi-sports courts and playgrounds, and best of
              all, sandy combed beaches. Think stunning views, beautiful surroundings and endless options for outdoor
              adventure, for sale or rent.</p>
            <p>
              When you step inside your new home-away-from-home you’ll find the start of many family memories.
              Professionally designed, fully furnished and includes all your appliances so you have all the comforts
              of home. Enjoy stress-free and virtually maintenance-free cottage ownership along with all-inclusive amenities,
              full family entertainment and more!  Choose from nine great Ontario locations in highly sought after Muskoka,
              Prince Edward County, The Kawarthas, Perth and Saugeen Shores.
            </p>

            <p>
            The land of sun, sand, and sea – Goa is synonymous with unhindered beauty and splendid recreation. Cuba Hotels Goa is a captivating paradise for unwinding and revelling, perfect for an idyllic family vacation and conducting important business meetings. Cocooned in the lap of nature, offering a medley of flavours through its world cuisine and regional specialities that are paired with exotic concoctions and cocktails in setting that are relaxing, Cuba Hotels Goa is an oasis of luxury covering Baga in North Goa to Palolem, and Patnem and Agonda in South Goa. Embrace the languid and laid-back life that is characteristic of Goa, while our service takes care of your needs round the clock. The unique bungalows and splendid beach huts with sun beds are certain to redefine the experience of a truly enjoyable holiday leaving you in a state of wonderment and awe. A buoyant haven for an unwinding retreat, Cuba Goa perfectly imbues Goa’s much anticipated laidback vibe. A vibrant concoction of colours & comfort, all five properties spread across South Goa make for the best suit for a relaxed chilling experience. Bridging the gap between luxury & rustic, our whimsical Beach huts, bungalows, & resorts at Palolem, Agonda, and Patnem are truly cocooned in the lap of nature. Grab a drink, feast on exotic seafood & other delicious delicacies and just chill by the golden sands and the waves; & we, at Cuba Goa, will ensure you the best staycations ever! We do entertain you with band performances, happy hours, & special requests too!
            </p>
            {/* <p>So what are you waiting for? View available
            <a href="/own">cottage models for sale</a>
            , or
            <a href="/rent">start planning your family vacation today.</a>
          </p> */}
          </div>
        </div>


        <div className='npCallout'>

          <div className='img-slider'></div>
          <div className='img-slider-content' >
            <div >
              <h2>ABOUT CUBA GOA</h2>
              <h3>New Phases of <br /> Development for 2023</h3>
              <p >This exciting opportunity allows owners to select their preferred lot and new <br />cottage model within the phase.</p>
              <p>&nbsp;</p>
              <p>
                {/* <Link className="learn-more" to='/leran-More' >Learn More</Link> */}
              </p>
            </div>
          </div>
        </div>


        <section className='cottages-slide cottages-slide-2'>
          {/* <h2 className='title-card-cottages'>OUR RESORTS ROOM</h2> */}
          <div className='add-new-cottages-parent'>
          </div>
        </section>



        <section className='comments'>
          <div className='comment-container'>
            <div className='comment-image'>
              <img src="" alt="" />
            </div>
            <div className='comment-box'>

              {/* <button className='comments-button'><AiOutlineLeft/></button>  */}

              <p className='comment-message'>{comments[0].comments}</p>
              <p className='comment-message'>{comments[0].comments}</p>
              {/* <button className='comments-button'><AiOutlineRight/></button> */}
            </div>
          </div>
        </section>

        {/* <section className='greatbluesort'>
   <h2 className='greatbluesort-title'>WHAT'S HAPPENING IN CUB GOA</h2>
   <div className='greatbluesort-section'>
    {ourRooms.map((el)=><div style={{background:`url(${el.imgurl})`,boxShadow:' 1px 1px 5px 4px rgba(51, 51, 90, 0.076)'}}></div>)}
   </div>
 </section> */}
      </main >
      <Footer />
    </>
  )
}

export default Home
