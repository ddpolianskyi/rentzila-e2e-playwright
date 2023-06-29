const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');

const invalidPhoneNumbers = [
    fixtures.phoneNumberWithoutCountryCode,
    fixtures.phoneNumberWithoutLastNumber,
    fixtures.phoneNumberWithMinuses,
    fixtures.phoneNumberWithSpaces,
    fixtures.phoneNumberWithRoundBrackets,
    fixtures.phoneNumberWithoutCountryCodeAndWithRoundBrackets,
];

test('C-207 Authorization with invalid phone number', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto('/');
    await homePage.openLoginForm();
    for(let i = 0; i < invalidPhoneNumbers.length; i++){
        await loginPage.login(invalidPhoneNumbers[i], fixtures.entryPassword);
        await expect(loginPage.loginForm).toBeVisible();
        await expect(loginPage.loginWrongFormatOfEmailOrPhoneNumberError).toBeVisible();
    };
    await loginPage.login(fixtures.nonExistingPhoneNumber, fixtures.entryPassword);
    await expect(loginPage.loginForm).toBeVisible();
    await expect(loginPage.loginWrongPhoneNumberOrPasswordError).toBeVisible();
});