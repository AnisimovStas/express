import express, {Request, Response} from 'express'
import * as dotenv from 'dotenv'
import type {ICurrency, RequestWithBody, RequestWithParams, RequestWithQuery} from "./types";
import type {ICurrencyCreateModel} from "./models/CurrencyCreateModel";
import type {ICurrencyQueryModel} from "./models/CurrencyQueryModel";
import {CurrencyViewModel} from "./models/CurrencyViewModel";

dotenv.config({path: '.env'})
const app = express()
const port = process.env.PORT || 3000

export default app;

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware);

app.get('/', (req: Request, res) => {
    res.sendStatus(200)
})


let currencies: ICurrency[] = [
    {id: 1, name: 'usd', value: 100, emission: 200},
    {id: 2, name: 'eur', value: 200, emission: 300},
]

const getCurrencyViewModel = (currency: ICurrency): CurrencyViewModel => {
    return {
        id: currency.id,
        name: currency.name,
        value: currency.value,
    }

}

app.get('/currencies', (req: RequestWithQuery<ICurrencyQueryModel>,
                        res: Response<CurrencyViewModel[]>) => {
    let foundCurrenciesQuery = currencies

    if (req.query.name && foundCurrenciesQuery.length > 0) {
        foundCurrenciesQuery = foundCurrenciesQuery
            .filter(c => c.name.indexOf(req.query.name) > -1)
    }

    res.json(foundCurrenciesQuery.map(getCurrencyViewModel))
})

app.delete('/currencies/drop', (req: Request, res: Response) => {
    currencies = [];
    res.sendStatus(402)
})

app.get('/currencies/:name', (req: RequestWithParams<{ name: string }>, res: Response<CurrencyViewModel>) => {
    const currency = currencies.find(c => c.name === req.params.name)

    if (!currency) {
        res.sendStatus(404)
        return
    }
    res.json(getCurrencyViewModel(currency));
})

app.post('/currencies', (req: RequestWithBody<ICurrencyCreateModel>, res: Response<CurrencyViewModel>) => {
    if (!req.body.name || !req.body.value) {
        res.sendStatus(400);
        return
    }

    if (currencies.length > 0 && currencies.some(currency => currency.name === req.body.name)) {
        res.sendStatus(422);
        return
    }


    const newId = currencies.length > 0 ? currencies[currencies.length - 1].id + 1 : 1

    const newCurrency: ICurrency = {
        id: newId,
        name: req.body.name,
        value: req.body.value,
        emission: 300,
    }

    currencies.push(newCurrency)

    res.json(getCurrencyViewModel(newCurrency));

})
app.listen(port, () => {
    console.log(`Example of ${process.env.STAS} app listening on port ${port}`)
})