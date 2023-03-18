import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Hackernews page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/hackernews');
	});

	test.skip('should not have any automatically detectable accessibility issues', async ({
		page
	}) => {
		const accessibilityScanResults = await new AxeBuilder.default({ page }).analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test('should have the correct title', async ({ page }) => {
		expect(await page.title()).toBe('Hackernews Viewer - by Brendan Jarvis');
	});
});
