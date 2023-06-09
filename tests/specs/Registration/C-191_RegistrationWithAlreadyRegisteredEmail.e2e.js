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
test('C-191 Registration with already registered email', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await loginPage.registration(fixtures.registeredEmail, fixtures.validPassword);
    await expect(loginPage.registrationProfileIsAlreadyRegisteredError).toBeVisible();
    await loginPage.registrationLoginButton.click();
    await loginPage.login(fixtures.adminEmail, fixtures.adminPassword);
    await homePage.adminGearButton.click();
    await homePage.adminUsersLink.click();
    await homePage.adminUsersSearchField.fill(fixtures.registeredEmail);
    await page.keyboard.press('Enter');
    await expect(homePage.adminUsersList).toHaveCount(1);
    await expect(homePage.adminUsersEmail).toHaveText(fixtures.registeredEmail);
});