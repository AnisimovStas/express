import type {Request} from 'express'

export interface ICurrency {
    /**
     * id of existing currency
     */
    id: number
    name: string
    emission: number,
    value: number
}


export  type RequestWithBody<T> = Request<{}, {}, T>
export  type RequestWithQuery<T> = Request<{}, {}, {}, T>
export  type RequestWithParams<T> = Request<T>