import { expect, test } from '@playwright/test';

test.describe('Hackernews page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/hackernews');
	});

	test('should have the correct title', async ({ page }) => {
		expect(await page.title()).toBe('Hackernews Viewer - by Brendan Jarvis');
	});
});
