const { expect } = require('@playwright/test');
const fixtures = require('../fixtures/fixtures.json');

exports.LoginPage = class LoginPage {
    constructor(page){
        this.page = page;

        this.loginButton = this.page.locator('//div[text()="Вхід"]');
        this.loginPopup = this.page.locator('[data-testid="loginPopup"]');
        this.loginEmailInput = this.page.locator('#email');
        this.loginPasswordInput = this.page.locator('#password');
        this.forgotPasswordButton = this.page.locator('//div[text()="Забули пароль?"]');
        this.loginSubmitButton = this.page.locator('//button[text()="Увійти"]');
        this.loginWrongEmailOrPasswordError = this.page.locator('//*[text()="Невірний e-mail або пароль"]');
        this.loginWrongPhoneNumberFormatError = this.page.locator('//*[text()="Неправильний формат телефону"]');
        this.loginWrongPhoneNumberOrPasswordError = this.page.locator('//*[text()="Невірний номер телефону або пароль"]');
        this.loginEmailError = this.page.locator('label[for="email"] ~ p');
        this.loginPasswordError = this.page.locator('label[for="password"] ~ p');

        this.restorePasswordPopup = this.page.locator('[data-testid="restorePasswordPopup"]');
        this.restorePasswordCloseButton = this.page.locator('[data-testid="restorePasswordCross"]');
        this.restorePasswordEmailInput = this.page.locator('[data-testid="restorePasswordPopup"] [name="login"]');
        this.restorePasswordSubmitButton = this.page.locator('[data-testid="restorePasswordPopup"] button');
        this.restorePasswordWrongEmailOrPhoneNumberFormatError = this.page.locator('//*[@data-testid="restorePasswordPopup"]//*[text()="Неправильний формат email або номера телефону"]');
        this.restorePasswordEmailOrPhoneNumberAlreadyRegisteredError = this.page.locator('[data-testid="restorePasswordPopup"] [data-testid="restoreError"]');
    }
    
    async open(){
        this.page.goto('/');
        await this.page.waitForTimeout(3000);
    }

    // Login
    async openLoginPopup(){
        await this.loginButton.click();
        await expect(this.loginPopup).toBeVisible();
    }
    async enterLoginEmail(value){
        await this.loginEmailInput.fill(value)
    }
    async enterLoginPassword(value){
        await this.loginPasswordInput.fill(value);
    }
    async clickLoginSubmitButton(){
        await this.loginSubmitButton.click();
    }

    // Restore password
    async openRestorePasswordPopup(){
        await this.forgotPasswordButton.click();
        await expect(this.restorePasswordPopup).toBeVisible();
    }
    async enterRestorePasswordEmail(value){
        await this.restorePasswordEmailInput.fill(value);
    }
    async clickRestorePasswordSubmitButton(){
        await this.restorePasswordSubmitButton.click();
    }

    async loginWithEmptyFields(){
        await this.openLoginPopup();
        await this.enterLoginEmail(fixtures.email);
        await this.clickLoginSubmitButton();
        await expect(this.loginPasswordInput).toHaveCSS('border', '1px solid rgb(219, 49, 70)');
        await expect(this.loginPasswordError).toBeVisible();
    }
    async loginWithInvalidCredentials(){
        await this.openLoginPopup();
        await this.enterLoginEmail(fixtures.nonExistingEmails[0]);
        await this.enterLoginPassword(fixtures.password)
        await this.clickLoginSubmitButton();
        for(let i = 0; i < fixtures.invalidEmails.length; i++){
            await this.enterLoginEmail(fixtures.invalidEmails[i]);
            await this.clickLoginSubmitButton();
            await expect(this.loginWrongEmailOrPasswordError).toBeVisible();
        }
        await this.loginEmailInput.fill(fixtures.email);
        for(let i = 0; i < fixtures.invalidPasswords.length; i++){
            await this.enterLoginPassword(fixtures.invalidPasswords[i]);
            await this.clickLoginSubmitButton();
            await expect(this.loginWrongEmailOrPasswordError).toBeVisible();
        }
    }
    async loginWithInvalidPhoneNumber(){
        await this.openLoginPopup();
        await this.enterLoginPassword(fixtures.password);
        for(let i = 0; i < fixtures.invalidPhoneNumbers.length; i++){
            await this.enterLoginEmail(fixtures.invalidPhoneNumbers[i]);
            await this.clickLoginSubmitButton();
            await expect(this.loginWrongPhoneNumberFormatError).toBeVisible();
        }
        for(let i = 0; i < fixtures.nonExistingPhoneNumbers.length; i++){
            await this.enterLoginEmail(fixtures.nonExistingPhoneNumbers[i]);
            await this.clickLoginSubmitButton();
            await expect(this.loginWrongPhoneNumberOrPasswordError).toBeVisible();
        }
    }
    async passwordResetWithInvalidEmail(){
        await this.openLoginPopup();
        await this.openRestorePasswordPopup();
        for(let i = 0; i < fixtures.invalidEmails.length; i++){
            await this.enterRestorePasswordEmail(fixtures.invalidEmails[i]);
            await this.clickRestorePasswordSubmitButton();
            await expect(this.restorePasswordWrongEmailOrPhoneNumberFormatError).toBeVisible();
        }
        for(let i = 0; i < fixtures.nonExistingEmails.length; i++){
            await this.enterRestorePasswordEmail(fixtures.nonExistingEmails[i]);
            await this.clickRestorePasswordSubmitButton();
            await expect(this.restorePasswordEmailOrPhoneNumberAlreadyRegisteredError).toBeVisible();
        }
    }
}