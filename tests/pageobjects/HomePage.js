exports.HomePage = class HomePage {
    constructor(page){
        this.page = page;
        this.loginButton = this.page.locator('//*[text()="Вхід"]');
        this.avatarIcon = this.page.locator('[data-testid="avatarBlock"]');
        this.profileDropdown = this.page.locator('//*[@data-testid="profileDropdown"]/div[2]');
        this.profileDropdownEmail = this.page.locator('[data-testid="profileDropdown"] [data-testid="email"]');
        this.profileDropdownMyProfileButton = this.page.locator('[data-testid="profileDropdown"] [data-testid="profile"]');
        this.profileDropdownLogoutButton = this.page.locator('[data-testid="profileDropdown"] [data-testid="logout"]');
    }
    
    async open(){
        await this.page.goto('/');
    }
}