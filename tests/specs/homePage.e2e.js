const { test } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');

test.describe('Authorization', () => {
    test('C-200 Authorization with empty fields', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.loginWithEmptyFields();
    })
    test('C-203 Authorization with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.loginWithInvalidCredentials();
    })
    test('C-207 Authorization with invalid phone number', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.loginWithInvalidPhoneNumber();
    })
    test('C-199 Reset the password with invalid email', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.passwordResetWithInvalidEmail();
    })
})