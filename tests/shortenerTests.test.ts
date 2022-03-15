import mongoose from 'mongoose';
import request from 'supertest';

import { ShortenerModel } from '../src/models';

jest.setTimeout(300000);

const app: string = process.env.APP_URL || '';

describe('## Route POST /api/short test ##', () => {

    test('Creating link shorted', async () => {

        const payload = {
            url: 'https://google.com/'
        };

        const response: request.Response = await request(app).post('/api/short').send(payload);

        const parseUrlCode: string[] = response.body.link.split('/');
        
        await mongoose.connect(process.env.DB_URL || '');

        const findCode = await ShortenerModel.findOne({ code: parseUrlCode[3] });

        expect(response.status).toEqual(201);
        expect(response.body).toEqual({ status: 'success', message: 'Link generated!', link: `${process.env.APP_URL}/${findCode.code}` });

    });
});

describe('## Route POST /api/:code test ##', () => {

    test('Getting link shorted', async () => {
        const code: string = 'BMSAMR';

        const response: request.Response = await request(app).get(`/api/${code}`);

        await mongoose.connect(process.env.DB_URL || '');

        const findUrl = await ShortenerModel.findOne({ code });

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({ status: 'success', url: findUrl.url, visits: findUrl.visits });

    });
});