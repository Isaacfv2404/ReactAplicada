import axios from 'axios';

const updateFormStatus = (id, descripcion) => {
    const url = `https://localhost:7179/api/Forms/${id}`;
    const data = {
        id: id,
        descriptionForm: descripcion,
        isEnable: JSON.parse(false),
    };

    const email = 'isaacfallasv@gmail.com';
    const password = 'ifv123';
    const credentials = btoa(`${email}:${password}`);

    const headers = {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
    };

    axios.defaults.headers.common = headers;


    axios.put(url, data)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error al actualizar formulario:', error);
            throw error;
        });
}


export default updateFormStatus;
