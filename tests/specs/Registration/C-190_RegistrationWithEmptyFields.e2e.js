const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.open();
    await homePage.loginButton.click();
    await expect(loginPage.loginPopup).toBeVisible();
    await loginPage.loginRegistrationButton.click();
});
test('C-190 Registration with empty fields', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await loginPage.registrationSubmitButton.click();
    await expect(loginPage.registrationEmailFieldCannotBeEmptyError).toBeVisible();
    await expect(loginPage.registrationPasswordFieldCannotBeEmptyError).toBeVisible();
    await loginPage.enterRegistrationEmail(fixtures.notRegisteredEmail);
    await loginPage.registrationSubmitButton.click();
    await expect(loginPage.registrationEmailFieldCannotBeEmptyError).not.toBeVisible();
    await expect(loginPage.registrationPasswordFieldCannotBeEmptyError).toBeVisible();
    await loginPage.enterRegistrationEmail('');
    await loginPage.enterRegistrationPassword(fixtures.validPassword);
    await loginPage.registrationSubmitButton.click();
    await expect(loginPage.registrationEmailFieldCannotBeEmptyError).toBeVisible();
    await expect(loginPage.registrationPasswordFieldCannotBeEmptyError).not.toBeVisible();
    await loginPage.registrationLoginButton.click();
    await loginPage.login(fixtures.adminEmail, fixtures.adminPassword);
    await homePage.adminGearButton.click();
    await homePage.adminUsersLink.click();
    await homePage.adminUsersSearchField.fill(fixtures.notRegisteredEmail);
    await page.keyboard.press('Enter');
    await expect(homePage.adminUsersList).toHaveCount(0);
});