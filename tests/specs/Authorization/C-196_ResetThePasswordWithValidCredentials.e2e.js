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
    fixtures.passwordInCyrillic,
];

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.open();
    await homePage.loginButton.click();
    await expect(loginPage.loginPopup).toBeVisible();
});
test('C-196 Reset the password with valid credentials', async ({ page, browserName }) => {
    if(browserName === 'chromium'){
        const loginPage = new LoginPage(page);
        const gmailPage = new GmailPage(page);
        const restorePasswordPage = new RestorePasswordPage(page);
        await loginPage.clickForgotPasswordLink();
        await loginPage.resetPassword(fixtures.emailWithAccess);
        await expect(loginPage.restorePasswordSuccessMessage).toBeVisible();
        await page.goto('https://mail.google.com');
        await loginPage.loginGoogle(fixtures.emailWithAccess, fixtures.passwordWithAccess);
        await gmailPage.restorePasswordLetter.click();
        await gmailPage.expandLetterButton.click();
        page.goto(await gmailPage.restorePasswordButton.getAttribute('href'));
        for(let i = 0; i < invalidPasswords; i++){
            await restorePasswordPage.enterPassword(invalidPasswords[i]);
            await restorePasswordPage.submitButton.click();
            await expect(loginPage.restorePasswordPopup).toBeVisible();
        };
    } else {};
});