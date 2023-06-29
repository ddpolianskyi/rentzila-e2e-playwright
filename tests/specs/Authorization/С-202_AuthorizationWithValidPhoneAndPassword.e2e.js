const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');
const { MyProfilePage } = require('../../pageobjects/MyProfilePage');

const validPhoneNumbers = [
    fixtures.validPhoneNumberOne,
    fixtures.validPhoneNumberTwo
];

test('С-202 Authorization with valid phone and password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const myProfilePage = new MyProfilePage(page);

    await homePage.goto('/');
    await homePage.openLoginForm();
    await loginPage.inputLoginEmail(fixtures.entryPhoneNumber);
    await loginPage.inputLoginPassword(fixtures.entryPassword);
    await loginPage.loginSubmitButton.click();
    await expect(homePage.avatarIcon).toBeVisible();
    await homePage.avatarIcon.click();
    await expect(homePage.profileDropdown).toBeVisible();
    await homePage.profileDropdownMyProfileButton.click();
    await expect(page).toHaveURL(RegExp('/owner-cabinet/$'));
    const phoneNumberInputValue = await myProfilePage.phoneNumberInput.inputValue();
    await expect(phoneNumberInputValue.replace(/\s/g, '')).toBe(fixtures.entryPhoneNumber);
    await expect(myProfilePage.phoneNumberVerificationIcon).toBeVisible();
    await homePage.logout();
    for(let i = 0; i < validPhoneNumbers.length; i++){
        await homePage.loginButton.click();
        await loginPage.login(validPhoneNumbers[i], fixtures.entryPassword);
        await expect(homePage.avatarIcon).toBeVisible();
        await homePage.avatarIcon.click();
        await expect(homePage.profileDropdown).toBeVisible();
        await homePage.profileDropdownMyProfileButton.click();
        await expect(page).toHaveURL(RegExp('/owner-cabinet/$'));
        const phoneNumberInputValue = await myProfilePage.phoneNumberInput.inputValue();
        await expect(phoneNumberInputValue.replace(/\s/g, '')).toBe(fixtures.entryPhoneNumber);
        await expect(myProfilePage.phoneNumberVerificationIcon).toBeVisible();
        await homePage.logout();
    };
});