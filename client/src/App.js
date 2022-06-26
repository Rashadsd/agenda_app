import React from 'react'
import AgendaList from "./components/AgendaList"
import DataContext from './contexts/DataContext'
import { useData } from './hooks/useData'


function App() {
  const data = useData()

  return (
    <DataContext.Provider value={{ ...data }}>
        <div className="container">
            <h2 className="title text-center">Agenda List</h2>
            <AgendaList />
        </div>
    </DataContext.Provider>
  );
}

export default App;
