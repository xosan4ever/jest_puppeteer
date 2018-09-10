import faker from "faker";
import puppeteer from "puppeteer";

const APP = "https://www.artlaw.ru/zakazat-prodvizhenie-saita/";
faker.locale = "ru";

const lead = {
  name: faker.name.firstName(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  site: faker.internet.domainName(),
  //message: faker.random.words()
  message: faker.lorem.paragraph()
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


describe("request cp", () => {
  test(
    "lead can submit cp",
    async () => {
      await page.goto(APP);
      await page.waitForSelector("form[name=ORDER]");
      await page.click("input[name=form_text_22]");
      await page.type("input[name=form_text_22]", lead.name);
      await page.click("input[name=form_text_24]");
      await page.type("input[name=form_text_24]", lead.phone);
      await page.click("input[name=form_text_23]");
      await page.type("input[name=form_text_23]", lead.email);
      await page.click("input[name=form_text_25]");
      await page.type("input[name=form_text_25]", lead.site);
      await page.click("textarea[name=form_textarea_26]");
      await page.type("textarea[name=form_textarea_26]", lead.message);
      await page.click("label[for=\"uslug-checkbox-0\"]");
      await page.click("label[for=\"uslug-checkbox-3\"]");
      await page.click("label[for=\"uslug-checkbox-5\"]");
      await page.click("label[for=\"uslug-checkbox-8\"]");
      await page.screenshot({path: 'screenshots/request_cp.png', fullPage: true});
      //await page.waitFor(3000);
      //await page.waitForSelector("div.important__text>div.title");
    },
    26000
  );
  test(
    "abandoned cart1",
    async () => {
      await page.goto(APP);
      await page.click("a.logo");
      await page.waitForSelector("form[name=RECALL_ORDER]");
      await page.click("input[name=form_text_20]");
      await page.type("input[name=form_text_20]", lead.name);
      await page.click("input[name=form_text_21]");
      await page.type("input[name=form_text_21]", lead.phone);
      await page.screenshot({path: 'screenshots/abandoned_cart1.png', fullPage: false});
    },
    16000
  );
  test(
    "abandoned cart2",
    async () => {
      await page.goto(APP);
      await page.click("a.logo");
      await page.waitForSelector("form[name=RECALL_ORDER]");
      await page.click("input[name=form_text_20]");
      await page.type("input[name=form_text_20]", lead.name);
      await page.click("input[name=form_text_21]");
      await page.type("input[name=form_text_21]", lead.phone);
      await page.screenshot({path: 'screenshots/abandoned_cart2.png', fullPage: false});
    },
    16000
  );
    test(
    "abandoned cart3",
    async () => {
      await page.goto(APP);
      await page.click("a.logo");
      await page.waitForSelector("form[name=RECALL_ORDER]");
      await page.click("input[name=form_text_20]");
      await page.type("input[name=form_text_20]", lead.name);
      await page.click("input[name=form_text_21]");
      await page.type("input[name=form_text_21]", lead.phone);
      await page.screenshot({path: 'screenshots/abandoned_cart3.png', fullPage: false});
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