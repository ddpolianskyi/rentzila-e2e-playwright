const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { LoginPage } = require('../../pageobjects/LoginPage');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.loginButton.click();
});
test('C-201 Authorization with valid email and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.enterLoginEmail(fixtures.email);
    await loginPage.enterLoginPassword(fixtures.password);
    await loginPage.loginShowPasswordIcon.click();
    await expect(loginPage.loginPasswordInput).toHaveAttribute('type', 'text');
    await loginPage.loginHidePasswordIcon.click();
    await expect(loginPage.loginPasswordInput).toHaveAttribute('type', 'password');
    await loginPage.loginSubmitButton.click();
    await expect(loginPage.avatarIcon).toBeVisible();
    await expect(loginPage.loginPopup).not.toBeVisible();
    await loginPage.avatarIcon.click();
    await expect(loginPage.profileDropdown).toBeVisible();
    await expect(loginPage.profileDropdownEmail).toHaveText(fixtures.email);
    await loginPage.profileDropdownLogoutButton.click();
});