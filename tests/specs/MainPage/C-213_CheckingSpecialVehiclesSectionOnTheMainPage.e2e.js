const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pageobjects/HomePage');
const { UnitsMapPage } = require('../../pageobjects/UnitsMapPage');

const categories1 = [
    '',
    'Посівна та садильна техніка',
    'Трактори',
    'Техніка для поливу та зрошення',
    'Екскаватори',
    'Навантажувачі',
    'Підйомники',
    'Комунальні машини',
]

const categories2 = [
    '',
    'Трактори',
    'Жатки',
    'Комбайни',
    'Посівна та садильна техніка',
    'Техніка для поливу та зрошення',
    'Інша сільгосптехніка',
    'Лісозаготівельна техніка',
]

const categories3 = [
    '',
    'Екскаватори',
    'Крани',
    'Навантажувачі',
    'Катки',
    'Підйомники',
    'Техніка для земляних робіт',
    'Дорожньо-будівельна техніка',
]

const categories4 = [
    '',
    'Дорожньо-прибиральна техніка',
    'Комунальні машини',
    'Техніка для транспортування',
    'Аварійні машини',
    'Клінінгове обладнання',
    'Обладнання для навантажувачів',
    'Техніка для складування'
]

test('C-213 Checking "Спецтехніка" section on the main page', async ({ page }) => {
    const homePage = new HomePage(page);
    const unitsMapPage = new UnitsMapPage(page);

    await homePage.goto('/');
    await page.waitForTimeout(1000); // wait for page loading
    await expect(homePage.specialVehiclesSection).toBeVisible();
    const specialVehiclesItemsLength = await homePage.specialVehiclesItems.count();

    for(let i = 1; i < specialVehiclesItemsLength; i++){
        await homePage.specialVehiclesItem(i).click();
        await page.waitForTimeout(300);
        await unitsMapPage.checkFilterCategoryCheckbox(categories1[i]);
        await page.goBack();
    };

    for(let i = 1; i < specialVehiclesItemsLength; i++){
        await homePage.specialVehiclesCategoryItem(2).click();
        await homePage.specialVehiclesItem(i).click();
        await page.waitForTimeout(300);
        await unitsMapPage.checkFilterCategoryCheckbox(categories2[i]);
        await page.goBack();
    };

    for(let i = 1; i < specialVehiclesItemsLength; i++){
        await homePage.specialVehiclesCategoryItem(3).click();
        await homePage.specialVehiclesItem(i).click();
        await page.waitForTimeout(300);
        await unitsMapPage.checkFilterCategoryCheckbox(categories3[i]);
        await page.goBack();
    };

    for(let i = 1; i < specialVehiclesItemsLength; i++){
        await homePage.specialVehiclesCategoryItem(4).click();
        await homePage.specialVehiclesItem(i).click();
        await page.waitForTimeout(300);
        await unitsMapPage.checkFilterCategoryCheckbox(categories4[i]);
        await page.goBack();
    };
})