const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
	testDir: './tests/specs',
	testMatch: '*.js',
	fullyParallel: false,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 5 : 5,
	reporter: 'line',
	use: {
		trace: 'on-first-retry',
		headless: true,
		baseURL: 'https://letkabackend.click',
	},
	projects: [
		{
			name: 'chrome',
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
			name: 'safari',
			use: { ...devices['Desktop Safari'] },
		}
	]
});