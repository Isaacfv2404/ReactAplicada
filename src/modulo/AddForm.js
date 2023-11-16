import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './app.css'

export default function AddForm() {
    let navigate = useNavigate()

    const [form, setForm] = useState({
        descriptionForm: "",
        isEnable: false
        
    })

    const { descriptionForm, isEnable } = form

    const onInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("https://localhost:7179/api/forms/", form)
        navigate("/")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Agregar Formulario</h2>
                    
                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='descriptionForm' className='form-label'>Descripcion del formulario</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Ingresa una descripcion'
                                name='descriptionForm'
                                value={descriptionForm}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='isEnable' className='form-label'>Estado</label>
                            <select
                                className='form-select'
                                name='isEnable'
                                value={isEnable}
                                onChange={onInputChange}
                            >
                                <option value={true}>Activo</option>
                                <option value={false}>Inactivo</option>
                            </select>
                        </div>

                        <button type='submit' className='btn btn-outline-primary'>Enviar</button>
                        <button type='button' className='btn btn-outline-danger mx-2' onClick={() => navigate('/')}>Cancelar</button>

                    </form>
                </div>
            </div>
        </div>
    )
}
