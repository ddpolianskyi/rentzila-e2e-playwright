const { expect } = require('@playwright/test');
const { LoginPage } = require('./LoginPage');

exports.HomePage = class HomePage {
    constructor(page){
        this.page = page;
        this.adminGearButton = this.page.locator('[data-testid="superuserIcon_Navbar"]');
        this.adminUsersLink = this.page.locator('//ul//*[text()="Користувачі"]');
        this.adminUsersSearchField = this.page.locator('[data-testid="input"]');
        this.adminUsersList = this.page.locator('[data-testid="userRow"]');
        this.adminUsersEmail = this.page.locator('//*[@data-testid="userRow"]/*[2]');
        this.adminUsersDeleteButton = this.page.locator('[data-testid="bucketIcon"]');
        this.adminConfirmButton = this.page.locator('[data-testid="confirmButton"]');
        this.adminLogoutButton = this.page.locator('//*[text()="Вихід"]');

        this.loginButton = this.page.locator('//*[text()="Вхід"]');
        this.loginForm = this.page.locator('[data-testid="loginPopup"]');
        this.avatarIcon = this.page.locator('[data-testid="avatarBlock"]');
        this.profileDropdown = this.page.locator('//*[@data-testid="profileDropdown"]/div[2]');
        this.profileDropdownEmail = this.page.locator('[data-testid="profileDropdown"] [data-testid="email"]');
        this.profileDropdownMyProfileButton = this.page.locator('[data-testid="profileDropdown"] [data-testid="profile"]');
        this.profileDropdownLogoutButton = this.page.locator('[data-testid="profileDropdown"] [data-testid="logout"]');

        this.servicesSection = this.page.locator('//*[text()="Послуги"]/parent::section')
        this.servicesCategoryItems = this.page.locator('//*[text()="Послуги"]/parent::section//*[@data-testid="categoriesItem"]')
        this.servicesItems = this.page.locator('//*[text()="Послуги"]/parent::section//*[@data-testid="proposeItem"]')

        this.specialVehiclesSection = this.page.locator('//*[text()="Спецтехніка"]/parent::section')
        this.specialVehiclesCategoryItems = this.page.locator('//*[text()="Спецтехніка"]/parent::section//*[@data-testid="categoriesItem"]')
        this.specialVehiclesItems = this.page.locator('//*[text()="Спецтехніка"]/parent::section//*[@data-testid="proposeItem"]')
    }

    servicesCategoryItem(num){ return this.page.locator(`//*[text()="Послуги"]/parent::section//*[@data-testid="categoriesItem"][${num}]`) }
    servicesItemTitle(num){ return this.page.locator(`//*[text()="Послуги"]/parent::section//*[@data-testid="proposeItem"][${num}]//div[contains(@class, 'name')]`) }
    servicesItem(num){ return this.page.locator(`//*[text()="Послуги"]/parent::section//*[@data-testid="proposeItem"][${num}]`) }

    specialVehiclesCategoryItem(num){ return this.page.locator(`//*[text()="Спецтехніка"]/parent::section//*[@data-testid="categoriesItem"][${num}]`) }
    specialVehiclesItemTitle(num){ return this.page.locator(`//*[text()="Спецтехніка"]/parent::section//*[@data-testid="proposeItem"][${num}]//div[contains(@class, 'name')]`) }
    specialVehiclesItem(num){ return this.page.locator(`//*[text()="Спецтехніка"]/parent::section//*[@data-testid="proposeItem"][${num}]`) }
    
    async goto(url){
        await this.page.goto(url);
    }
    async openLoginForm(){
        const loginPage = new LoginPage(this.page);

        await this.loginButton.click();
        await expect(loginPage.loginForm).toBeVisible();
    }
    async logout(){
        await this.avatarIcon.click();
        await this.profileDropdownLogoutButton.click();
        await expect(this.avatarIcon).not.toBeVisible();
    }
    async checkProfileDropdownEmail(value){
        await this.avatarIcon.click();
        await expect(this.profileDropdownEmail).toHaveText(value);
        await this.avatarIcon.click();
        await expect(this.profileDropdown).not.toBeVisible();
    }
}