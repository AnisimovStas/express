import express, {NextFunction, Request, Response} from "express";
import {getCurrenciesRoutes} from "./routes/currencies";
 

const app = express()

export const jsonBodyMiddleware = express.json()
const testMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    req.test = 'test';

    next();

}

const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === 'secret') {
        next();
    } else {
        res.sendStatus(401);
    }
}

let responseCounter = 0;

const responseCounterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    responseCounter++;
    next();
}

app.use(jsonBodyMiddleware);
app.use(testMiddleware);
app.use(authGuardMiddleware);
app.use(responseCounterMiddleware);

app.use('/currencies', getCurrenciesRoutes());
app.get('/', (req: Request, res) => {
    const msg = 'total response count: ' + responseCounter;
    res.status(200).send(msg);
})


export default app;