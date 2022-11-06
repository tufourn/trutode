const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const commands = [
  {
    name: 'truth',
    description: 'truth',
  },
  {
    name: 'dare',
    description: 'dare',
  },
  {
    name: 'random',
    description: 'random',
  },
  {
    name: 'update',
    description: 'update',
  }
];

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.APP_ID), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();