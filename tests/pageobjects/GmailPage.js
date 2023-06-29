const { expect } = require('@playwright/test');

exports.GmailPage = class GmailPage {
    constructor(page){
        this.page = page;

        this.googleForm = this.page.locator('#initialView');
        this.googleEmailInput = this.page.locator('#identifierId');
        this.googlePasswordInput = this.page.locator('[name="Passwd"]');
        this.googleEmailNextButton = this.page.locator('#identifierNext');
        this.googlePasswordNextButton = this.page.locator('#passwordNext');

        this.lettersListItem = this.page.locator('[role="listitem"]');
        this.deleteLetterButton = this.page.locator('//*[@gh="tm"]/div/div/div[2]/div[3]');
        this.expandLetterButton = this.page.locator('[role="listitem"]:last-child img[src="//ssl.gstatic.com/ui/v1/icons/mail/images/cleardot.gif"]');
        this.createProfileLetter = this.page.locator('//*[@class="bog"]/*[text()="Створення профілю"]').first();
        this.resetPasswordLetter = this.page.locator('//*[@class="bog"]/*[text()="Зміна паролю"]').first();
        this.resetPasswordButton = this.page.locator('//*[@role="listitem"][last()]//a/*[contains(text(), "Змінити пароль")]/parent::a');
        this.activateAccountButton = this.page.locator('//*[@role="listitem"][last()]//a/*[contains(text(), "Активувати мій акаунт")]/parent::a');
    }

    async loginGoogle(email, password){
        await this.googleEmailInput.fill(email);
        await expect(this.googleEmailInput).toHaveValue(email);
        await this.googleEmailNextButton.click();
        await this.googlePasswordInput.fill(password);
        await expect(this.googlePasswordInput).toHaveValue(password);
        await this.googlePasswordNextButton.click();
    }
    async openGmailInbox(){
        await this.page.waitForTimeout(1000); // without this wait link in the letter will be broken
        await this.page.goto('https://mail.google.com');
    }
    async openGmailInboxWithLogin(email, password){
        await this.page.waitForTimeout(1000); // without this wait link in the letter will be broken
        await this.page.goto('https://mail.google.com');
        await this.loginGoogle(email, password);
    }
    async clickExpandLetterButton(){
        if(await this.expandLetterButton.isVisible()){ await this.expandLetterButton.click(); }
    }
    async clickRestorePasswordLetterLink(){
        await this.page.waitForTimeout(1000); // waiting for elements in the letter
        await expect(this.resetPasswordButton).toBeVisible();
        await this.page.goto(await this.resetPasswordButton.getAttribute('href'));
    }
    async clickCreateAccountLetterLink(){
        await this.page.waitForTimeout(1000); // waiting for elements in the letter
        await expect(this.activateAccountButton).toBeVisible();
        await this.page.goto(await this.activateAccountButton.getAttribute('href'));
    }
}