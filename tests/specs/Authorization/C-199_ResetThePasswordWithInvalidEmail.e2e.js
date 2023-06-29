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

test('C-199 Reset the password with invalid email', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto('/');
    await homePage.openLoginForm();
    await loginPage.openForgotPasswordForm();
    await loginPage.inputEmailAndClickRestoreButton('');
    await expect(loginPage.restorePasswordFieldCannotBeEmptyError).toBeVisible();
    await loginPage.inputRestorePasswordEmail(fixtures.emailWithGmail);
    await loginPage.restorePasswordCloseButton.click();
    await loginPage.openForgotPasswordForm();
    for(let i = 0; i < invalidEmails.length; i++){
        await loginPage.inputEmailAndClickRestoreButton(invalidEmails[i]);
        await expect(loginPage.restorePasswordWrongEmailOrPhoneNumberError).toBeVisible();
        await expect(loginPage.restorePasswordPopup).toBeVisible();
    };
    await loginPage.inputEmailAndClickRestoreButton(fixtures.nonExistingEmail);
    await expect(loginPage.restorePasswordUserIsNotVerifiedError).toBeVisible();
    await expect(loginPage.restorePasswordPopup).toBeVisible();
});