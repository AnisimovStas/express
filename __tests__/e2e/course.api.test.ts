import {describe} from "node:test";
import request from "supertest";
import app from "../../src";

describe('/currencies', () => {
    beforeEach(async () => {
        await request(app).delete('/currencies/drop');
    })

    it('should return 200 with empty array', async () => {
        await request(app).get('/currencies').expect(200, []);
    })

    it('should return 404 for not existing currency', async () => {
        await request(app).get('/currencies/321').expect(404);
    })

    it('should create currency with correct input data', async () => {
        const createResponse = await request(app)
            .post('/currencies')
            .send({name: 'chy', value: 100})
            .expect(200);

        const createdCurrency = createResponse.body;

        expect(createdCurrency).toEqual({
            id: expect.any(Number),
            name: 'chy',
            value: 100,
        })
 
        await request(app).get('/currencies').expect(200, [createdCurrency]);
    })

    it('shouldnt create currency with incorrect input data', async () => {

        const usdInArray = {
            id: 1,
            name: 'usd',
            value: 100
        }

        await request(app)
            .post('/currencies')
            .send({name: 'usd', value: 100})
            .expect(200, usdInArray)

        await request(app)
            .post('/currencies')
            .send({name: 'usd', value: 100})
            .expect(401);

        await request(app).get('/currencies').expect(200, [usdInArray]);

    })
})