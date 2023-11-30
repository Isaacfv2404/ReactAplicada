import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function EditForm() {
  let navigate = useNavigate()

  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')

  const [form, setForm] = useState({
    descriptionForm: '',
    isEnable: false,
  })

  const { descriptionForm, isEnable } = form

  const onInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    loadForm()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()

    const email = 'isaacfallasv@gmail.com';
    const password = 'ifv123';
    const credentials = btoa(`${email}:${password}`);

    const headers = {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    };
    axios.defaults.headers.common = headers;

    const formData = {
      id: id,
      descriptionForm: descriptionForm,
      isEnable: JSON.parse(isEnable),
  }
    console.log(formData);
    await axios.put(`https://localhost:7179/api/forms/${id}`, formData)
    navigate('/')
  }

  const loadForm = async () => {
    const email = 'isaacfallasv@gmail.com';
    const password = 'ifv123';
    const credentials = btoa(`${email}:${password}`);

    const headers = {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    };
    axios.defaults.headers.common = headers;

    const result = await axios.get(`https://localhost:7179/api/forms/${id}`)
    setForm(result.data)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Edit Form</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <label htmlFor='descriptionForm' className='form-label'>
                Descripcion de formulario
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Ingresa una descripción'
                name='descriptionForm'
                value={descriptionForm}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='isEnable' className='form-label'>
                Estado
              </label>
              <select className='form-select' name='isEnable' value={isEnable} onChange={(e) => onInputChange(e)}>
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
              </select>
            </div>
           
            <button type='submit' className='btn btn-outline-primary'>
              Modificar
            </button>
            <Link className='btn btn-outline-danger mx-2' to='/'>
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
