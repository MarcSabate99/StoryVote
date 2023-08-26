import puppeteer, {Browser, Page} from "puppeteer";

describe("Index Controller", () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: "new" })
        page = await browser.newPage();

    });

    it("index page is rendered", async () => {
        await page.goto("http://localhost:3000");
        await page.waitForSelector("#userNameInput");
        const text = await page.$eval("#userNameInput", (e) => e.textContent);
        const pageTitle = await page.title();
        expect(pageTitle).toContain("Scrum Planing Poker - Initial")
        expect(text).toContain("");
    });

    it("Redirect to home after complete form", async () => {
        await page.goto("http://localhost:3000");
        await page.waitForSelector("#userNameInput");
        await page.$eval('#userNameInput', el => el.textContent = 'Test');
        await page.click('#save_name');
        page.once('response', async response => {
            expect(response.status()).toBe(304);
        })
    })

    it("Redirect to home", async () => {
        page.once('response', response => {
            expect(response.status()).toBe(304);
        })
        await page.setExtraHTTPHeaders({
            "cookie": "userName=test;"
        })
        await page.goto("http://localhost:3000");
    });

    afterAll(() => browser.close());
});
