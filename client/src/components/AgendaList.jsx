import React, { useEffect, useContext, useState } from 'react'
import AgendaItem from './AgendaItem'
import AddEditEvent from './AddEditEvent'
import DataContext from '../contexts/DataContext'

import { ExportToCsv } from 'export-to-csv';
import Papa from 'papaparse'

const AgendaList = () => {
    const { fetchAgendaList, agendaList, handleOpenModal } = useContext(DataContext)
    const [tableColumns, setTableColumns] = useState([]);
    const [tableData, setTableData] = useState([]);

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

    const changeHandler = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              const _tableData = [];

              results.data?.forEach((data, i) => {
                if (i !== 0) {
                    _tableData.push(data.__parsed_extra);
                } else {
                    setTableColumns(results.data?.[0])
                }

              })

              setTableData(_tableData);

            },
          })
          
        };
    

        useEffect(() => {
            fetchAgendaList()
        }, [fetchAgendaList])

        useEffect(() => {
            console.log(tableColumns, 'tableColumns')
            console.log(tableData, 'tableData')
        }, [tableData])
        

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
            onClick={(e) => changeHandler(e)}
            >
                <span>Import</span>
            </button>

        

            
        <div>
                {/* File Uploader */}
        <input
            id = "inp"
            type="file"
            className="file"
            accept=".csv"
            onChange={changeHandler}
        />
        </div>


            <AddEditEvent />

        <div className="excell-list">
        <table className ="table">
            <thead>
                <tr>
                    {tableColumns?.[0] && tableColumns?.[0].__parsed_extra?.map((name) => (
                        <th scope="col">{name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                     {
                        importedTableData?.map((parsedData, i) => {
                            console.log(parsedData)
                            i !== 0 
                            ?  
                                return (
                                    <tr>
                                        {
                                        parsedData.__parsed_extra?.map((data) => (
                                        <th scope="row">{data}</th>
                                        }
                                    </tr>
                                )
                                
                            : <></>
        
                        })   
                    } 
                </tr> */}
            </tbody>
        </table>
        </div>
       </>
    )
}


export default AgendaList