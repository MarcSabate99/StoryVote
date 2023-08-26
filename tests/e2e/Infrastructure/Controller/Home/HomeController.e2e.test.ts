import puppeteer, {Browser, Page} from "puppeteer";

describe("Home Controller", () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: "new" })
        page = await browser.newPage();
    });

    it("home page is rendered by get request", async () => {
        await page.goto("http://localhost:3000/home");
        await page.waitForSelector("#room_number");
        const text = await page.$eval("#room_number", (e) => e.textContent);
        const pageTitle = await page.title();
        expect(pageTitle).toContain("Scrum Planing Poker - Home")
        expect(text).toContain("");
    });

    it("create a room", async () => {
        page.once('response', response => {
            expect(response.status()).toBe(304);
        })
        await page.setExtraHTTPHeaders({
            'cookie': 'userName=test;'
        })
        await page.goto("http://localhost:3000/home");
        await page.click('#create_room');
    });

    it("home page is rendered by post request", async () => {
        await page.setRequestInterception(true);
        page.on('request', interceptedRequest => {
            let data = {
                'method': 'POST',
            };
            interceptedRequest.continue(data);
        });
        await page.goto("http://localhost:3000/home");
        await page.waitForSelector("#room_number");
        const text = await page.$eval("#room_number", (e) => e.textContent);
        const pageTitle = await page.title();
        expect(pageTitle).toContain("Scrum Planing Poker - Home")
        expect(text).toContain("");
    });
    afterAll(() => browser.close());
});
