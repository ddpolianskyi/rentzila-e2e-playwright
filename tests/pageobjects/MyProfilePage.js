exports.MyProfilePage = class MyProfilePage {
    constructor(page){
        this.page = page;
        this.phoneNumberInput = this.page.locator('[data-testid="input_OwnerProfileNumber"]');
        this.phoneNumberVerificationIcon = this.page.locator('[data-testid="verification_OwnerProfileNumber"]');
    }
}