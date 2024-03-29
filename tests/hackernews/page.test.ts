import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Hackernews page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/hackernews');
	});

	test.skip('should not have any automatically detectable accessibility issues', async ({
		page
	}) => {
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test('should have the correct title', async ({ page }) => {
		expect(await page.title()).toBe('Hackernews Viewer - by Brendan Jarvis');
	});

	test('should have a h1 heading', async ({ page }) => {
		const heading = await page.$eval('h1', (el) => el.textContent);
		expect(heading).toBe('Hackernews');
	});

	test('should have two labels', async ({ page }) => {
		const labels = await page.$$('label');
		expect(labels.length).toBe(2);
	});

	test('sort by should have three buttons: "Points", "Comments", and "Date posted"', async ({
		page
	}) => {
		const label = await page.$('label:has-text("sort by: ")');
		const buttons = await label?.$$('button');
		expect(buttons?.length).toBe(3);
		expect(await buttons?.[0].textContent()).toBe('Points');
		expect(await buttons?.[1].textContent()).toBe('Comments');
		expect(await buttons?.[2].textContent()).toBe('Date posted');
	});

	test('view by should have three options: "Top Stories", "Best Stories", and "New Stories"', async ({
		page
	}) => {
		const label = await page.$('label:has-text("view by: ")');
		const options = await label?.$$('option');
		expect(options?.length).toBe(3);
		expect(await options?.[0].textContent()).toBe('Top Stories');
		expect(await options?.[1].textContent()).toBe('Best Stories');
		expect(await options?.[2].textContent()).toBe('New Stories');
	});
});
