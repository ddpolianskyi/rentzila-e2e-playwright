const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.loginButton.click();
});
test('C-200 Authorization with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginSubmitButton.click();
    await expect(loginPage.loginPopup).toBeVisible();
    await loginPage.checkLoginEmailToHaveErrorBorder();
    await loginPage.checkLoginPasswordToHaveErrorBorder();
    await expect(loginPage.loginEmailFieldCannotBeEmptyError).toBeVisible();
    await expect(loginPage.loginPasswordFieldCannotBeEmptyError).toBeVisible();
    await loginPage.enterLoginEmail(fixtures.entryEmail);
    await loginPage.checkLoginEmailToNotHaveErrorBorder();
    await loginPage.checkLoginPasswordToHaveErrorBorder();
    await expect(loginPage.loginEmailFieldCannotBeEmptyError).not.toBeVisible();
    await expect(loginPage.loginPasswordFieldCannotBeEmptyError).toBeVisible();
    await loginPage.loginSubmitButton.click();
    await expect(loginPage.loginPopup).toBeVisible();
    await loginPage.enterLoginEmail('');
    await loginPage.checkLoginEmailToHaveErrorBorder();
    await expect(loginPage.loginEmailFieldCannotBeEmptyError).toBeVisible();
    await expect(loginPage.loginPasswordFieldCannotBeEmptyError).toBeVisible();
    await loginPage.enterLoginPassword(fixtures.entryPassword);
    await loginPage.checkLoginEmailToHaveErrorBorder();
    await loginPage.checkLoginPasswordToNotHaveErrorBorder();
    await expect(loginPage.loginEmailFieldCannotBeEmptyError).toBeVisible();
    await expect(loginPage.loginPasswordFieldCannotBeEmptyError).not.toBeVisible();
    await loginPage.loginSubmitButton.click();
    await expect(loginPage.loginPopup).toBeVisible();
});