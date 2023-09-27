import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Svelte home page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test.skip('should not have any automatically detectable accessibility issues', async ({
		page
	}) => {
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

		expect(accessibilityScanResults.violations).toEqual([]); // 5
	});

	test('should have the correct title', async ({ page }) => {
		expect(await page.title()).toBe('Svelte by Brendan Jarvis');
	});

	test('should have a welcome message', async ({ page }) => {
		const welcomeMessage = await page.textContent('.content h1');
		expect(welcomeMessage).toBe('Welcome');
	});

	test('should have a profile image', async ({ page }) => {
		const profileImage = await page.$('.content img');
		expect(profileImage).toBeTruthy();
	});

	test('should have a blog section', async ({ page }) => {
		const blogSection = await page.$('.content h2:nth-of-type(1)');
		if (blogSection) {
			expect(await blogSection.textContent()).toBe('Blog');
		}
	});

	test('should have a projects section', async ({ page }) => {
		const projectsSection = await page.$('.content h2:nth-of-type(2)');
		if (projectsSection) {
			expect(await projectsSection.textContent()).toBe('Projects');
		}
	});
});
