const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.loginButton.click();
});
test('C-196 Authorization with a forgotten password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginForgotPasswordButton.click();
    await expect(loginPage.restorePasswordPopup).toBeVisible();
    await loginPage.enterRestorePasswordEmail(fixtures.email);
    await loginPage.restorePasswordSubmitButton.click();
    await expect(loginPage.restorePasswordSuccessMessage).toBeVisible();
    // Implement redirecting to email and clicking the received restore password letter.
});