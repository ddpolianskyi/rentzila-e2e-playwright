const { test } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');

test.describe('Authorization', () => {
    test('Authorization with empty fields', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.loginWithEmptyFields();
    })
    test('Authorization with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.loginWithInvalidCredentials();
    })
    test('Authorization with invalid phone number', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.loginWithInvalidPhoneNumber();
    })
    test('Reset the password with invalid email', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.passwordResetWithInvalidEmail();
    })
})