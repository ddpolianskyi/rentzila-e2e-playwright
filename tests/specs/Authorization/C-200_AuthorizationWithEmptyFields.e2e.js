const { test } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');

test('C-200 Authorization with empty fields', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto('/');
    await homePage.openLoginForm();
    await loginPage.login('', '');
    await loginPage.checkLoginEmailError('Поле не може бути порожнім');
    await loginPage.checkLoginPasswordError('Поле не може бути порожнім');

    await loginPage.login(fixtures.entryEmail, '');
    await loginPage.checkLoginPasswordError('Поле не може бути порожнім');

    await loginPage.login('', fixtures.entryPassword);
    await loginPage.checkLoginEmailError('Поле не може бути порожнім');
});