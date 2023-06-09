exports.RestorePasswordPage = class RestorePasswordPage {
    constructor(page){
        this.page = page;
        this.passwordField = this.page.locator('[name="password"]');
        this.submitButton = this.page.locator('[data-testid="submitButton"]');
    }

    async enterPassword(value){
        await this.passwordField.addValue(value);
        await expect(this.passwordField).toHaveValue(value);
    }
}