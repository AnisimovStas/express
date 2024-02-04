import express, {Request, Response} from "express";
import {RequestWithBody, RequestWithParams, RequestWithQuery} from "../types";
import {ICurrencyQueryModel} from "../models/CurrencyQueryModel";
import {CurrencyViewModel} from "../models/CurrencyViewModel";
import {ICurrencyCreateModel} from "../models/CurrencyCreateModel";
import {getCurrencyViewModel} from "../db/db";
import {currenciesRepository} from "../repositories/currencies-repository";


export const getCurrenciesRoutes = () => {

    const currenciesRouter = express.Router();

    currenciesRouter.get('/', (req: RequestWithQuery<ICurrencyQueryModel>,
                               res: Response<CurrencyViewModel[]>) => {
        let foundCurrenciesQuery = currenciesRepository.findCurrency(req.query.name);

        res.json(foundCurrenciesQuery.map(getCurrencyViewModel))
    })

    currenciesRouter.delete('/drop', (req: Request, res: Response) => {
        currenciesRepository.dropCurrencies();
        res.sendStatus(402)
    })

    currenciesRouter.get('/:name', (req: RequestWithParams<{
        name: string
    }>, res: Response<CurrencyViewModel>) => {
        const currency = currenciesRepository.findCurrencyByName(req.params.name);

        if (!currency) {
            res.sendStatus(404)
            return
        }
        res.json(getCurrencyViewModel(currency));
    })

    currenciesRouter.post('', (req: RequestWithBody<ICurrencyCreateModel>, res: Response<CurrencyViewModel>) => {
        if (!req.body.name || !req.body.value) {
            res.sendStatus(400);
            return
        }

        const newCurrency = currenciesRepository.addCurrency(req.body);

        if (!newCurrency) {
            res.sendStatus(422);
            return
        }

        res.json(getCurrencyViewModel(newCurrency));

    })

    return currenciesRouter


}