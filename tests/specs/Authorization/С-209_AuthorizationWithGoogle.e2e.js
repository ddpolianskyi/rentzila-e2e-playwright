const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');
const { GmailPage } = require('../../pageobjects/GmailPage');

test.skip('С-209 Authorization with google', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const gmailPage = new GmailPage(page);

    await homePage.goto('/');
    await homePage.openLoginForm();
    await loginPage.openGoogleForm();
    await gmailPage.loginGoogle(fixtures.emailWithAccess, fixtures.passwordWithAccess);
    await expect(homePage.avatarIcon).toBeVisible();

    // blocked because the testing gmail is blocked
});