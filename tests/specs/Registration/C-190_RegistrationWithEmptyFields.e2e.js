const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');

test('C-190 Registration with empty fields', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto('/');
    await homePage.openLoginForm();
    await loginPage.loginRegistrationButton.click();
    await loginPage.registrationSubmitButton.click();
    await loginPage.checkRegistrationEmailError('Поле не може бути порожнім');
    await loginPage.checkRegistrationPasswordError('Поле не може бути порожнім');

    await loginPage.inputRegistrationEmail(fixtures.notRegisteredEmail);
    await loginPage.registrationSubmitButton.click();
    await loginPage.checkRegistrationPasswordError('Поле не може бути порожнім');

    await loginPage.inputRegistrationEmail('');
    await loginPage.inputRegistrationPassword(fixtures.validPassword);
    await loginPage.registrationSubmitButton.click();
    await loginPage.checkRegistrationEmailError('Поле не може бути порожнім');

    await loginPage.registrationLoginButton.click();
    await loginPage.login(fixtures.adminEmail, fixtures.adminPassword);
    await homePage.adminGearButton.click();
    await homePage.adminUsersLink.click();
    await homePage.adminUsersSearchField.fill(fixtures.notRegisteredEmail);
    await page.keyboard.press('Enter');
    await expect(homePage.adminUsersList).toHaveCount(0);
});