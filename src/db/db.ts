import {ICurrency} from "../types";
import {CurrencyViewModel} from "../models/CurrencyViewModel";

 
export const getCurrencyViewModel = (currency: ICurrency): CurrencyViewModel => {
    return {
        id: currency.id,
        name: currency.name,
        value: currency.value,
    }

}
