const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
	testDir: './tests/specs',
	testMatch: '*.js',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'line',
	expect: {
		timeout: 15000
	},
	use: {
		trace: 'on-first-retry',
		headless: true,
		baseURL: 'https://letkabackend.click',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'msedge',
			use: { ...devices['Desktop Edge'], channel: 'msedge' }
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		}
	]
});