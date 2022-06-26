import { createContext } from 'react'


export default createContext({
    data: {},
    show: false,
    agendaList: [],
    fetchAgendaList() {},
    handleOpenModal() {},
    handleCloseModal() {},
    handleAddNewEvent() {},
    handleDelete() {},
    handleEdit() {}
})