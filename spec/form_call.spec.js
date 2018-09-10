import faker from "faker";
import puppeteer from "puppeteer";

const APP = "https://www.artlaw.ru";
faker.locale = "ru";

const lead = {
  name: faker.name.firstName(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  site: faker.internet.domainName(),
  message: faker.random.words()
};

let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    //slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

afterAll(() => {
  browser.close();
});

describe("request callback", () => {
  test(
    "lead can submit form",
    async () => {
      await page.goto(APP);
      await page.click("a.callback");
      await page.waitForSelector("form[name=CALLBACK]");
      await page.click("input[name=form_text_1]");
      await page.type("input[name=form_text_1]", lead.name);
      await page.click("input[name=form_text_2]");
      await page.type("input[name=form_text_2]", lead.phone);
      await page.click("button.btn");
      await page.screenshot({path: 'screenshots/request_callback.png', fullPage: false});
      //await page.waitFor(2000);
      await page.waitForSelector("div.important__text>div.title");
    },
    16000
  );
});


/*describe("Testing the meta", () => {
  test("assert that <title> is correct", async () => {
    const title = await page.title();
    expect(title).toBe(
      "Продвижение сайтов ☝️ поисковая раскрутка сайта в Москве, Санкт-Петербурге и по всей России"
    );
  },16000);
    test("assert that <decsription> is correct", async () => {
    const decsription = await page.$eval("head > meta[name='description']", element => element.textContent);
    expect(decsription).toBe(
      "DEMIS GROUP &#127942; СКИДКИ до 20 % на поисковое продвижение сайтов в Москве, Петербурге и других регионах. ОПЛАТА — ПО ФАКТУ за раскрутку интернет-сайта в поисковых системах. Особый акцент — на УВЕЛИЧЕНИИ ПРОДАЖ у каждого клиента на каждый вложенный в SEO рубль!"
    );
  },16000);
});*/