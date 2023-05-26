const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
    constructor(page){
        this.page = page;

        this.loginPopup = this.page.locator('[data-testid="loginPopup"]');
        this.loginEmailInput = this.page.locator('[data-testid="loginPopup"] #email');
        this.loginPasswordInput = this.page.locator('[data-testid="loginPopup"] #password');
        this.loginShowPasswordIcon = this.page.locator('[data-testid="loginPopup"] [data-testid="passwordEye2Icon"]');
        this.loginHidePasswordIcon = this.page.locator('[data-testid="loginPopup"] [data-testid="okoIcon"]');
        this.loginSubmitButton = this.page.locator('//*[@data-testid="loginPopup"]//button[text()="Увійти"]');
        this.loginForgotPasswordButton = this.page.locator('//*[@data-testid="loginPopup"]//*[text()="Забули пароль?"]');
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
        this.restorePasswordFieldCannotBeEmptyError = this.page.locator('//*[@data-testid="restorePasswordPopup"]//*[text()="Поле не може бути порожнім"]');
        this.restorePasswordWrongEmailOrPhoneNumberError = this.page.locator('//*[@data-testid="restorePasswordPopup"]//*[text()="Неправильний формат email або номера телефону"]');
        this.restorePasswordUserIsNotVerifiedError = this.page.locator('[data-testid="restorePasswordPopup"] [data-testid="restoreError"]');
    }

    async enterLoginEmail(value){
        await this.loginEmailInput.fill(value);
        await expect(this.loginEmailInput).toHaveValue(value);
    }
    async enterLoginPassword(value){
        await this.loginPasswordInput.fill(value);
        await expect(this.loginPasswordInput).toHaveValue(value);
    }
    async enterRestorePasswordEmail(value){
        await this.restorePasswordEmailInput.fill(value);
        await expect(this.restorePasswordEmailInput).toHaveValue(value);
    }
}