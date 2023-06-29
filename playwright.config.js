const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
	testDir: './tests/specs',
	testMatch: '*.js',
	fullyParallel: true,
	timeout: 60000,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : 1,
	reporter: 'line',
	use: {
		trace: 'on-first-retry',
		headless: true,
		baseURL: 'https://letkabackend.click',
		video: 'retain-on-failure',
	},
	projects: [
		{
			name: 'chrome',
			use: {
				...devices['Desktop Chrome'], channel: 'chrome',
				launchOptions: {
					args: [
						'--disable-component-extensions-with-background-pages',
						'--disable-gpu',
						'--no-sandbox',
					]
				}
			},
		},
		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
				launchOptions: {
					args: [
						'--disable-component-extensions-with-background-pages',
						'--disable-gpu',
						'--no-sandbox',
					]
				}
			},
		},
		{
			name: 'safari',
			use: {
				...devices['Desktop Safari'],
			}
		}
	],
});