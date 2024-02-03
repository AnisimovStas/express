import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config({path: '.env'})
const app = express()
const port = process.env.PORT || 3000

export default app;

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware);

app.get('/', (req, res) => {
    res.sendStatus(200)
})

let currencies = [{id: 1, name: 'usd', value: 100}, {id: 2, name: 'eur', value: 200}]
app.get('/currencies', (req, res) => {
    let foundCurrenciesQuery = currencies

    if (req.query.name && foundCurrenciesQuery.length > 0) {
        foundCurrenciesQuery = foundCurrenciesQuery
            .filter(c => c.name.indexOf(req.query.name as string) > -1)
    }

    res.json(foundCurrenciesQuery)
})

app.delete('/currencies/drop', (req, res) => {
    currencies = [];
    res.sendStatus(402)
})

app.get('/currencies/:name', (req, res) => {
    const currency = currencies.find(c => c.name === req.params.name)

    if (!currency) {
        res.status(404).json({error: 'Currency not found'})
        return
    }
    res.json(currency)
})

app.post('/currencies', (req, res) => {
    if (!req.body.name || !req.body.value) {
        res.status(400).json({error: 'Bad request'})
        return
    }

    if (currencies.length > 0 && currencies.some(currency => currency.name === req.body.name)) {
        res.status(401).json({error: 'Currency already exists'})
        return
    }


    const newId = currencies.length > 0 ? currencies[currencies.length - 1].id + 1 : 1

    const newCurrency = {
        id: newId,
        name: req.body.name,
        value: req.body.value
    }

    currencies.push(newCurrency)

    res.json(newCurrency);

})


app.get('/stas', (req, res) => {
    const stas = 'fat'

    if (stas === 'fat') {
        res.send('Hello fat2 stas anisimov!')
    } else {
        res.send('Hello stas anisimov!')
    }
})


app.listen(port, () => {
    console.log(`Example of ${process.env.STAS} app listening on port ${port}`)
})