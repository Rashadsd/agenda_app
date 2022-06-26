import React, { useContext } from 'react'
import DataContext from '../contexts/DataContext'


const AgendaItem = (item) => {
    const { id, title, description, status, time } = item 
    const { handleDelete, handleEdit, handleOpenModal } = useContext(DataContext)


    return (
        <div className="item border shadow">
            <div className="header bg-dark text-light">
                <div className="col-left">
                    <input 
                        type="checkbox"
                        className="form-control"
                        checked={status}
                        onChange={() => handleEdit({ ...item, status: !status })}
                    />
                    <p className="time">{time}</p>    
                </div>

                <h4 className="title">{title}</h4>

                <div className="col-right">
                    <button 
                        className="btn btn-info"
                        onClick={() => !status ? handleOpenModal(item) : undefined}
                        disabled={status}
                    >
                        Edit
                    </button>

                    <button 
                        className='btn btn-danger'
                        onClick={() => !status ? handleDelete(id) : undefined}
                        disabled={status}
                    >
                        Delete
                    </button>
                </div>
            </div>

            {
                description 
                    ?   <div className="main">
                            <p className="description">{description}</p>
                        </div>
                    : ''
            }
        </div>
    )
}


export default AgendaItem