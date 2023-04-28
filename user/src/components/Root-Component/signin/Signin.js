import React from 'react'
import { CForm, CFormInput, CCol, CButton } from '@coreui/react'
import { useState } from 'react'
import axios from "../../../helpers/axios";
import './signin.css'
import { useNavigate } from 'react-router'
const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const login = async () => {
    const obj = {
      email: email, password: password
    }
    const resp = await axios.post("/client-signin", obj)
    console.log('resp=>', resp.data.data.token)
    localStorage.setItem('token',resp.data.data.token)
    navigate('/')
  }




  return (
    <section className='log-in' >
      <CForm className='login-form' onSubmit={(e) => {
        e.target.preventDefault()
      }

      }>

        <CCol className='my-2'>
          <CFormInput type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </CCol>
        <CCol className='my-2'>
          <CFormInput type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </CCol>
        <CCol>
          <CButton onClick={login} >Login</CButton>
          <p onClick={() => navigate('/register')}
            style={{ color: 'white' }}>create new account click here</p>
        </CCol>
      </CForm>
    </section>
  )
}

export default Login
