import '../signin/Signin'
import React, { useState } from 'react'
import { CForm, CFormInput, CCol, CButton } from '@coreui/react'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import axios from "../../../helpers/axios";

const Register = () => {
    const navigate = useNavigate()

    const [formobj, setFormobj] = useState({
        name: '',
        email: '',
        password: ''
    })
    const handleInputs = (e) => {
        setFormobj(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const handleRegister = async(e) => {
        e.preventDefault()
        console.log(formobj)
        try {
            const response =await  axios.post('/client-register', formobj)
            // console.log(response)
            if (response.data.success) {
                console.log(response.data.message)
                navigate('/signin')
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <section className='log-in' >
            <CForm className='login-form'>

                <CCol className='my-2'>
                    <CFormInput type='text' placeholder='username' name='name' value={formobj.name}
                        onChange={handleInputs} />
                </CCol>
                <CCol className='my-2'>
                    <CFormInput type='email' placeholder='email' name='email' value={formobj.email}
                        onChange={handleInputs} />
                </CCol>
                <CCol className='my-2'>
                    <CFormInput type='password' placeholder='password' name='password' value={formobj.password}
                        onChange={handleInputs}/>
                </CCol>
                <CCol>
                    <CButton type='submit' onClick={handleRegister}>Register</CButton>
                </CCol>
                <CCol className="already-have-an-account" style={{ color: 'white' }}>
                    Already have an account?
                    <span className='regiser-span' style={{ color: 'yellow' }} onClick={() => navigate('/signin')}> Login</span>
                </CCol>
            </CForm>

        </section>
    )
}

export default Register;
