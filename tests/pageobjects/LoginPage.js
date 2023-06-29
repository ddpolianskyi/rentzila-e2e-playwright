const { expect } = require('@playwright/test');
const { GmailPage } = require('./GmailPage');

const redColor = '1px solid rgb(219, 49, 70)';

exports.LoginPage = class LoginPage {
    constructor(page){
        this.page = page;

        this.loginForm = this.page.locator('[data-testid="loginPopup"]');
        this.loginEmailInput = this.page.locator('#email');
        this.loginPasswordInput = this.page.locator('#password');
        this.loginShowPasswordIcon = this.page.locator('[data-testid="passwordEye2Icon"]');
        this.loginHidePasswordIcon = this.page.locator('[data-testid="okoIcon"]');
        this.loginSubmitButton = this.page.locator('//form/*[text()="Увійти"]');
        this.loginRegistrationButton = this.page.locator('//*[text()="Зареєструватись"]');
        this.loginLoginWithGoogleButton = this.page.locator('//*[text()="Увійти" and text()=" через Google"]');

        this.loginEmailErrorMessage = this.page.locator('//label[@for="email"]/following-sibling::p');
        this.loginPasswordErrorMessage = this.page.locator('//label[@for="password"]/following-sibling::p');
        this.loginEmailFieldCannotBeEmptyError = this.page.locator('//*[@for="email"]/following-sibling::*[text()="Поле не може бути порожнім"]');
        this.loginPasswordFieldCannotBeEmptyError = this.page.locator('//*[@for="password"]/following-sibling::*[text()="Поле не може бути порожнім"]');
        this.loginWrongFormatOfEmailOrPhoneNumberError = this.page.locator('//*[@for="email"]/following-sibling::*[text()="Неправильний формат email або номера телефону"]');
        this.loginWrongEmailOrPasswordError = this.page.locator('//*[@data-testid="loginPopup"]//*[text()="Невірний e-mail або пароль"]');
        this.loginWrongPhoneNumberOrPasswordError = this.page.locator('//*[@data-testid="loginPopup"]//*[text()="Невірний номер телефону або пароль"]');
        this.loginPasswordError = this.page.locator('//*[@data-testid="loginPopup"]//*[text()="Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли"]');

        this.registrationEmailInput = this.page.locator('#login');
        this.registrationPasswordInput = this.page.locator('#password');
        this.registrationSubmitButton = this.page.locator('//*[text()="Зареєструватись"]');
        this.registrationLoginButton = this.page.locator('//*[text()="Увійти"]');
        this.registrationSuccessMessage = this.page.locator('//*[text()="Реєстрація пройшла успішно. Перевірте Вашу пошту та підтвердіть реєстрацію"]');
        this.registrationEmailErrorMessage = this.page.locator('//label[@for="login"]/following-sibling::p');
        this.registrationPasswordErrorMessage = this.page.locator('//label[@for="password"]/following-sibling::p');
        this.registrationWrongFormatOfEmailOrPasswordError = this.page.locator('//*[text()="Неправильний формат email або номера телефону"]')
        this.registrationPasswordError = this.page.locator('//*[text()="Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли"]');

        this.forgotPasswordLink = this.page.locator('//*[text()="Забули пароль?"]');
    
        this.registrationEmailFieldCannotBeEmptyError = this.page.locator('//*[@for="login"]/following-sibling::*[text()="Поле не може бути порожнім"]');
        this.registrationPasswordFieldCannotBeEmptyError = this.page.locator('//*[@for="password"]/following-sibling::*[text()="Поле не може бути порожнім"]');
        this.registrationProfileIsAlreadyRegisteredError = this.page.locator('//*[text()="Профіль з таким емейлом вже існує"]');

        this.restorePasswordPopup = this.page.locator('[data-testid="restorePasswordPopup"]');
        this.restorePasswordCloseButton = this.page.locator('[data-testid="restorePasswordCross"]');
        this.restorePasswordEmailInput = this.page.locator('[data-testid="restorePasswordPopup"] [name="login"]');
        this.restorePasswordSubmitButton = this.page.locator('[data-testid="restorePasswordPopup"] button');
        this.restorePasswordSuccessMessage = this.page.locator('//*[text()="На Ваш е-mail надіслані подальші інструкції по відновленню пароля від акаунта"]');
        this.restorePasswordFieldCannotBeEmptyError = this.page.locator('//*[@data-testid="restorePasswordPopup"]//*[text()="Поле не може бути порожнім"]');
        this.restorePasswordWrongEmailOrPhoneNumberError = this.page.locator('//*[@data-testid="restorePasswordPopup"]//*[text()="Неправильний формат email або номера телефону"]');
        this.restorePasswordUserIsNotVerifiedError = this.page.locator('[data-testid="restoreError"]');

        this.googleForm = this.page.locator('#initialView');
        this.googleEmailInput = this.page.locator('#identifierId');
        this.googlePasswordInput = this.page.locator('[name="Passwd"]');
        this.googleEmailNextButton = this.page.locator('#identifierNext');
        this.googlePasswordNextButton = this.page.locator('#passwordNext');
    }
    async openForgotPasswordForm(){
        await this.forgotPasswordLink.click();
        await expect(this.restorePasswordPopup).toBeVisible();
    }
    async inputRestorePasswordEmail(email){
        await this.restorePasswordEmailInput.fill(email);
        await expect(this.restorePasswordEmailInput).toHaveValue(email);
    }
    async inputEmailAndClickRestoreButton(email){
        await this.inputRestorePasswordEmail(email);
        await this.restorePasswordSubmitButton.click();
    }
    async inputLoginEmail(email){
        await this.loginEmailInput.fill(email);
        await expect(this.loginEmailInput).toHaveValue(email);
    }
    async inputLoginPassword(password){
        await this.loginPasswordInput.fill(password);
        await expect(this.loginPasswordInput).toHaveValue(password);
    }
    async login(email, password){
        await this.loginEmailInput.fill(email);
        await expect(this.loginEmailInput).toHaveValue(email);
        await this.loginPasswordInput.fill(password);
        await expect(this.loginPasswordInput).toHaveValue(password);
        await this.loginSubmitButton.click();
    }
    async checkLoginEmailError(errorMessage){
        await expect(this.loginEmailErrorMessage).toBeVisible();
        await expect(this.loginEmailInput).toHaveCSS('border', redColor);
        await expect(this.loginEmailErrorMessage).toHaveText(errorMessage);
    }
    async checkLoginPasswordError(errorMessage){
        await expect(this.loginPasswordErrorMessage).toBeVisible();
        await expect(this.loginPasswordInput).toHaveCSS('border', redColor);
        await expect(this.loginPasswordErrorMessage).toHaveText(errorMessage);
    }
    async inputRegistrationEmail(email){
        await this.registrationEmailInput.fill(email);
        await expect(this.registrationEmailInput).toHaveValue(email);
    }
    async inputRegistrationPassword(password){
        await this.registrationPasswordInput.fill(password);
        await expect(this.registrationPasswordInput).toHaveValue(password);
    }
    async registration(email, password){
        await this.registrationEmailInput.fill(email);
        await expect(this.registrationEmailInput).toHaveValue(email);
        await this.registrationPasswordInput.fill(password);
        await expect(this.registrationPasswordInput).toHaveValue(password);
        await this.registrationSubmitButton.click();
    }
    async checkRegistrationEmailError(errorMessage){
        await expect(this.registrationEmailErrorMessage).toBeVisible();
        await expect(this.registrationEmailInput).toHaveCSS('border', redColor);
        await expect(this.registrationEmailErrorMessage).toHaveText(errorMessage);
    }
    async checkRegistrationPasswordError(errorMessage){
        await expect(this.registrationPasswordErrorMessage).toBeVisible();
        await expect(this.registrationPasswordInput).toHaveCSS('border', redColor);
        await expect(this.registrationPasswordErrorMessage).toHaveText(errorMessage);
    }
    async openGoogleForm(){
        const gmailPage = new GmailPage(this.page);

        await this.loginLoginWithGoogleButton.click();
        await expect(gmailPage.googleForm).toBeVisible();
    }
}