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

test('C-203 Authorization with invalid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto('/');
    await homePage.openLoginForm();
    for(let i = 0; i < invalidEmails.length; i++){
        await loginPage.login(invalidEmails[i], fixtures.entryPassword);
        await expect(loginPage.loginForm).toBeVisible();
        await expect(loginPage.loginWrongFormatOfEmailOrPhoneNumberError).toBeVisible();
    };
    await loginPage.login(fixtures.nonExistingEmail, fixtures.entryPassword);
    await expect(loginPage.loginForm).toBeVisible();
    await expect(loginPage.loginWrongEmailOrPasswordError).toBeVisible();
    for(let i = 0; i < invalidPasswords.length; i++){
        await loginPage.login(fixtures.entryEmail, invalidPasswords[i]);
        await expect(loginPage.loginForm).toBeVisible();
        await expect(loginPage.loginPasswordErrorMessage).toBeVisible();
    };
});