import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../helpers/ApiHelper';

/**
 * Users API Tests  @smoke @regression
 *
 * Target: https://reqres.in (free public REST API — no account needed)
 * Covers: GET list, GET single, POST create, PUT update, DELETE
 */

test.describe('Reqres Users API', () => {
  let api: ApiHelper;

  test.beforeEach(async ({ request }) => {
    api = new ApiHelper(request);
  });

  // ── GET ────────────────────────────────────────────────────────────────────

  test('GET /api/users returns paginated user list @smoke', async () => {
    const res = await api.get('/api/users?page=1');
    await api.assertStatus(res, 200);

    const body = await api.getJson<{
      page: number;
      data: { id: number; email: string; first_name: string }[];
    }>(res);

    expect(body.page).toBe(1);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toHaveProperty('email');
    expect(body.data[0]).toHaveProperty('first_name');
  });

  test('GET /api/users/:id returns single user @smoke', async () => {
    const res = await api.get('/api/users/2');
    await api.assertStatus(res, 200);

    const body = await api.getJson<{ data: { id: number; email: string } }>(res);
    expect(body.data.id).toBe(2);
    expect(body.data.email).toBeTruthy();
  });

  test('GET /api/users/999 returns 404 for unknown user @regression', async () => {
    const res = await api.get('/api/users/999');
    await api.assertStatus(res, 404);
  });

  // ── POST ───────────────────────────────────────────────────────────────────

  test('POST /api/users creates a new user @smoke', async () => {
    const payload = { name: 'Jane Doe', job: 'QA Engineer' };
    const res = await api.post('/api/users', payload);
    await api.assertStatus(res, 201);

    const body = await api.getJson<{ id: string; createdAt: string }>(res);
    expect(body.id).toBeTruthy();
    expect(body.createdAt).toBeTruthy();
  });

  // ── PUT ────────────────────────────────────────────────────────────────────

  test('PUT /api/users/:id updates a user @regression', async () => {
    const payload = { name: 'Jane Updated', job: 'Senior QA' };
    const res = await api.put('/api/users/2', payload);
    await api.assertStatus(res, 200);

    const body = await api.getJson<{ name: string; updatedAt: string }>(res);
    expect(body.name).toBe('Jane Updated');
    expect(body.updatedAt).toBeTruthy();
  });

  // ── DELETE ─────────────────────────────────────────────────────────────────

  test('DELETE /api/users/:id returns 204 @regression', async () => {
    const res = await api.delete('/api/users/2');
    await api.assertStatus(res, 204);
  });
});
