import React, { useEffect, useState } from 'react'

/*
Al importar axios de la biblioteca, 
estás agregando la funcionalidad necesaria 
no necesariamente para realizar solicitudes HTTP, como GET, POST, PUT, DELETE, etc
*/
import axios from "axios"

/*
Link se utiliza para crear enlaces entre diferentes rutas en la aplicación. 
Permite al usuario hacer clic en un enlace y cambiar 
la URL del navegador sin recargar la página completa.
*/
import { Link, useParams } from 'react-router-dom'

export default function FormsList() {

  /**
   * Es un arreglo llamado users que guarda un json con los datos
   * del cliente recibido
   */
  const [forms, setForms] = useState([])

  /*
  Es un metodo que se inicia al cargar la pagina
  llama al metodo loadUser
  */
  useEffect(() => {
    loadForms();
  }, [])

  /*
  Metodo que recibe un json del springboot
  lo guarda en users. y lo tiene como una lista
  */
  const email = 'isaacfallasv@gmail.com';
  const password = 'ifv123';

  const loadForms = async () => {
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


  return (
    <div className='container'>
      <div className='py-4'>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Id</th>
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
              forms.map((formulario, index) => (
                <tr>
                  <th scope="row" key={index}>{index + 1}</th>
                  <td>{formulario.id}</td>
                  <td>{formulario.descriptionForm}</td>
                  <td>{formulario.isEnable ? 'Activo' : 'Inactivo'}</td>


                  <td>
                    <Link to={`/EditForm?id=${formulario.id}`} className='btn btn-outline-primary mx-2'>Modificar</Link>
                  </td>
                  <td>
                    <Link to={`/DeleteForm?id=${formulario.id}`} className='btn btn-danger mx-2'>Eliminar</Link>
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
