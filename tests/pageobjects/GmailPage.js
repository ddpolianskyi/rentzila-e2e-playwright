exports.GmailPage = class GmailPage {
    constructor(page){
        this.page = page;
        this.lettersListItem = this.page.locator('[role="listitem"]');
        this.expandLetterButton = this.page.locator('[role="listitem"]:last-child img[src="//ssl.gstatic.com/ui/v1/icons/mail/images/cleardot.gif"]');
        this.createProfileLetter = this.page.locator('//*[@class="bog"]/*[text()="Створення профілю"]');
        this.restorePasswordLetter = this.page.locator('//*[@class="bog"]/*[text()="Зміна паролю"]');
        this.restorePasswordButton = this.page.locator('//*[@role="listitem"][last()]//a/*[contains(text(), "Змінити пароль")]/parent::a');
        this.activateAccountButton = this.page.locator('//*[@role="listitem"][last()]//a/*[contains(text(), "Активувати мій акаунт")]/parent::a');
    }
}