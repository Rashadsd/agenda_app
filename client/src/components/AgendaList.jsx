import React, { useEffect, useContext } from 'react'
import AgendaItem from './AgendaItem'
import AddEditEvent from './AddEditEvent'
import DataContext from '../contexts/DataContext'

import { ExportToCsv } from 'export-to-csv';

const AgendaList = () => {
    const { fetchAgendaList, agendaList, handleOpenModal } = useContext(DataContext)
    const exportAgendaList = () =>{
        const options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'Time scheduler',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
          };
          
        const csvExporter = new ExportToCsv(options);
        
        csvExporter.generateCsv(agendaList);
        return agendaList
    }
    

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
            
            <button
            id="exp"
            className="btn btn-export"
            onClick={() => console.log(exportAgendaList())}
            >
                <span>Export</span>
            </button>

            <button
            id="imp"
            className="btn btn-import"
            >
                <span>Import</span>
            </button>


            <AddEditEvent />
       </>
    )
}


export default AgendaList