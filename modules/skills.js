export async function increaseSkills(id = 'aleksandr-balin', limit = 100) {
  await page.goto(`https://www.linkedin.com/in/${id}/details/skills/`);
  await scrollDown();
  const buttons = await page.$$(selectors.skills.skillButton);
  console.log(`Number of buttons: ${buttons.length}`);
  let counter = 0;
  for (const btn of buttons) {
    const isDetached = await btn.evaluate(btn => !document.body.contains(btn));
    if (isDetached) {
      console.log('Button is detached from document. Skipping...');
      continue;
    }
    const text = await btn.evaluate(btn => btn.textContent.trim());
    console.log(`Button text: ${text}`);
    if (text === 'Endorse') {
      try {
        await btn.click();
        console.log(`Skill button has been clicked`);
        counter += 1;
        if (counter >= limit) {
          console.log(`Limit of skill clicks has been reached - break`);
          break;
        }
        await randomTimeout(5000);
      } catch (error) {
        console.log(`Error while clicking button: ${error}`);
      }
    }
  }
}
