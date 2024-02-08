import express, {Request, Response} from "express";
import {RequestWithBody, RequestWithParams, RequestWithQuery} from "../types";
import {ICurrencyQueryModel} from "../models/CurrencyQueryModel";
import {CurrencyViewModel} from "../models/CurrencyViewModel";
import {ICurrencyCreateModel} from "../models/CurrencyCreateModel";
import {getCurrencyViewModel} from "../db/db";
import {currenciesRepository} from "../repositories/currencies-repository";
import {body} from "express-validator";
import {validationMiddleware} from "../middlewares/input-validation-middleware";

const nameValidation = body('name').isString().isLength({min: 2, max: 4});
const currencyValueValidation = body('value').isInt();


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

    currenciesRouter.post('',
        nameValidation,
        currencyValueValidation,
        validationMiddleware,
        (req: RequestWithBody<ICurrencyCreateModel>, res: Response<CurrencyViewModel>) => {
            const newCurrency = currenciesRepository.addCurrency(req.body);

            if (!newCurrency) {
                res.sendStatus(422);
                return
            }

            res.json(getCurrencyViewModel(newCurrency));

        })

    return currenciesRouter


}