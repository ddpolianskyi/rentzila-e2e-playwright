const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pageobjects/HomePage');
const { UnitsMapPage } = require('../../pageobjects/UnitsMapPage');

test('C-212 Checking "Послуги" section on the main page', async ({ page }) => {
    const homePage = new HomePage(page);
    const unitsMapPage = new UnitsMapPage(page);

    await homePage.goto('/');
    await page.waitForTimeout(1000); // wait for page loading
    await expect(homePage.servicesSection).toBeVisible();
    const servicesItemsLength = await homePage.servicesItems.count();

    for(let i = 1; i < servicesItemsLength; i++){
        const itemTitleText = await homePage.servicesItemTitle(i).textContent();
        await homePage.servicesItem(i).click();
        await page.waitForTimeout(300);
        await unitsMapPage.checkFilterServiceCheckbox(itemTitleText);
        await page.goBack();
    };

    for(let i = 1; i < servicesItemsLength; i++){
        await homePage.servicesCategoryItem(2).click();
        const itemTitleText = await homePage.servicesItemTitle(i).textContent();
        await homePage.servicesItem(i).click();
        await page.waitForTimeout(300);
        await unitsMapPage.checkFilterServiceCheckbox(itemTitleText);
        await page.goBack();
    };

    for(let i = 1; i < servicesItemsLength; i++){
        await homePage.servicesCategoryItem(3).click();
        const itemTitleText = await homePage.servicesItemTitle(i).textContent();
        await homePage.servicesItem(i).click();
        await page.waitForTimeout(300);
        await unitsMapPage.checkFilterServiceCheckbox(itemTitleText);
        await page.goBack();
    };

    for(let i = 1; i < servicesItemsLength; i++){
        await homePage.servicesCategoryItem(4).click();
        const itemTitleText = await homePage.servicesItemTitle(i).textContent();
        await homePage.servicesItem(i).click();
        await page.waitForTimeout(300);
        await unitsMapPage.checkFilterServiceCheckbox(itemTitleText);
        await page.goBack();
    };
})