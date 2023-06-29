const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');
const { GmailPage } = require('../../pageobjects/GmailPage');
const { RestorePasswordPage } = require('../../pageobjects/RestorePasswordPage');

const invalidPasswords = [
    fixtures.passwordWithSpaceAtTheEnd,
    fixtures.passwordWithSpaceAtTheBeginning,
    fixtures.passwordWithoutUppercaseLetter,
    fixtures.passwordWithoutLowercaseLetter,
    fixtures.passwordInCyrillic
];

const 
    oldValidPassword = fixtures.passwordWithAccess,
    newValidPassword = fixtures.validPassword

test.skip('C-196 Reset the password with valid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const gmailPage = new GmailPage(page);
    const restorePasswordPage = new RestorePasswordPage(page);

    await homePage.goto('/');
    await homePage.openLoginForm();
    await loginPage.openForgotPasswordForm();
    await loginPage.inputEmailAndClickRestoreButton(fixtures.emailWithGmail);
    await expect(loginPage.restorePasswordSuccessMessage).toBeVisible();
    await gmailPage.openGmailInboxWithLogin(fixtures.emailWithGmail, fixtures.passwordWithGmail);
    await gmailPage.resetPasswordLetter.click();
    await gmailPage.clickRestorePasswordLetterLink();
    for(let i = 0; i < invalidPasswords.length; i++){
        await restorePasswordPage.resetPassword(invalidPasswords[i]);
        await expect(restorePasswordPage.errorMessage).toBeVisible();
        await expect(restorePasswordPage.restorePasswordForm).toBeVisible();
    };
    await restorePasswordPage.inputPasswordAndClickRestoreButton(newValidPassword);
    await loginPage.login(fixtures.emailWithGmail, oldValidPassword);
    await expect(loginPage.loginWrongEmailOrPasswordError).toBeVisible();
    await loginPage.login(fixtures.emailWithGmail, newValidPassword);
    await homePage.checkProfileDropdownEmail(fixtures.emailWithGmail);
    await homePage.logout();
    await homePage.openLoginForm();
    await loginPage.openForgotPasswordForm();
    await loginPage.inputEmailAndClickRestoreButton(fixtures.emailWithGmail);
    await expect(loginPage.restorePasswordSuccessMessage).toBeVisible();
    await gmailPage.openGmailInbox();
    await gmailPage.resetPasswordLetter.click();
    await gmailPage.clickRestorePasswordLetterLink();
    await restorePasswordPage.inputPasswordAndClickRestoreButton(fixtures.oldValidPassword);

    // blocked because the testing gmail is blocked
});