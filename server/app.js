const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs/promises')
const { v4 } = require('uuid')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


const pathToFile = path.join(__dirname, './data.json')

const readFile = async () => {
    const data = await fs.readFile(pathToFile, 'utf-8')
    const { agendaList } = JSON.parse(data)
    return agendaList
}

app.get('/api/', async (req, res) => {
    const agendaList = await readFile()
    res.json({ agendaList })
})


app.post('/api', async (req, res) => {
    const { title, description, time } = req.body

    let agendaList = await readFile()
    agendaList = agendaList.concat({ 
        id: v4(),
        status: false,
        title,
        description,
        time
    })

    await fs.writeFile(pathToFile, JSON.stringify({ agendaList }, null, 2))

    res.json({ status: 'success', message: 'Added successfully' })
})


app.put('/api/:id', async (req, res) => {
    const { title, description, status, time } = req.body

    let agendaList = await readFile()

    agendaList = agendaList.map(item =>{
       return item.id === req.params.id ? ({ ...item, title, description, status, time }) : item
    })

    await fs.writeFile(pathToFile, JSON.stringify({ agendaList }, null, 2))

    res.json({ status: 'success', message: 'Edited successfully' })
})


app.delete('/api/:id', async (req, res) => {
    const { id } = req.params

    let agendaList = await readFile()

    agendaList = agendaList.filter(item => item.id !== id)

    await fs.writeFile(pathToFile, JSON.stringify({ agendaList }, null, 2))

    res.json({ status: 'success', message: 'Deleted successfully' })
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server has been running on port ${PORT}`))