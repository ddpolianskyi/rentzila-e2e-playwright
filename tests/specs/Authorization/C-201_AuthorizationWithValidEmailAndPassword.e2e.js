const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');

const validEmails = [
    fixtures.validEmail
];

test('C-201 Authorization with valid email and password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto('/');
    await homePage.openLoginForm();
    await loginPage.inputLoginPassword(fixtures.entryEmail);
    await loginPage.loginShowPasswordIcon.click();
    await expect(loginPage.loginPasswordInput).toHaveAttribute('type', 'text');
    await loginPage.loginHidePasswordIcon.click();
    await expect(loginPage.loginPasswordInput).toHaveAttribute('type', 'password');
    await loginPage.login(fixtures.entryEmail, fixtures.entryPassword);
    await expect(loginPage.loginForm).not.toBeVisible();
    await expect(homePage.avatarIcon).toBeVisible();
    await homePage.checkProfileDropdownEmail(fixtures.entryEmail);
    await homePage.logout();
    for(let i = 0; i < validEmails.length; i++){
        await homePage.openLoginForm();
        await loginPage.login(validEmails[i], fixtures.entryPassword);
        await expect(homePage.avatarIcon).toBeVisible();
        await expect(loginPage.loginForm).not.toBeVisible();
        await homePage.checkProfileDropdownEmail(validEmails[i].toLowerCase());
        await homePage.logout();
    };
});