import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DeleteForm() {
    let navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
            deleteForm(id);
        } else {
            navigate('/');
        }
    }, [navigate]);

    const deleteForm = async (id) => {
        const email = 'isaacfallasv@gmail.com';
        const password = 'ifv123';

        const credentials = btoa(`${email}:${password}`);
        const headers = {
            'Authorization': `Basic ${credentials}`,
        };

        try {
            await axios.delete(`https://localhost:7179/api/forms/${id}`, { headers });
            navigate('/');
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    return null;
}
