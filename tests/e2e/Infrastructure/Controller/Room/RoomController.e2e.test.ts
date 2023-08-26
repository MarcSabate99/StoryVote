import puppeteer, {Browser, Page} from "puppeteer";

describe("Room Controller", () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: "new" })
        page = await browser.newPage();
    });

    it("room no exists so redirect to home", async () => {
        page.once('response', response => {
            expect(response.status()).toBe(302);
            expect(response.headers().location).toBe("/home?room=not_found")
        })
        await page.goto("http://localhost:3000/room/5000");
    });

    afterAll(() => browser.close());
});
