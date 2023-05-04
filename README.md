# Readme.md

This script is designed to automate the process of sending connection requests to LinkedIn users who match a certain search query.

## Prerequisites
- Node.js installed
- LinkedIn account
- Puppeteer - Headless Chrome Node.js API

## Getting Started
1. Clone the repository
2. Set LINKEDIN language to English.
3. Install dependencies using `npm install` command.
4. Create a `.env` file and fill in the required values.
5. Set messages in `messages.js` file. Use `NAME` in messages. This will be replaced with name of your target. Every 
   time script choose 1 of message randomly
6. Run the script using `node index.js`.

## Configuration
The `.env` file should contain the following environment variables:
- `LINKEDIN_LOGIN`: The email address associated with the LinkedIn account
- `LINKEDIN_PASSWORD`: The password for the LinkedIn account
- `SEARCH_URL`: The URL of the search results page on LinkedIn
- `MAX_PAGE`: The maximum number of pages to scrape
- `TIMEOUT`: The maximum time (in milliseconds) to wait between requests
- `MAX_CLICKED_PROFILES`: The maximum number of profiles to send connection requests to
- `SHOULD_ADD_MESSAGE`: Whether to include a personalized message in connection requests

## How It Works
1. The script launches a Puppeteer-controlled headless browser and navigates to the LinkedIn login page.
2. The script logs in to the user's LinkedIn account using the provided credentials.
3. The script navigates to the search results page using the provided URL.
4. The script iterates over each profile on the page, sending a connection request to the user if they have a "Connect" button and, optionally, including a personalized message.
5. The script repeats this process for each subsequent page of search results until it reaches the maximum number of pages specified in the configuration.
6. Once the maximum number of profiles to send connection requests to has been reached, the script saves the cookies and closes the browser.
