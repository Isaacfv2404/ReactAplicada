import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

import axios from "axios"

import { Link, redirect, useParams, useNavigate } from 'react-router-dom'

import updateFormStatus from '../service/FormService'
import { wait } from '@testing-library/user-event/dist/utils'
export default function FormsList() {

  /**
   * Es un arreglo llamado users que guarda un json con los datos
   * del cliente recibido
   */
  let navigate = useNavigate()
  const [forms, setForms] = useState([])

  /*
  Es un metodo que se inicia al cargar la pagina
  llama al metodo loadUser
  */
  useEffect(() => {
    loadForms();
  }, [])



  const loadForms = async () => {
    const email = 'isaacfallasv@gmail.com';
    const password = 'ifv123';
    const credentials = btoa(`${email}:${password}`); // Codificar credenciales en base64
    const headers = {
      'Authorization': `Basic ${credentials}`
    };

    try {
      const response = await axios.get('https://localhost:7179/api/forms', { headers });
      setForms(response.data);
    } catch (error) {
      // Manejar errores aquí
      console.error('Error al cargar los formularios:', error);
    }
  };

  const handleDelete = async (id, descripcion) => {

    console.log(id);

    Swal.fire({
      title: "¿Estas seguro?",
      text: "!No podras revertirlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "!Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        updateFormStatus(id, descripcion);
        Swal.fire({
          title: "!Eliminado!",
          text: "El formulario fue eliminado",
          icon: "success"
        });
        wait(10000);
        window.location.reload();
      }
    });
  };


  return (
    <div className='container'>
      <div className='py-4'>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Descripción de Formulario</th>
              <th scope="col">Estado</th>
              <th scope="col">Modificación</th>
              <th scope="col">Eliminar</th>
              <th scope="col">Ver</th>
            </tr>
          </thead>
          <tbody>

            {
              /*
              Recorre la lista del JSON
              y las coloca en la lista
              */
              forms.filter(formulario => formulario.isEnable).map((formulario, index) => (
                <tr>
                  <th scope="row" key={index}>{index + 1}</th>

                  <td>{formulario.descriptionForm}</td>
                  <td>{formulario.isEnable ? 'Activo' : 'Inactivo'}</td>


                  <td>
                    <Link to={`/FormComponent?id=${formulario.id}`} className='btn btn-outline-primary mx-2'>Modificar</Link>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(formulario.id, formulario.descriptionForm)} className='btn btn-danger mx-2'>
                      Eliminar
                    </button>
                  </td>

                  <td>
                    <Link to={`/ShowForm?id=${formulario.id}`} className='btn btn-danger mx-2'>Ver</Link>
                  </td>

                </tr>
              ))
            }
          </tbody>
        </table>
        <Link to={`/addForm`} className='btn btn-danger mx-2'>Agregar Nuevo</Link>

      </div>
    </div>
  )
}
