import React, { Component } from 'react';
import axios from 'axios';

class ShowForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlContent: '',
            formData: new FormData(), // Crear un nuevo FormData
        };
    }

    async loadHtmlContent() {
        // Código para cargar el contenido HTML desde la API, similar al que ya tienes

        try {
            const email = 'isaacfallasv@gmail.com';
            const password = 'ifv123';
            const credentials = btoa(`${email}:${password}`);

            const headers = {
                'Authorization': `Basic ${credentials}`
            };

            const response = await axios.get('https://localhost:7179/api/components', { headers });

            if (response.status === 200) {
                const data = response.data;
                this.setState({ htmlContent: data });
            } else {
                console.error('Error al obtener el contenido HTML.');
            }
        } catch (error) {
            console.error('Error al obtener el contenido HTML.', error);
        }
    }

    handleSaveClick = async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
        try {
            const formData = this.state.formData;
            const componentData = {}; // Objeto para almacenar los datos del formulario
    
            const inputElements = document.querySelectorAll('input[name]');
            inputElements.forEach((input) => {
                formData.append(input.name, input.value);});
               
            // Itera sobre los datos del formulario y construye el objeto JSON
            formData.forEach((value, key) => {
                componentData[key] = value;
            });
    
            console.log(componentData);
            const email = 'isaacfallasv@gmail.com';
            const password = 'ifv123';
            const credentials = btoa(`${email}:${password}`);

            const headers = {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            };
            axios.defaults.headers.common = headers;
           
            // Envía el objeto componentData como JSON en la solicitud POST
            const response = await axios.post('https://localhost:7179/api/FormData', componentData );
            if (response.status === 200) {
                const data = response.data;
                this.setState({ htmlContent: data });
            } else {
                console.error('Error al obtener el contenido HTML.');
            }
        } catch (error) {
            console.error('Error al obtener el contenido HTML.', error);
        }
    };
    


    componentDidMount() {
        this.loadHtmlContent();
    }

    render() {
        const { htmlContent } = this.state;

        return (
            <div>
                <h1>Formulario</h1>
                <form className="styled-form" key="uniqueKey" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                {/* Agrega un botón para guardar los datos */}
                <button onClick={this.handleSaveClick}>Guardar</button>
            </div>
        );
    }
}

export default ShowForm;