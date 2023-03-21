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

test.describe('Hackernews story component', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/hackernews');
	});

	test('should display a post title', async ({ page }) => {
		const storyTitle = await page.$eval('.post-title', (el) => el.textContent);
		expect(storyTitle).toBeTruthy();
	});

	test('should display a story url', async ({ page }) => {
		const storyUrl = await page.$eval('.story-url a', (el) => el.textContent);
		expect(storyUrl).toBeTruthy();
	});
});
