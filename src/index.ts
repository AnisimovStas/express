import * as dotenv from 'dotenv'

import app from "./app";

dotenv.config({path: '.env'})


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Example of ${process.env.STAS} app listening on port ${port}`)
})