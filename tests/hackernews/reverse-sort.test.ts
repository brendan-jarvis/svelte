import { expect, test } from '@playwright/test';

test.describe('Hackernews page reverse sorting', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/hackernews');
	});

	test('by points button sorts posts in ascending order', async ({ page }) => {
		await page.click('button:has-text("Points")');
		await page.click('button:has-text("Points▼")');
		await page.click('button:has-text("Points▲")');

		const posts = await page.$$('.post');

		const scores = [];
		for (const post of posts) {
			const scoreText = await post.innerText();
			const score = parseInt(scoreText.split('•')[1].trim());
			scores.push(score);
		}

		expect(scores).toEqual(scores.sort((a, b) => a - b));
	});

	test('by comments button sorts posts in ascending order', async ({ page }) => {
		await page.click('button:has-text("Comments")');
		await page.click('button:has-text("Comments▼")');
		await page.click('button:has-text("Comments▲")');

		const posts = await page.$$('.post');

		const commentCounts = [];
		for (const post of posts) {
			const commentText = await post.innerText();
			const commentCount = parseInt(commentText.split('•')[2].trim().split(' ')[0]);
			commentCounts.push(commentCount);
		}

		expect(commentCounts).toEqual(commentCounts.sort((a, b) => a - b));
	});

	test('by date posted button sorts posts in ascending order', async ({ page }) => {
		await page.click('button:has-text("Date posted")');
		await page.click('button:has-text("Date posted▼")');
		await page.click('button:has-text("Date posted▲")');

		const posts = await page.$$('.post');

		const dates = [];
		for (const post of posts) {
			const dateText = await post.innerText();
			const date = new Date(dateText.split('•')[3].trim());
			dates.push(date);
		}

		expect(dates).toEqual(dates.sort((a, b) => a.getTime() - b.getTime()));
	});
});
