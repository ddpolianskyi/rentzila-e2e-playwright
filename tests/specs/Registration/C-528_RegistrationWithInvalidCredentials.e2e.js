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
const invalidPhoneNumbers = [
    fixtures.phoneNumberWithoutCountryCode,
    fixtures.phoneNumberWithoutLastNumber,
    fixtures.phoneNumberWithMinuses,
    fixtures.phoneNumberWithSpaces,
    fixtures.phoneNumberWithRoundBrackets,
    fixtures.phoneNumberWithoutCountryCodeAndWithRoundBrackets,
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
    const loginPage = new LoginPage(page);
    await homePage.open();
    await homePage.loginButton.click();
    await expect(loginPage.loginPopup).toBeVisible();
    await loginPage.loginRegistrationButton.click();
});
test('C-528 Registration with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.enterRegistrationPassword(fixtures.entryPassword);
    for(let i = 0; i < invalidEmails.length; i++){
        await loginPage.enterRegistrationEmail(invalidEmails[i]);
        await loginPage.registrationSubmitButton.click();
        await expect(loginPage.loginPopup).toBeVisible();
        await expect(loginPage.registrationWrongFormatOfEmailOrPasswordError).toBeVisible();
    };
    for(let i = 0; i < invalidPhoneNumbers.length; i++){
        await loginPage.enterRegistrationEmail(invalidPhoneNumbers[i]);
        await loginPage.registrationSubmitButton.click();
        await expect(loginPage.loginPopup).toBeVisible();
        await expect(loginPage.registrationWrongFormatOfEmailOrPasswordError).toBeVisible();
    };
    await loginPage.enterRegistrationEmail(fixtures.entryEmail);
    for(let i = 0; i < invalidPasswords.length; i++){
        await loginPage.enterRegistrationPassword(invalidPasswords[i]);
        await loginPage.registrationSubmitButton.click();
        await expect(loginPage.loginPopup).toBeVisible();
        await expect(loginPage.registrationPasswordError).toBeVisible();
    };
});