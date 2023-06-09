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

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.loginButton.click();
});
test('C-207 Authorization with invalid phone number', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.enterLoginPassword(fixtures.entryPassword);
    for(let i = 0; i < invalidPhoneNumbers.length; i++){
        await loginPage.enterLoginEmail(invalidPhoneNumbers[i]);
        await loginPage.loginSubmitButton.click();
        await expect(loginPage.loginPopup).toBeVisible();
        await expect(loginPage.loginWrongFormatOfEmailOrPhoneNumberError).toBeVisible();
    };
    await loginPage.enterLoginEmail(fixtures.nonExistingPhoneNumber);
    await loginPage.loginSubmitButton.click();
    await expect(loginPage.loginPopup).toBeVisible();
    await expect(loginPage.loginWrongPhoneNumberOrPasswordError).toBeVisible();
});