const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
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

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.loginButton.click();
});
test('C-199 Reset the password with invalid email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginForgotPasswordButton.click();
    await expect(loginPage.restorePasswordPopup).toBeVisible();
    await loginPage.restorePasswordSubmitButton.click();
    await expect(loginPage.restorePasswordFieldCannotBeEmptyError).toBeVisible();
    await loginPage.enterRestorePasswordEmail(fixtures.email);
    await loginPage.restorePasswordCloseButton.click();
    await loginPage.loginForgotPasswordButton.click();
    for(let i = 0; i < invalidEmails.length; i++){
        await loginPage.enterRestorePasswordEmail(invalidEmails[i]);
        await loginPage.restorePasswordSubmitButton.click();
        await expect(loginPage.restorePasswordPopup).toBeVisible();
        await expect(loginPage.restorePasswordWrongEmailOrPhoneNumberError).toBeVisible();
    };
    await loginPage.enterRestorePasswordEmail(fixtures.nonExistingEmail);
    await loginPage.restorePasswordSubmitButton.click();
    await expect(loginPage.restorePasswordPopup).toBeVisible();
    await expect(loginPage.restorePasswordUserIsNotVerifiedError).toBeVisible();
});