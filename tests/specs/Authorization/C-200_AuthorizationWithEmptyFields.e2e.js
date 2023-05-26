const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { LoginPage } = require('../../pageobjects/LoginPage');

const redColor = '1px solid rgb(219, 49, 70)';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.loginButton.click();
});
test('C-200 Authorization with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginSubmitButton.click();
    await expect(loginPage.loginPopup).toBeVisible();
    await expect(loginPage.loginEmailInput).toHaveCSS('border', redColor);
    await expect(loginPage.loginPasswordInput).toHaveCSS('border', redColor);
    await expect(loginPage.loginEmailFieldCannotBeEmptyError).toBeVisible();
    await expect(loginPage.loginPasswordFieldCannotBeEmptyError).toBeVisible();
    
    await loginPage.enterLoginEmail(fixtures.email);
    await expect(loginPage.loginEmailInput).not.toHaveCSS('border', redColor);
    await expect(loginPage.loginPasswordInput).toHaveCSS('border', redColor);
    await expect(loginPage.loginEmailFieldCannotBeEmptyError).not.toBeVisible();
    await expect(loginPage.loginPasswordFieldCannotBeEmptyError).toBeVisible();
    await loginPage.loginSubmitButton.click();
    await expect(loginPage.loginPopup).toBeVisible();
    await loginPage.enterLoginEmail('');
    await expect(loginPage.loginEmailInput).toHaveCSS('border', redColor);
    await expect(loginPage.loginEmailFieldCannotBeEmptyError).toBeVisible();
    await expect(loginPage.loginPasswordFieldCannotBeEmptyError).toBeVisible();

    await loginPage.enterLoginPassword(fixtures.password);
    await expect(loginPage.loginEmailInput).toHaveCSS('border', redColor);
    await expect(loginPage.loginPasswordInput).not.toHaveCSS('border', redColor);
    await expect(loginPage.loginEmailFieldCannotBeEmptyError).toBeVisible();
    await expect(loginPage.loginPasswordFieldCannotBeEmptyError).not.toBeVisible();
    await loginPage.loginSubmitButton.click();
    await expect(loginPage.loginPopup).toBeVisible();
});