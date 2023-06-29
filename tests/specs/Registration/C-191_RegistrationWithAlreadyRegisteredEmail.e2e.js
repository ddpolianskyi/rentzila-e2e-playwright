const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');

test('C-191 Registration with already registered email', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto('/');
    await homePage.openLoginForm();
    await loginPage.loginRegistrationButton.click();
    await loginPage.registration(fixtures.registeredEmail, fixtures.validPassword);
    await expect(loginPage.registrationProfileIsAlreadyRegisteredError).toBeVisible();
    await loginPage.registrationLoginButton.click();
    await loginPage.login(fixtures.adminEmail, fixtures.adminPassword);
    await homePage.adminGearButton.click();
    await homePage.adminUsersLink.click();
    await homePage.adminUsersSearchField.fill(fixtures.registeredEmail);
    await page.keyboard.press('Enter');
    await expect(homePage.adminUsersList).toHaveCount(1);
});