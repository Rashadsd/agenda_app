import React, { useState, useEffect, useContext } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import DataContext  from '../contexts/DataContext'


const AddEditEvent = () => {
    const [form, setForm] = useState()
    const { data, show, handleCloseModal, handleAddNewEvent, handleEdit } = useContext(DataContext)

    useEffect(() => {
        setForm(data)
    }, [data])
    

    const handleChange = e => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }


    const closeModal = () => {
        handleCloseModal()
        setForm('')
    }
   

    const handleSubmit = async e => {
        e.preventDefault()
        const _form = {
            ...form,
            time: form.time.trim(),
            title: form.title.trim(),
            description: form.description.trim(),
        }

        const status = data?.id ? await handleEdit(_form) : await handleAddNewEvent(_form)
        status === 'success' && handleCloseModal()
    }


    return (
        <Modal 
            show={show}
            onHide={closeModal}
        >
            <Modal.Body>
                <h2 className="title">Add new Event</h2>

                <Form
                    onSubmit={handleSubmit}
                >
                    <div className="input-group">
                        <label htmlFor='time'>Time</label>
                        <input 
                            type="text"
                            id="time"
                            name="time"
                            className="form-control"
                            value={form?.time || ''}
                            onChange={handleChange}
                            placeholder="12:30"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            value={form?.title || ''}
                            onChange={handleChange}
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor='description'>Description</label>

                        <textarea 
                            value={form?.description || ''}
                            id="description"
                            name="description"
                            className="form-control"
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <Button 
                        type="submit"
                        variant="success"
                    >
                        {data?.id ? 'Edit' : 'Add'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddEditEvent