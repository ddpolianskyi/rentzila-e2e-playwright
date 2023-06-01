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
			use: {
				...devices['Desktop Chrome'],
				ignoreHTTPSErrors: true,
				launchOptions: {
					args: [
						'--disable-component-extensions-with-background-pages',
						'--disable-gpu',
						'--disable-dev-shm-usage',
						'--disable-setuid-sandbox',
						'--no-first-run',
						'--no-sandbox',
						'--no-zygote',
						'--ignore-certificate-errors',
						'--disable-extensions',
						'--disable-infobars',
						'--disable-blink-features=AutomationControlled',
						'--disable-notifications',
						'--disable-popup-blocking'
					]
				}
			},
		},
		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
				ignoreHTTPSErrors: true,
				launchOptions: {
					args: [
						'--disable-component-extensions-with-background-pages',
						'--disable-gpu',
						'--disable-dev-shm-usage',
						'--disable-setuid-sandbox',
						'--no-first-run',
						'--no-sandbox',
						'--no-zygote',
						'--ignore-certificate-errors',
						'--disable-extensions',
						'--disable-infobars',
						'--disable-blink-features=AutomationControlled',
						'--disable-notifications',
						'--disable-popup-blocking'
					]
				}
			},
		},
		{
			name: 'msedge',
			use: {
				...devices['Desktop Edge'], channel: 'msedge',
				ignoreHTTPSErrors: true,
				launchOptions: {
					args: [
						'--disable-component-extensions-with-background-pages',
						'--disable-gpu',
						'--disable-dev-shm-usage',
						'--disable-setuid-sandbox',
						'--no-first-run',
						'--no-sandbox',
						'--no-zygote',
						'--ignore-certificate-errors',
						'--disable-extensions',
						'--disable-infobars',
						'--disable-blink-features=AutomationControlled',
						'--disable-notifications',
						'--disable-popup-blocking'
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
	]
});