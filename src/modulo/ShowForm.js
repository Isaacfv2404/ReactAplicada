import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

class ShowForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: '',
      formData: new FormData(), // Crear un nuevo FormData
      data: [], // Agrega un estado para los datos
    };
  }

  async loadHtmlContent() {
    try {
      const email = 'isaacfallasv@gmail.com';
      const password = 'ifv123';
      const credentials = btoa(`${email}:${password}`);

      const headers = {
        Authorization: `Basic ${credentials}`,
      };
      
      const response = await axios.get(
        'https://localhost:7179/api/components',
        { headers }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        this.setState({ htmlContent: data });
        
      } else {
        console.error('Error al obtener el contenido HTML.');
      }
    } catch (error) {
      console.error('Error al obtener el contenido HTML.', error);
    }
  }

  handleSaveClick = async (event) => {
    event.preventDefault();

    try {
        const formData = this.state.formData;
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        
        const componentData = {}; // Objeto para almacenar los datos del formulario
        const inputElements = document.querySelectorAll('input[id]');
        inputElements.forEach((input) => {
          formData.append(input.id, input.value);
        });
  
        // Itera sobre los datos del formulario y construye el objeto JSON
        formData.forEach((value, key) => {
          componentData[key] = value;
        });
       
        componentData['idForm'] = id;
  
        const email = 'isaacfallasv@gmail.com';
        const password = 'ifv123';
        const credentials = btoa(`${email}:${password}`);
  
        const headers = {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        };
        axios.defaults.headers.common = headers;
        

      const response = await axios.post(
        'https://localhost:7179/api/FormData',
        componentData
      );
      if (response.status === 200) {
        const data = response.data;
        this.setState({ htmlContent: data });
        window.location.reload();
      } else {
        console.error('Error al obtener el contenido HTML.');
      }
    } catch (error) {
      console.error('Error al obtener el contenido HTML.', error);
    }
  };

  componentDidMount() {
    this.loadHtmlContent();
    this.fetchData(); // Agrega llamada a fetchData
  }

  fetchData = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');

      const email = 'isaacfallasv@gmail.com';
      const password = 'ifv123';
      const credentials = btoa(`${email}:${password}`);

      const headers = {
        Authorization: `Basic ${credentials}`,
      };

      const response = await axios.get(`https://localhost:7179/api/FormData/${id}`,  { headers });
      const data = response.data;

      this.setState({ data });
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  render() {
    const { htmlContent, data } = this.state;
    
    return (
      <div>
        <h1>Formulario</h1>
        <form
          className="styled-form"
          key="uniqueKey"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        <button onClick={this.handleSaveClick}>Guardar</button>

        <div>
          <h1>Datos de la Tabla</h1>
          <table>
            <thead>
              <tr>
                {data.length > 0 &&
                  Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, columnIndex) => (
                    <td key={columnIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ShowForm;
