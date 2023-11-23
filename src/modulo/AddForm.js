import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './app.css'

let IdForm = 0;
export default function AddForm() {
    let navigate = useNavigate()
    const [form, setForm] = useState({
        descriptionForm: "",
        isEnable: true,
    })
    const { descriptionForm, isEnable } = form
    const onInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    
    //Los commponentes de cada formulario....................................................................
    const [components, setComponents] = useState([]);// el vector de componentes de cada vector
    const [component, setComponent] = useState({
        typeComponentId: "",
        text: '',
        value: '',
        isVisible: true,
        isEnable1: true,
        placeHolder: '',
        nameDescription: '',
        formId: '',
        componentNameId: '',
    })

    const { typeComponentId, text, value, isVisible, isEnable1, placeHolder, nameDescription, formId, componentNameId } = component

    const onInputChangeComponent = (e) => {
        setComponent({ ...component, [e.target.name]: e.target.value })
    }



    //los tipos de componentes.......................................................................
    const [typeComponents, setTypeComponents] = useState([]);
    const loadTypeComponent = async () => {
        try {
            const email = 'isaacfallasv@gmail.com';
            const password = 'ifv123';
            const credentials = btoa(`${email}:${password}`);
            const headers = {
                Authorization: `Basic ${credentials}`,
                'Content-Type': 'application/json',
            };
            axios.defaults.headers.common = headers;


            const response = await axios.get('https://localhost:7179/api/TypeComponents');
            setTypeComponents(response.data);
        } catch (error) {
            console.error('Error al cargar los componentes:', error);
        }
    };

    useEffect(() => {
        loadTypeComponent();
    }, []);


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
            descriptionForm: descriptionForm,
            isEnable: JSON.parse(isEnable),
        }
        console.log(formData)
        const response = await axios.post("https://localhost:7179/api/Forms", formData)
        IdForm = response.data.id;
        console.log(IdForm);
       

    }

    //agregar los componentes de cada formulario................
    const onSubmit2 = async (e) => {
        e.preventDefault()
        const email = 'isaacfallasv@gmail.com';
        const password = 'ifv123';
        const credentials = btoa(`${email}:${password}`);

        const headers = {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/json',
        };
        axios.defaults.headers.common = headers;


        const componentData = {
            typeComponentId: parseInt(typeComponentId),
            text: text,
            value: value,
            isVisible: true,
            isEnable: true,
            placeHolder: placeHolder,
            nameDescription: nameDescription,
            formId: parseInt(IdForm),
            componentNameId: componentNameId,

        }
        console.log(componentData)
        const response = await axios.post("https://localhost:7179/api/Components", componentData)
      
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



            <div className='components'>
                <h2>COMPONENTES</h2>

                <form onSubmit={onSubmit2}>
                    <div>
                        <select
                            className="form-control"
                            name="typeComponentId"
                            value={typeComponentId}
                            onChange={(e) => onInputChangeComponent(e)}
                        >
                            <option value="">Selecciona un componente</option>
                            {typeComponents.map((comp) => (
                                <option key={comp.id} value={comp.id}>
                                    {comp.nameComponent}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Texto</label>
                        <input
                            type="text"
                            className="form-control"
                            name="text"
                            value={text}
                            onChange={(e) => onInputChangeComponent(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="value" className="form-label">Valor</label>
                        <input
                            type="text"
                            className="form-control"
                            name="value"
                            value={value}
                            onChange={(e) => onInputChangeComponent(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="placeHolder" className="form-label">Marcador de Posición</label>
                        <input
                            type="text"
                            className="form-control"
                            name="placeHolder"
                            value={placeHolder}
                            onChange={(e) => onInputChangeComponent(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="nameDescription" className="form-label"> NameDescripción</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nameDescription"
                            value={nameDescription}
                            onChange={(e) => onInputChangeComponent(e)}
                        />
                    </div>
                    <div>
                        <label htmlFor="componentNameId" className="form-label">Nombre del Componente</label>
                        <input
                            type="text"
                            className="form-control"
                            name="componentNameId"
                            value={componentNameId}
                            onChange={(e) => onInputChangeComponent(e)}
                        />
                    </div>


                    <button type='submit' className='btn btn-outline-primary'>Guardar componente</button>
                </form>

            </div >

        </div >
    )
}
