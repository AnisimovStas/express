import express, {Request} from "express";
import {getCurrenciesRoutes} from "./routes/currencies";
 

const app = express()

export const jsonBodyMiddleware = express.json()


app.use(jsonBodyMiddleware);


app.use('/currencies', getCurrenciesRoutes());
app.get('/', (req: Request, res) => {
    res.sendStatus(200)
})


export default app;