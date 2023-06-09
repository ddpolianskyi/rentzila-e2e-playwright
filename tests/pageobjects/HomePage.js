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