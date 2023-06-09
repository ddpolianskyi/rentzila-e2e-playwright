const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');
const { GmailPage } = require('../../pageobjects/GmailPage');

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.open();
    await homePage.loginButton.click();
    await expect(loginPage.loginPopup).toBeVisible();
    await loginPage.loginRegistrationButton.click();
});
test('C-195 Registration with valid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const gmailPage = new GmailPage(page);
    await loginPage.registration(fixtures.emailWithAccess, fixtures.passwordWithAccess);
    await expect(loginPage.registrationSuccessMessage).toBeVisible();
    await page.goto('https://mail.google.com');
    await loginPage.loginGoogle(fixtures.emailWithAccess, fixtures.passwordWithAccess);
    await gmailPage.createProfileLetter.click();
    await gmailPage.expandLetterButton.click();
    await gmailPage.activateAccountButton.scrollIntoViewIfNeeded();
    page.goto(await gmailPage.activateAccountButton.getAttribute('href'));
    await homePage.avatarIcon.click();
    await expect(homePage.profileDropdownEmail).toHaveText(fixtures.emailWithAccess);
    await homePage.profileDropdownLogoutButton.click();
    await homePage.loginButton.click();
    await loginPage.login(fixtures.adminEmail, fixtures.adminPassword);
    await homePage.adminGearButton.click();
    await homePage.adminUsersLink.click();
    await homePage.adminUsersSearchField.fill(fixtures.emailWithAccess);
    await page.keyboard.press('Enter');
    await expect(homePage.adminUsersList).toHaveCount(1);
    await homePage.adminUsersDeleteButton.click();
    await homePage.adminConfirmButton.click();
    await expect(homePage.adminUsersList).toHaveCount(0);
});