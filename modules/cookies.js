import fs from "fs";

export async function saveCookies(page, filePath) {
  const cookies = await page.cookies();
  const cookiesJSON = JSON.stringify(cookies);
  await fs.promises.writeFile(filePath, cookiesJSON);
}


// Set up a function to load cookies from a file
export async function loadCookies(page, filePath) {
  const cookiesJSON = await fs.promises.readFile(filePath);
  const cookies = JSON.parse(cookiesJSON);
  await page.setCookie(...cookies);
}
