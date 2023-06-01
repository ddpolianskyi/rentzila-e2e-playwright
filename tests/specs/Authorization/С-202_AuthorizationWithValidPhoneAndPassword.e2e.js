const { test, expect } = require('@playwright/test');
const fixtures = require('../../fixtures/fixtures.json');
const { HomePage } = require('../../pageobjects/HomePage');
const { LoginPage } = require('../../pageobjects/LoginPage');
const { MyProfilePage } = require('../../pageobjects/MyProfilePage');

const validPhoneNumbers = [
    fixtures.validPhoneNumberOne,
    fixtures.validPhoneNumberTwo
]

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.loginButton.click();
});
test('С-202 Authorization with valid phone and password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const myProfilePage = new MyProfilePage(page);
    await loginPage.enterLoginEmail(fixtures.phoneNumber);
    await loginPage.checkLoginEmailToNotHaveErrorBorder();
    await loginPage.enterLoginPassword(fixtures.password);
    await loginPage.checkLoginPasswordToNotHaveErrorBorder();
    await loginPage.loginSubmitButton.click();
    await expect(homePage.avatarIcon).toBeVisible();
    await homePage.avatarIcon.click();
    await expect(homePage.profileDropdown).toBeVisible();
    await homePage.profileDropdownMyProfileButton.click();
    await expect(page).toHaveURL(RegExp('/owner-cabinet/$'));
    const phoneNumberInputValue = await myProfilePage.phoneNumberInput.inputValue();
    await expect(phoneNumberInputValue.replace(/\s/g, '')).toBe(fixtures.phoneNumber);
    await expect(myProfilePage.phoneNumberVerificationIcon).toBeVisible();
    await homePage.avatarIcon.click();
    await homePage.profileDropdownLogoutButton.click();
    for(let i = 0; i < validPhoneNumbers.length; i++){
        await homePage.loginButton.click();
        await loginPage.enterLoginEmail(validPhoneNumbers[i]);
        await loginPage.enterLoginPassword(fixtures.password);
        await loginPage.loginSubmitButton.click();
        await expect(homePage.avatarIcon).toBeVisible();
        await homePage.avatarIcon.click();
        await expect(homePage.profileDropdown).toBeVisible();
        await homePage.profileDropdownMyProfileButton.click();
        await expect(page).toHaveURL(RegExp('/owner-cabinet/$'));
        const phoneNumberInputValue = await myProfilePage.phoneNumberInput.inputValue();
        await expect(phoneNumberInputValue.replace(/\s/g, '')).toBe(fixtures.phoneNumber);
        await expect(myProfilePage.phoneNumberVerificationIcon).toBeVisible();
        await homePage.avatarIcon.click();
        await homePage.profileDropdownLogoutButton.click();
    };
});