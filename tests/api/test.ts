import { expect, test } from '@playwright/test';

let response;

test.describe('Blog API', () => {
	test.beforeEach(async ({ page }) => {
		response = await page.goto('/api/blog/1');
	});

	test('status code is 200', async () => {
		expect(response.status()).toBe(200);
	});

	test('returns a JSON object', async () => {
		expect(await response.json()).toBeInstanceOf(Object);
	});
});
