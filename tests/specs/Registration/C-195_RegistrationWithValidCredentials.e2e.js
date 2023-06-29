const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');
const { GmailPage } = require('../../pageobjects/GmailPage');

test.skip('C-195 Registration with valid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const gmailPage = new GmailPage(page);

    await homePage.goto('/');
    await homePage.openLoginForm();
    await loginPage.login(fixtures.adminEmail, fixtures.adminPassword);
    await homePage.adminGearButton.click();
    await homePage.adminUsersLink.click();
    await homePage.adminUsersSearchField.fill(fixtures.emailWithAccess);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);
    if(await homePage.adminUsersList.count() === 1){
        await homePage.adminUsersDeleteButton.click();
        await homePage.adminConfirmButton.click();
    };
    await homePage.adminLogoutButton.click();

    await page.waitForTimeout(5000);
    await loginPage.loginRegistrationButton.click();
    await loginPage.registration(fixtures.emailWithAccess, fixtures.passwordWithAccess);
    await expect(loginPage.registrationSuccessMessage).toBeVisible();
    await gmailPage.openGmailInboxWithLogin(fixtures.emailWithAccess, fixtures.passwordWithAccess);
    await gmailPage.createProfileLetter.click();
    await gmailPage.clickExpandLetterButton();
    await gmailPage.clickCreateAccountLetterLink();
    await homePage.checkProfileDropdownEmail(fixtures.emailWithAccess);
    await homePage.logout();

    await homePage.loginButton.click();
    await loginPage.login(fixtures.adminEmail, fixtures.adminPassword);
    await homePage.adminGearButton.click();
    await homePage.adminUsersLink.click();
    await homePage.adminUsersSearchField.fill(fixtures.emailWithAccess);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);
    await expect(homePage.adminUsersList).toHaveCount(1);
    await homePage.adminUsersDeleteButton.click();
    await homePage.adminConfirmButton.click();
    await expect(homePage.adminUsersList).toHaveCount(0);
    await homePage.adminLogoutButton.click();

    await loginPage.loginRegistrationButton.click();
    await loginPage.registration(fixtures.emailWithAccess, fixtures.passwordWithAccess);
    await expect(loginPage.registrationSuccessMessage).toBeVisible();
    await gmailPage.openGmailInbox();
    await gmailPage.createProfileLetter.click();
    await gmailPage.clickExpandLetterButton();
    await gmailPage.clickCreateAccountLetterLink();

    // blocked because the testing gmail is blocked
});