const fs = require('fs')
const path = require('path');
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const DATA_FILE_PATH = path.join(__dirname, 'data.json')

app.use(cors())

let rawData = fs.readFileSync(DATA_FILE_PATH, 'utf-8')
    data = JSON.parse(rawData)

app.get('/', (req, res) => {
    const count = req.query.count
    
    if (count && count <= data.projects.length) {
        const sliced = {
                        ...data,
                        projects: [
                            ...data.projects.slice(0, count)
                        ]
                    }
        return res.json(sliced)
    } else if (!count) {
        return res.json(data)
    } else {
        return res.status(404).json('Exceeded count limit. Choose a number less than or equal to ' + count)
    }
})

app.get('/project/:projectId', (req, res) => {
    const id = req.params.projectId
    const project = data.projects.filter(e => e.projectId === id)
    
    if (project.length > 0) {
        return res.json(project)
    } else {
        return res.status(404).json("Project doesn't exist. Please try another ID.")
    }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})