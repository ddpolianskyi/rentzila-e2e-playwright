const { expect } = require('@playwright/test');

const redColor = '1px solid rgb(219, 49, 70)';

exports.LoginPage = class LoginPage {
    constructor(page){
        this.page = page;

        this.loginPopup = this.page.locator('[data-testid="loginPopup"]');
        this.loginEmailInput = this.page.locator('#email');
        this.loginPasswordInput = this.page.locator('#password');
        this.loginShowPasswordIcon = this.page.locator('[data-testid="passwordEye2Icon"]');
        this.loginHidePasswordIcon = this.page.locator('[data-testid="okoIcon"]');
        this.loginSubmitButton = this.page.locator('//form/*[text()="Увійти"]');
        this.loginRegistrationButton = this.page.locator('//*[text()="Зареєструватись"]');
        this.loginLoginWithGoogleButton = this.page.locator('//*[text()="Увійти" and text()=" через Google"]');

        this.registrationEmailInput = this.page.locator('#login');
        this.registrationPasswordInput = this.page.locator('#password');
        this.registrationSubmitButton = this.page.locator('//*[text()="Зареєструватись"]');
        this.registrationLoginButton = this.page.locator('//*[text()="Увійти"]');
        this.registrationSuccessMessage = this.page.locator('//*[text()="Реєстрація пройшла успішно. Перевірте Вашу пошту та підтвердіть реєстрацію"]');
        this.registrationWrongFormatOfEmailOrPasswordError = this.page.locator('//*[text()="Неправильний формат email або номера телефону"]')
        this.registrationPasswordError = this.page.locator('//*[text()="Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли"]');

        this.forgotPasswordLink = this.page.locator('//*[text()="Забули пароль?"]');
    
        this.registrationEmailFieldCannotBeEmptyError = this.page.locator('//*[@for="login"]/following-sibling::*[text()="Поле не може бути порожнім"]');
        this.registrationPasswordFieldCannotBeEmptyError = this.page.locator('//*[@for="password"]/following-sibling::*[text()="Поле не може бути порожнім"]');
        this.registrationProfileIsAlreadyRegisteredError = this.page.locator('//*[text()="Профіль з таким емейлом вже існує"]');
    
        this.loginEmailFieldCannotBeEmptyError = this.page.locator('//*[@for="email"]/following-sibling::*[text()="Поле не може бути порожнім"]');
        this.loginPasswordFieldCannotBeEmptyError = this.page.locator('//*[@for="password"]/following-sibling::*[text()="Поле не може бути порожнім"]');
        this.loginWrongFormatOfEmailOrPhoneNumberError = this.page.locator('//*[@for="email"]/following-sibling::*[text()="Неправильний формат email або номера телефону"]');
        this.loginWrongEmailOrPasswordError = this.page.locator('//*[@data-testid="loginPopup"]//*[text()="Невірний e-mail або пароль"]');
        this.loginWrongPhoneNumberOrPasswordError = this.page.locator('//*[@data-testid="loginPopup"]//*[text()="Невірний номер телефону або пароль"]');
        this.loginPasswordError = this.page.locator('//*[@data-testid="loginPopup"]//*[text()="Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли"]');

        this.restorePasswordPopup = this.page.locator('[data-testid="restorePasswordPopup"]');
        this.restorePasswordCloseButton = this.page.locator('[data-testid="restorePasswordCross"]');
        this.restorePasswordEmailInput = this.page.locator('[data-testid="restorePasswordPopup"] [name="login"]');
        this.restorePasswordSubmitButton = this.page.locator('[data-testid="restorePasswordPopup"] button');
        this.restorePasswordSuccessMessage = this.page.locator('//*[text()="На Ваш е-mail надіслані подальші інструкції по відновленню пароля від акаунта"]');
        this.restorePasswordFieldCannotBeEmptyError = this.page.locator('//*[@data-testid="restorePasswordPopup"]//*[text()="Поле не може бути порожнім"]');
        this.restorePasswordWrongEmailOrPhoneNumberError = this.page.locator('//*[@data-testid="restorePasswordPopup"]//*[text()="Неправильний формат email або номера телефону"]');
        this.restorePasswordUserIsNotVerifiedError = this.page.locator('[data-testid="restorePasswordPopup"] [data-testid="restoreError"]');

        this.googleForm = this.page.locator('#initialView');
        this.googleEmailInput = this.page.locator('#identifierId');
        this.googlePasswordInput = this.page.locator('[name="Passwd"]');
        this.googleEmailNextButton = this.page.locator('#identifierNext');
        this.googlePasswordNextButton = this.page.locator('#passwordNext');
    }

    async enterLoginEmail(value){
        await this.loginEmailInput.fill(value);
        await expect(this.loginEmailInput).toHaveValue(value);
    }
    async enterLoginPassword(value){
        await this.loginPasswordInput.fill(value);
        await expect(this.loginPasswordInput).toHaveValue(value);
    }
    async enterRegistrationEmail(value){
        await this.registrationEmailInput.fill(value);
        await expect(this.registrationEmailInput).toHaveValue(value);
    }
    async enterRegistrationPassword(value){
        await this.registrationPasswordInput.fill(value);
        await expect(this.registrationPasswordInput).toHaveValue(value);
    }
    async enterRestorePasswordEmail(value){
        await this.restorePasswordEmailInput.fill(value);
        await expect(this.restorePasswordEmailInput).toHaveValue(value);
    }
    async enterGoogleEmail(value){
        await this.googleEmailInput.fill(value);
        await expect(this.googleEmailInput).toHaveValue(value);
    }
    async enterGooglePassword(value){
        await this.googlePasswordInput.fill(value);
        await expect(this.googlePasswordInput).toHaveValue(value);
    }
    async checkLoginEmailToHaveErrorBorder(){
        await expect(this.loginEmailInput).toHaveCSS('border', redColor);
    }
    async checkLoginEmailToNotHaveErrorBorder(){
        await expect(this.loginEmailInput).not.toHaveCSS('border', redColor);
    }
    async checkLoginPasswordToHaveErrorBorder(){
        await expect(this.loginPasswordInput).toHaveCSS('border', redColor);
    }
    async checkLoginPasswordToNotHaveErrorBorder(){
        await expect(this.loginPasswordInput).not.toHaveCSS('border', redColor);
    }
    async clickForgotPasswordLink(){
        await this.forgotPasswordLink.click();
        await expect(this.restorePasswordPopup).toBeVisible();
    }
    async resetPassword(email){
        await this.enterRestorePasswordEmail(email);
        await this.restorePasswordSubmitButton.click();
    }
    async login(email, password){
        await this.enterLoginEmail(email);
        await this.enterLoginPassword(password);
        await this.loginSubmitButton.click();
    }
    async loginGoogle(email, password){
        await this.enterGoogleEmail(email);
        await this.googleEmailNextButton.click();
        await this.enterGooglePassword(password);
        await this.googlePasswordNextButton.click();
    }
    async registration(email, password){
        await this.enterRegistrationEmail(email);
        await this.enterRegistrationPassword(password);
        await this.registrationSubmitButton.click();
    }
}