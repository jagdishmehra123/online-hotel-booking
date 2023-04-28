import './OurProperties.css'
import React, { useEffect } from 'react'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { RiHotelLine } from 'react-icons/ri'
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "../../../helpers/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CButton, CCol, CModal, CModalHeader,
  CModalTitle, CModalBody, CModalFooter, CFormInput, CRow,
  CFormTextarea, CFormCheck, CCard, CCardHeader, CCardBody,
  CImage
} from '@coreui/react'


const PropertiesForm = ({ getPropertiesData }) => {

  const navigate = useNavigate()
  const [visibleForm, setVisibleForm] = useState(false)
  const [resortForm, setResortForm] = useState({ resortImgURL: "", resortName: "", resortDescription: "", resortLocation: "" })
  const [showSelectedImg, setShowSelectedImg] = useState("")
  const [resortImage, setResortImage] = useState("")
  const handleResortForm = (params) => (e) => {
    setResortForm({ ...resortForm, [params]: e.target.value })
  }

  const postPropertyForm = async () => {
    // await axios.post("https://cubagoa-server.onrender.com/hotelbook", resortForm).
    await axios.post("/hotelbook", resortForm)
      .then((res) => {
        console.log(res)
        setVisibleForm(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const imgCloudUpload = async (e) => {
    e.preventDefault()
    if (!resortForm.resortName || !resortForm.resortLocation || !resortForm.resortDescription) {
      return toast.error("Please fill all the Input Fields !")
    }
    else if (!resortImage) {
      return toast.error("No Image Chosen !")
    }
    const imgData = new FormData()
    imgData.append("file", resortImage)
    imgData.append("upload_preset", "ketanInstaClone")
    await axios.post("https://api.cloudinary.com/v1_1/ketantb/image/upload", imgData)
      .then((res) => {
        // console.log(res)
        setResortForm({ ...resortForm, resortImgURL: res.data.secure_url })
        // console.log(resortForm)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setResortImage(event.target.files[0])
      setShowSelectedImg(URL.createObjectURL(event.target.files[0]));
    }
  }

  // const [resrtImgPrograss, setImgPrograss] = useState(0)
  // const [roomImgProgress, setRoomProgress] = useState(0)
  // const [roomImgUrl, setRoomImgUrl] = useState('')
  // const [resortName, setResortName] = useState('')
  // const [roomName, setRoomName] = useState('')
  // const [max, setMax] = useState(0)
  // const [min, setMin] = useState(0)
  // const [content, setContent] = useState('')
  // const [children, setChildren] = useState('')
  // const [adults, setAdults] = useState('')
  // const [room, setRoom] = useState(0)
  // const [leftRoom, setLeftRoom] = useState(0)
  // const [rsRoomOnly, setRoomOnly] = useState(0)
  // const [rsbreakFast, setBreakFast] = useState(0)
  // const [roomPerNight, setRomPerNight] = useState(0)
  // const [roomAminities, setRoomAminities] = useState('')
  // const [notCancable, setNotCacable] = useState(false)
  // const [wardrobe, seWardRobe] = useState(false)
  // const [besideTable, setBesideTable] = useState(false)
  // const [fan, setFan] = useState(false)
  // const [balcony, setBalcony] = useState(false)
  // const [houseKeping, setHouseKeping] = useState(false)
  // const [mosquito, setMosquito] = useState(false)
  // const [hour24ColdShower, set24HourColdShower] = useState(false)
  // const [wifi, setWifi] = useState(false)
  // const [airCodition, setAirCondition] = useState(false)
  // const imgref = useRef(null)
  // const imgref2 = useRef(null)
  // const [fileUploaded, setFileUpload] = useState([])
  // const [roomMultiPalImgUrls, setRoomMultiPalImgUrls] = useState([])





  const saveResortInfo = async () => {

    // const newRoomdata = {
    //   allimgurl: roomMultiPalImgUrls,
    //   imgurl: roomImgUrl,
    //   title2: roomName,
    //   roomcapacity: { max: " ", min: " " },
    //   perRoom: rsRoomOnly,
    //   adults: adults,
    //   chlidren: children,
    //   room: room,
    //   leftroom: " ",
    //   perRoomPerWithBreakFast: rsbreakFast,
    //   Guest_Reviews: 'No Reviews',
    //   Room_Amenities: '',
    //   nonCancel: notCancable,
    //   Wardrobe: wardrobe,
    //   Bedside_Table: besideTable,
    //   Fan: fan,
    //   Balcony: balcony,
    //   House_Keeping: houseKeping,
    //   pernightroom: roomPerNight,
    //   mosquitonet: mosquito,
    //   Wifi: wifi,
    //   coldshower_24hrs: hour24ColdShower,
    //   airconditioned: airCodition,
  }

  // const data = {
  //   title: resortName,
  //   content: content,
  //   bookingUrl: '#',
  //   availableroom:
  //     [
  //       newRoomdata,
  //     ]
  // }

  // console.log(data)

  // await axios.post(`https://cubagoa-server.onrender.com/hotelbook`, data)
  // .then((response) => {
  //   console.log(response)
  // })
  // .catch((err) => {
  //   console.log(err)
  // })

  // fetch(`https://cubagoa-server.onrender.com/hotelbook`, {
  //   method: "POST",
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data)
  // })
  //   .then((resp) => { resp.json() })
  //   .then(data => console.log(data))
  //   .catch(err => console.log(err))


  //}

  useEffect(() => {
    if (resortForm.resortImgURL) {
      postPropertyForm()
    }
  }, [resortForm.resortImgURL])

  return (
    <>
      <CCol className='text-end px-4 py-3'>
        <CButton className='mx-5' onClick={() => setVisibleForm(true)}>ADD ON</CButton>
      </CCol>

      <CModal
        keyboard={false}
        portal={false}
        visible={visibleForm}
        className='booking-form-p ' scrollable size='lg'>
        <section style={{ zIndex: 100000, position: 'absolute' }}>
          <ToastContainer
            autoClose={1500}
            limit={5}
            theme={"dark"}
            pauseOnFocusLoss={false}
            position={"top-center"}
          />
        </section>
        <CModalHeader onClick={() => { setVisibleForm(false) }}>
          <CModalTitle><h4>Resort Info</h4></CModalTitle>
        </CModalHeader>
        <CModalBody >

          {/* <CRow className='py-4'>
            <CCol className='m-0 p-0'>
              <CImage ref={imgref2} className='p-0 m-0' width={300} height={200} />
            </CCol>
          </CRow>

          <CRow>
            <CCol lg={6}>
              <CFormInput type='file' label={`Upload Resort Image ${resrtImgPrograss}%`} />
            </CCol>
            <CCol lg={6}>
              <CFormInput label='Resort Name' value={resortName} onChange={(e) => setResortName(e.target.value)} type='text' />
            </CCol>
            <CCol lg={6}>
              <CFormInput label='Resort Location' value={resortName} onChange={(e) => setResortName(e.target.value)} type='text' />
            </CCol>
          </CRow>
          <CRow>
            <CCol className='mt-2'>
              <CFormTextarea label='About Resort' value={content} onChange={(e) => setContent(e.target.value)} ></CFormTextarea>
            </CCol>
          </CRow> */}


          <div className="mb-4" style={{ textAlign: 'center' }}>
            <CImage className='p-0 m-0' width={300} height={200} src={showSelectedImg} />
          </div>
          <div className="mb-4">
            <CFormInput type="file" id="formFile" label="Upload resort image" onChange={onImageChange} />
          </div>
          <div className="mb-4">
            <CFormInput label="Resort Name" maxLength={30} onChange={handleResortForm('resortName')} />
          </div>
          <div className="mb-4">
            <CFormInput type="text" size="sm" maxLength={30} label="Location" onChange={handleResortForm('resortLocation')} />
          </div>
          <div>
            <CFormTextarea label="Resort Info" maxLength={75} onChange={handleResortForm('resortDescription')} />
          </div>






          {/*    <CRow className='mt-5 mb-2'>
            <CCol>
              <h4>Room info</h4>
            </CCol>
          </CRow>
          <CRow className='py-4'>
            <CCol className='m-0 p-0'>
              <CImage ref={imgref} className='p-0 m-0' width={300} height={200} />
            </CCol>
            <CCol lg={6} className='pt-5'>
              <CFormInput type='file' accept="image/*" label={`Upload Uniq Room Image ${roomImgProgress}%`} />
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={6}>
              <CFormInput type='file' accept="image/*" multiple="multiple" label={`Upload Multipal Room Image ${~~(roomMultiPalImgUrls.length / fileUploaded.length) * 100}%`}
              />
            </CCol>
            <CCol lg={6}>
              <CFormInput label='Room Name' value={roomName} onChange={(e) => setRoomName(e.target.value)} type='text' />
            </CCol>
          </CRow>

           <CRow>
            <CCol className='mt-2' lg={6}>
              <CFormInput label='Adult Capacity ' value={adults} type='number' onChange={(e) => setAdults(e.target.value)} />
            </CCol>
            <CCol className='mt-2' lg={6}>
              <CFormInput label='Children Capacity ' value={children} type='number' onChange={(e) => setChildren(e.target.value)} />
            </CCol>
          </CRow>
          <CRow>
            <CCol className='mt-2' lg={6}>
              <CFormInput label='No of Room' type='number' value={room} onChange={(e) => setRoom(e.target.value)} />
            </CCol>
            <CCol className='mt-2' lg={6}>
              <CFormInput label='Rs Room only' type='number' value={rsRoomOnly} onChange={(e) => setRoomOnly(e.target.value)} />
            </CCol>
          </CRow>

          <CRow>
            <CCol className='mt-2' lg={6}>
              <CFormInput label='Rs Room with Breakfast' type='number' value={rsbreakFast} onChange={(e) => setBreakFast(e.target.value)} />
            </CCol>
            <CCol className='mt-2' lg={6}>
              <CFormInput label='Room No Of Per night' type='number' value={roomPerNight} onChange={(e) => setRomPerNight(e.target.value)} />
            </CCol>
          </CRow>


          <CCard className='mx-2 mt-4'>
            <CCardHeader className='text-center'>
              <h4>Room Facility</h4>
            </CCardHeader>
            <CCardBody className='p-4 ' >

              <CRow className='text-start'>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Non Cancel / Non Refundable'
                    checked={notCancable} onChange={() => setNotCacable(val => !val)} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Wardrobe'
                    checked={wardrobe} onChange={() => seWardRobe(val => !val)}
                  />
                </CCol>
              </CRow>

              <CRow className='text-start'>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Bedside Table'
                    checked={besideTable} onChange={() => setBesideTable(val => !val)} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Fan'
                    checked={fan} onChange={() => setFan(val => !val)} />
                </CCol>
              </CRow >

              <CRow className='text-start'>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Balcony'
                    checked={balcony} onChange={() => setBalcony(val => !val)} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='House Keeping'
                    checked={houseKeping} onChange={() => setHouseKeping(val => !val)} />
                </CCol>
              </CRow>

              <CRow className='text-start'>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Mosquito Net'
                    checked={mosquito} onChange={() => setMosquito(val => !val)} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='24hr hot & cold shower'
                    checked={hour24ColdShower} onChange={() => set24HourColdShower(val => !val)}
                  />
                </CCol>
              </CRow>
              <CRow className='text-start' >
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='WiFi'
                    checked={wifi} onChange={() => setWifi(val => !val)} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='AC'
                    checked={airCodition} onChange={() => setAirCondition(val => !val)}
                  />
                </CCol>

              </CRow>

            </CCardBody>
          </CCard> */}


        </CModalBody>



        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleForm(false)}>
            Close
          </CButton>
          <CButton color="primary" type='submit' onClick={imgCloudUpload}>Save Resort</CButton>
        </CModalFooter>
      </CModal>

      {console.log(resortImage)}
    </>
  )
}

export default PropertiesForm