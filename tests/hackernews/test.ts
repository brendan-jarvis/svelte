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

	test('should display a story type', async ({ page }) => {
		const storyType = await page.$eval('.story-type', (el) => el.textContent);
		expect(storyType).toBeTruthy();
	});

	test('should display a story info', async ({ page }) => {
		const storyScore = await page.$eval('.post-info', (el) => el.textContent);
		expect(storyScore).toContain('points');
	});

	test('should display a story comments', async ({ page }) => {
		const storyComments = await page.$eval('.post-info', (el) => el.textContent);
		expect(storyComments).toContain('comments');
	});

	test('should display a story author', async ({ page }) => {
		const storyAuthor = await page.$eval('.post-info', (el) => el.textContent);
		expect(storyAuthor).toContain('by');
	});

	test('should display a story time', async ({ page }) => {
		const storyTime = await page.$eval('.post-info', (el) => el.textContent);
		expect(storyTime).toContain('ago');
	});
});
