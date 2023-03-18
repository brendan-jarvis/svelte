import { expect, test, type Response } from '@playwright/test';

let response: Response | null;

test.describe('Blog API', () => {
	test.beforeEach(async ({ page }) => {
		response = await page.goto('/api/blog/1');
	});

	test('status code is 200', async () => {
		if (response) {
			expect(response.status()).toBe(200);
		} else {
			test.fail();
		}
	});

	test('returns a JSON object', async () => {
		if (response) {
			expect(await response.json()).toBeInstanceOf(Object);
		} else {
			test.fail();
		}
	});
});
