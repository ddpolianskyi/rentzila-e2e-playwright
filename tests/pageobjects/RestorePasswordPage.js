const { expect } = require('@playwright/test');

exports.RestorePasswordPage = class RestorePasswordPage {
    constructor(page){
        this.page = page;
        this.restorePasswordForm = this.page.locator('[data-testid="form"]');
        this.passwordField = this.page.locator('[name="password"]');
        this.submitButton = this.page.locator('[data-testid="submitButton"]');
        this.errorMessage = this.page.locator('form [role="alert"]');
    }

    async inputPasswordAndClickRestoreButton(password){
        await this.passwordField.fill(password);
        await expect(this.passwordField).toHaveValue(password);
        await this.submitButton.click();
    }
}