import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello anisimov!!!!!!! !')
})

app.get('/stas', (req, res) => {
    const stas ='fat'

    if (stas === 'fat') {
        res.send('Hello fat2 stas anisimov!')
    } else {
    res.send('Hello stas anisimov!')
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})