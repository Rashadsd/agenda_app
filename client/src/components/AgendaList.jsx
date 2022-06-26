import React, { useEffect, useContext } from 'react'
import AgendaItem from './AgendaItem'
import AddEditEvent from './AddEditEvent'
import DataContext from '../contexts/DataContext'


const AgendaList = () => {
    const { fetchAgendaList, agendaList, handleOpenModal } = useContext(DataContext)

    useEffect(() => {
        fetchAgendaList()
    }, [fetchAgendaList])


    return (
       <>
            <div className="agenda-list">
                {
                   agendaList?.length 
                    ?  agendaList?.map(item => {
                        return <AgendaItem 
                                    key={item.id} 
                                    {...item}
                                />
                        })
                    : <p className="text-center text-danger h5">No data</p>
                }
            </div>

            <button 
                id="add"
                className="btn btn-success"
                onClick={() => handleOpenModal('')}
            >
                <span>Add Event</span>
            </button>

            <AddEditEvent />
       </>
    )
}


export default AgendaList