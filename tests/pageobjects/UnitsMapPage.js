const { expect } = require('@playwright/test');

exports.UnitsMapPage = class UnitsMapPage {
    constructor(page){
        this.page = page;
    }

    filterServiceLabel(serviceName){ return this.page.locator(`//*[@data-testid="serviceLabel" and text()="${serviceName}"]`) }
    filterServiceCheckbox(serviceName){ return this.page.locator(`//*[@data-testid="serviceLabel" and text()="${serviceName}"]/parent::div/input`) }
    filterCategoryLabel(serviceName){ return this.page.locator(`//*[contains(@for, "category") and text()="${serviceName}"]`) }
    filterCategoryCheckbox(serviceName){ return this.page.locator(`//*[contains(@for, "category") and text()="${serviceName}"]/parent::div/parent::div/input`) }

    async checkFilterServiceCheckbox(serviceName){
        await expect(this.filterServiceCheckbox(serviceName).isChecked()).toBeTruthy();
    }
    async checkFilterCategoryCheckbox(serviceName){
        await expect(this.filterCategoryCheckbox(serviceName).isChecked()).toBeTruthy();
    }
}