import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './app.js';

const validBooking = {
    recipient: 'Thuli',
    dateType: 'Dinner',
    date: '2025-08-01',
    time: '19:00'
};

describe('GET /', () => {
    it('returns API live message', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.body.message).toBeDefined();
    });
});

describe('POST /api/v1/dates/addDate', () => {
    it('creates a booking with valid data', async () => {
        const res = await request(app).post('/api/v1/dates/addDate').send(validBooking);
        expect(res.status).toBe(201);
        expect(res.body.data).toMatchObject({ dateType: 'Dinner', date: '2025-08-01' });
    });

    it('returns 400 when required fields are missing', async () => {
        const res = await request(app).post('/api/v1/dates/addDate').send({ recipient: 'Thuli' });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });
});

describe('GET /api/v1/dates', () => {
    it('returns all bookings', async () => {
        const res = await request(app).get('/api/v1/dates');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.count).toBeDefined();
    });
});

