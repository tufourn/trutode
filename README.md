# trút o đe
Truth-or-Dare Discord bot

## General info
This Discord bot uses [discord.js](https://github.com/discordjs/discord.js/) and [Ben Borgers' opensheet API](https://github.com/benborgers/opensheet) to read its list of questions off a Google sheet.

## Usage

### Step 1: Creating the Discord bot
Create your Discord bot and note down the Application and the bot's token.

### Step 2: Creating the Google sheet for list of questions
Create a google sheet with 2 sheets, ``Truth`` and ``Dare``. For each sheet, type in ``Question`` for the first row, then fill the column with your list of questions.
Share the sheet and note down its ID.

### Step 3: Creating the ``.env`` file 
Create a ``.env`` file with the following information:

```
APP_ID={{application_id}}
TOKEN={{bot_token}}
SHEET_ID={{google_sheet_id}} 
```

### Step 4: Running the bot
Install the required packages
```
npm i
```

Register the slash commands
```
npm run register
```

Start the bot
```
npm run start
```
