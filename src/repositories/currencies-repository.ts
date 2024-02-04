import {ICurrency} from "../types";
import {ICurrencyCreateModel} from "../models/CurrencyCreateModel";

export let currencies: ICurrency[] = [
    {id: 1, name: 'usd', value: 100, emission: 200},
    {id: 2, name: 'eur', value: 200, emission: 300},
]
export const currenciesRepository = {
    findCurrency(name?: string) {

        if (!name) {
            return currencies
        }

        return currencies.filter(currency => currency.name === name)
    },

    removeCurrency(id: number) {
        currencies = currencies.filter(currency => currency.id !== id);
    },

    dropCurrencies() {
        currencies = [];
    },

    findCurrencyByName(name: string) {
        return currencies.find(currency => currency.name === name)
    },

    addCurrency(dto: ICurrencyCreateModel) {
        const newId = currencies.length > 0 ? currencies[currencies.length - 1].id + 1 : 1


        const newCurrency: ICurrency = {
            id: newId,
            name: dto.name,
            value: dto.value,
            emission: 300,
        }

        if (currencies.length > 0 && currencies.some(currency => currency.name === dto.name)) {
            return null
        }

        currencies.push(newCurrency)
        return newCurrency
    }

}