const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.loginButton.click();
});
test('С-209 Authorization with google', async ({ page, browserName }) => {
    if(browserName === 'chromium'){
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        await loginPage.loginLoginWithGoogleButton.click();
        await expect(loginPage.googleForm).toBeVisible();
        await loginPage.enterGoogleEmail(fixtures.emailWithAccess);
        await loginPage.googleEmailNextButton.click();
        await loginPage.enterGooglePassword(fixtures.passwordWithAccess);
        await loginPage.googlePasswordNextButton.click();
        await expect(homePage.avatarIcon).toBeVisible();
    } else {};
});