import { useState, useCallback } from 'react'
import { addNewEvent, deleteEvent, getData, updateEvent } from '../api-list'
import { ExportToCsv } from 'export-to-csv';

export const useData = () => {
    const [show, setShow] = useState(false)
    const [agendaList, setAgendaList] = useState([])
    const [data, setData] = useState()


    const fetchAgendaList = useCallback(async () => {
        const { data } = await getData()
        setAgendaList(data?.agendaList)
        
    }, [])


    const handleOpenModal = useCallback((item) => {
        setShow(true)
        setData(item)
    }, [])


    const handleCloseModal = useCallback(() => {
        setShow(false)
        setData('')
    }, [])


    const handleDelete = useCallback(async (id) => {
       const { data } = await deleteEvent(id)
       data.status === 'success' && fetchAgendaList()
    }, [fetchAgendaList])


    const handleAddNewEvent = useCallback(async (form) => {
        const { data } = await addNewEvent(form)
        data.status === 'success' && fetchAgendaList()
        return data.status
    }, [fetchAgendaList])


    const handleEdit = useCallback(async (form) => {
        const { data } = await updateEvent(form)
        data.status === 'success' && fetchAgendaList()
        return data.status
    }, [fetchAgendaList])


    return {
        show, agendaList, data, fetchAgendaList, handleOpenModal, handleCloseModal,
        handleDelete, handleAddNewEvent, handleEdit
    }
}