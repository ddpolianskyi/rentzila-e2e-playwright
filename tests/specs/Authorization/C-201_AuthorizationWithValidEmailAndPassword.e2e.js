const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');

const validEmails = [
    fixtures.validEmail
];

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.loginButton.click();
});
test('C-201 Authorization with valid email and password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await loginPage.enterLoginEmail(fixtures.entryEmail);
    await loginPage.enterLoginPassword(fixtures.entryPassword);
    await loginPage.loginShowPasswordIcon.click();
    await expect(loginPage.loginPasswordInput).toHaveAttribute('type', 'text');
    await loginPage.loginHidePasswordIcon.click();
    await expect(loginPage.loginPasswordInput).toHaveAttribute('type', 'password');
    await loginPage.loginSubmitButton.click();
    await expect(homePage.avatarIcon).toBeVisible();
    await expect(loginPage.loginPopup).not.toBeVisible();
    await homePage.avatarIcon.click();
    await expect(homePage.profileDropdown).toBeVisible();
    await expect(homePage.profileDropdownEmail).toHaveText(fixtures.entryEmail);
    await homePage.profileDropdownLogoutButton.click();
    for(let i = 0; i < validEmails.length; i++){
        await homePage.loginButton.click();
        await loginPage.enterLoginPassword(fixtures.entryPassword);
        await loginPage.enterLoginEmail(validEmails[i]);
        await loginPage.loginSubmitButton.click();
        await expect(homePage.avatarIcon).toBeVisible();
        await expect(loginPage.loginPopup).not.toBeVisible();
        await homePage.avatarIcon.click();
        await expect(homePage.profileDropdown).toBeVisible();
        await expect(homePage.profileDropdownEmail).toHaveText(validEmails[i].toLowerCase());
        await homePage.profileDropdownLogoutButton.click();
    };
});