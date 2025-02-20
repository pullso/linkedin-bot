import puppeteer from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from 'fs';
import {getConnectionMessage} from "./modules/messages.js";
import dotenv from 'dotenv';
import {loadCookies, saveCookies} from "./modules/cookies.js";
import { randomTimeout } from "./utils/timeout.js";

dotenv.config()
puppeteer.use(StealthPlugin())

const LINKEDIN_LOGIN = process.env.LINKEDIN_LOGIN
const LINKEDIN_PASSWORD = process.env.LINKEDIN_PASSWORD
const SEARCH_URL = process.env.SEARCH_URL
const MAX_PAGE = process.env.MAX_PAGE
const MAX_CLICKED_PROFILES = process.env.MAX_CLICKED_PROFILES
const SHOULD_ADD_MESSAGE = process.env.SHOULD_ADD_MESSAGE === 'true';

let LOOKED_PROFILES = 0;
let CLICKED_PROFILES = 0;

const saveCookiesPath = './cookies.json';
const loadCookiesPath = './cookies.json';

const {browser, page} = await launchBrowser(loadCookiesPath);

// Set up a function to launch Puppeteer and load cookies if available
async function launchBrowser(loadCookiesPath) {
  const browser = await puppeteer.launch({headless: process.argv.includes('--stealth') ? 'new' : false});
  const page = await browser.newPage();
  if (loadCookiesPath && fs.existsSync(loadCookiesPath)) {
    await loadCookies(page, loadCookiesPath);
  }
  return {browser, page};
}

const selectors = {
  loginForm: {
    username: '#username', password: '#password', submit: '.login__form_action_container button',
  },
  searchResults: {
    item: '.search-results-container > div:nth-child(2) > div > ul > li',
    subtitle: '.mb1 > div:nth-child(2)',
    connectButton: 'div > div > div > div:nth-child(3) button',
    sendButton: 'button[aria-label="Send without a note"]',
    addMessageButton: 'button[aria-label="Add a note"]',
    inviteHeaderMsg: '.artdeco-modal h2#send-invite-modal',
    name: '.entity-result__title-line--2-lines > span > a > span > span:nth-child(1)',
  },
  nextPage: {
    button: 'button[aria-label="Next"]',
  },
  skills: {
    skillButton: '.pv2', button: 'button'
  }
};

async function login() {
  try {
    await page.goto('https://linkedin.com/login');
    await page.type(selectors.loginForm.username, LINKEDIN_LOGIN, {delay: 100});
    await page.type(selectors.loginForm.password, LINKEDIN_PASSWORD, {delay: 100});
    await Promise.all([page.click(selectors.loginForm.submit), page.waitForNavigation(),]);
    console.log('Logged in successfully');
  } catch (err) {
    console.error('Error while logging in:', err);
  }
}

async function finish() {
  console.log('Finish');
  console.log(`${LOOKED_PROFILES}: LOOKED_PROFILES`);
  console.log(`${CLICKED_PROFILES}: CLICKED_PROFILES`);
  await fs.appendFile('log.txt', `Finish at ${new Date().toLocaleString()}\n${LOOKED_PROFILES}: LOOKED_PROFILES\n${CLICKED_PROFILES}: CLICKED_PROFILES\n`, (err) => {
    if (err) throw err;
    console.log('Messages written to log file!');
  });
  await browser.close();
}

async function connectPerson(card) {
  try {
    const subtitle = await card.$eval(selectors.searchResults.subtitle, element => element.textContent.trim());
    let connectBtn
    try {
      connectBtn = await card.waitForSelector(selectors.searchResults.connectButton);
    } catch (error) {
      console.log('Button not found:', error);
      connectBtn = null
    }
    const buttonText = await connectBtn?.evaluate(btn => btn.textContent.trim());
    console.log(buttonText, `: text on button`)
    if (buttonText.includes('Connect')) {
      console.log(subtitle, `: position(subtitle)`)

      await connectBtn?.click();
      if (SHOULD_ADD_MESSAGE) {
        const name = await card.$eval(selectors.searchResults.name, element => element.textContent.trim().split(' ')[0])
        const addMessageBtn = await page.waitForSelector(selectors.searchResults.addMessageButton);
        await addMessageBtn.click();
        const msg = getConnectionMessage(name)
        console.log(`writing this message to ${name}: ${msg}`)
        await page.type('textarea', msg, {delay: 100});
      }
      const sendBtn = await page.waitForSelector(selectors.searchResults.sendButton);
      await sendBtn.click();
      await randomTimeout();


      CLICKED_PROFILES += 1;
      console.log('Connected');
      await randomTimeout();
    }
  } catch (err) {
    console.error('Error while connecting to a person:', err);
  }
}

async function connectPeople() {
  try {
    await page.waitForSelector(selectors.searchResults.item);
    const cards = await page.$$(selectors.searchResults.item);
    LOOKED_PROFILES += cards.length;
    console.log(`${cards.length}: cards.length`);
    for (const card of cards) {
      await connectPerson(card);
      if (CLICKED_PROFILES >= MAX_CLICKED_PROFILES) {
        break;
      }
    }
  } catch (err) {
    console.error('Error while connecting to people:', err);
  }
}

async function goNext() {
  try {
    console.log(`try to go next page`)
    const nextBtn = await page.waitForSelector(selectors.nextPage.button, {visible: true});
    await Promise.all([page.waitForNavigation(), nextBtn.click(),]);
    await randomTimeout();
    console.log('Next page successfully');
  } catch (err) {
    console.error('Error while going to the next page:', err);
  }
}

async function start() {
  try {
    await page.setViewport({width: 1080, height: 1024});
    await page.goto('https://www.linkedin.com/feed/');
    if (!(await page.title()).includes('Feed')) await login(); else {
      console.log('login successfully')
    }
    await page.goto(SEARCH_URL);
    await saveCookies(page, saveCookiesPath);
    // await increaseSkills()
    for (let i = 0; i < MAX_PAGE; i++) {
      await scrollDown();
      await connectPeople();
      if (MAX_CLICKED_PROFILES > CLICKED_PROFILES) await goNext();
      else break;
    }
    await finish()
  } catch (err) {
    console.error('Error while starting the program:', err);
  }
}

async function scrollDown() {
  try {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        let distance = 100;
        let timer = setInterval(() => {
          let scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  } catch (err) {
    console.error('Error while scrolling down:', err);
  }
}


start()


