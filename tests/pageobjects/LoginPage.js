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
        await expect(this.page.locator('[data-testid="preloader"]')).toBeVisible();
        await expect(this.page.locator('[data-testid="preloader"]')).not.toBeVisible();
    }

    // Login
    async openLoginPopup(){
        await this.loginButton.click();
        await expect(this.loginPopup).toBeVisible();
    }
    async checkLoginPopup(){
        await expect(this.loginPopup).toBeVisible();
    }
    async enterLoginEmail(value){
        await this.loginEmailInput.fill(value);
        await expect(this.loginEmailInput).toHaveValue(value)
    }
    async enterLoginPassword(value){
        await this.loginPasswordInput.fill(value);
        await expect(this.loginPasswordInput).toHaveValue(value)
    }
    async clickLoginSubmitButton(){
        await this.loginSubmitButton.click();
    }
    async checkLoginEmail(){
        await expect(this.loginEmailInput).toHaveCSS('border', '1px solid rgb(219, 49, 70)');
        await expect(this.loginEmailError).toBeVisible();
    }
    async negativeCheckLoginEmail(){
        await expect(this.loginEmailInput).not.toHaveCSS('border', '1px solid rgb(219, 49, 70)');
        await expect(this.loginEmailError).not.toBeVisible();
    }
    async checkLoginPassword(){
        await expect(this.loginPasswordInput).toHaveCSS('border', '1px solid rgb(219, 49, 70)');
        await expect(this.loginPasswordError).toBeVisible();
    }
    async negativeCheckLoginPassword(){
        await expect(this.loginPasswordInput).not.toHaveCSS('border', '1px solid rgb(219, 49, 70)');
        await expect(this.loginPasswordError).not.toBeVisible();
    }
    async checkLoginWrongEmailOrPasswordError(){
        await expect(this.loginWrongEmailOrPasswordError).toBeVisible();
    }
    async checkLoginWrongPhoneNumberFormatError(){
        await expect(this.loginWrongPhoneNumberFormatError).toBeVisible();
    }
    async checkLoginWrongPhoneNumberOrPasswordError(){
        await expect(this.loginWrongPhoneNumberOrPasswordError).toBeVisible();
    }

    // Restore password
    async openRestorePasswordPopup(){
        await this.forgotPasswordButton.click();
        await expect(this.restorePasswordPopup).toBeVisible();
    }
    async checkRestorePasswordPopup(){
        await expect(this.restorePasswordPopup).toBeVisible();
    }
    async clickRestorePasswordCloseButton(){
        await this.restorePasswordCloseButton.click();
        await expect(this.restorePasswordPopup).not.toBeVisible();
    }
    async enterRestorePasswordEmail(value){
        await this.restorePasswordEmailInput.fill(value);
    }
    async clickRestorePasswordSubmitButton(){
        await this.restorePasswordSubmitButton.click();
    }
    async checkRestorePasswordWrongEmailOrPhoneNumberFormatError(){
        await expect(this.restorePasswordWrongEmailOrPhoneNumberFormatError).toBeVisible();
    }
    async checkRestorePasswordEmailOrPhoneNumberAlreadyRegisteredError(){
        await expect(this.restorePasswordEmailOrPhoneNumberAlreadyRegisteredError).toBeVisible();
    }

    /**
     * @name loginWithEmptyFields
     * This function check authorization with empty fields.
    */
    async loginWithEmptyFields(){
        await this.openLoginPopup();
        await this.clickLoginSubmitButton();
        await this.checkLoginEmail();
        await this.checkLoginPassword();
        await this.checkLoginPopup();
        await this.enterLoginEmail(fixtures.email);
        await this.clickLoginSubmitButton();
        await this.negativeCheckLoginEmail();
        await this.checkLoginPassword();
        await this.checkLoginPopup();
        await this.enterLoginEmail('');
        await this.enterLoginPassword(fixtures.password);
        await this.checkLoginEmail();
        await this.negativeCheckLoginPassword();
        await this.checkLoginPopup();
    }
    /**
     * @name loginWithInvalidCredentials
     * This function check authorization with invalid credentials.
     */

    // Mistake in the C203 test case. "Невірний e-mail або пароль" should be displayed only when user fill the inputs with non-existent emails/passwords.
    async loginWithInvalidCredentials(){
        await this.openLoginPopup();
        await this.enterLoginPassword(fixtures.password)
        for(let i = 0; i < fixtures.invalidEmails.length; i++){
            await this.enterLoginEmail(fixtures.invalidEmails[i]);
            await this.clickLoginSubmitButton();
            await this.checkLoginPopup();
            await this.checkLoginWrongEmailOrPasswordError();
        }
        for(let i = 0; i < fixtures.nonExistingEmails.length; i++){
            await this.enterLoginEmail(fixtures.nonExistingEmails[i]);
            await this.clickLoginSubmitButton();
            await this.checkLoginPopup();
            await this.checkLoginWrongEmailOrPasswordError();
        }
        await this.enterLoginEmail(fixtures.email);
        for(let i = 0; i < fixtures.invalidPasswords.length; i++){
            await this.enterLoginPassword(fixtures.invalidPasswords[i]);
            await this.clickLoginSubmitButton();
            await this.checkLoginPopup();
            await this.checkLoginWrongEmailOrPasswordError();
        }
        for(let i = 0; i < fixtures.nonExistingPasswords.length; i++){
            await this.enterLoginPassword(fixtures.nonExistingPasswords[i]);
            await this.clickLoginSubmitButton();
            await this.checkLoginPopup();
            await this.checkLoginWrongEmailOrPasswordError();
        }
    }
    /**
     * @name loginWithInvalidPhoneNumber
     * This function check authorization with invalid phone numbers.
     */
    async loginWithInvalidPhoneNumber(){
        await this.openLoginPopup();
        await this.enterLoginPassword(fixtures.password);
        for(let i = 0; i < fixtures.invalidPhoneNumbers.length; i++){
            await this.enterLoginEmail(fixtures.invalidPhoneNumbers[i]);
            await this.clickLoginSubmitButton();
            await this.checkLoginPopup();
            await this.checkLoginWrongPhoneNumberFormatError();
        }
        for(let i = 0; i < fixtures.nonExistingPhoneNumbers.length; i++){
            await this.enterLoginEmail(fixtures.nonExistingPhoneNumbers[i]);
            await this.clickLoginSubmitButton();
            await this.checkLoginPopup();
            await this.checkLoginWrongPhoneNumberOrPasswordError();
        }
    }
    /**
     * @name passwordResetWithInvalidEmail
     * This function check password reset with invalid emails.
     */
    async passwordResetWithInvalidEmail(){
        await this.openLoginPopup();
        await this.openRestorePasswordPopup();
        await this.enterLoginEmail(fixtures.email);
        await this.clickRestorePasswordCloseButton();
        await this.openRestorePasswordPopup();
        for(let i = 0; i < fixtures.invalidEmails.length; i++){
            await this.enterRestorePasswordEmail(fixtures.invalidEmails[i]);
            await this.clickRestorePasswordSubmitButton();
            await this.checkRestorePasswordPopup();
            await this.checkRestorePasswordWrongEmailOrPhoneNumberFormatError();
        }
        for(let i = 0; i < fixtures.nonExistingEmails.length; i++){
            await this.enterRestorePasswordEmail(fixtures.nonExistingEmails[i]);
            await this.clickRestorePasswordSubmitButton();
            await this.checkRestorePasswordPopup();
            await this.checkRestorePasswordEmailOrPhoneNumberAlreadyRegisteredError();
        }
    }
}