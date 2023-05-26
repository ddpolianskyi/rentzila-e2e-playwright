const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');

const invalidEmails = [
    fixtures.emailWithSpace,
    fixtures.emailInCyrillic,
    fixtures.emailWithoutAtSign,
    fixtures.emailWithoutDot,
    fixtures.emailWithoutDotCom,
    fixtures.emailWithoutGmail,
    fixtures.emailWithoutAtSignGmailDotCom,
    fixtures.emailWithTwoAtSigns
];
const invalidPasswords = [
    fixtures.passwordWithSpaceAtTheEnd,
    fixtures.passwordWithSpaceAtTheBeginning,
    fixtures.passwordWithoutUppercaseLetter,
    fixtures.passwordWithoutLowercaseLetter,
    fixtures.passwordInCyrillic,
];

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.loginButton.click();
});
test('C-203 Authorization with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.enterLoginPassword(fixtures.password);
    for(let i = 0; i < invalidEmails.length; i++){
        await loginPage.enterLoginEmail(invalidEmails[i]);
        await loginPage.loginSubmitButton.click();
        await expect(loginPage.loginPopup).toBeVisible();
        await expect(loginPage.loginWrongFormatOfEmailOrPhoneNumberError).toBeVisible();
    };
    await loginPage.enterLoginEmail(fixtures.nonExistingEmail);
    await loginPage.enterLoginPassword(fixtures.password);
    await loginPage.loginSubmitButton.click();
    await expect(loginPage.loginPopup).toBeVisible();
    await expect(loginPage.loginWrongEmailOrPasswordError).toBeVisible();
    await loginPage.enterLoginEmail(fixtures.email);
    for(let i = 0; i < invalidPasswords.length; i++){
        await loginPage.enterLoginPassword(invalidPasswords[i]);
        await loginPage.loginSubmitButton.click();
        await expect(loginPage.loginPopup).toBeVisible();
        await expect(loginPage.loginPasswordError).toBeVisible();
    };
});