const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { request } = require('undici');


const SHEET_ID = process.env.SHEET_ID;
const TRUTH_SHEET_URL = "/Truth";
const DARE_SHEET_URL = "/Dare";

const API_ENDPOINT = "https://opensheet.elk.sh/" + SHEET_ID;

var truthArr = [];
var dareArr = [];

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.on('ready', () => {
  update()
    .then(() => console.log(`Logged in as ${client.user.tag}!`))
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    const command = interaction.commandName;

    if (!command) return;

    try {
      if (command === 'truth') {
        await sendTord(interaction, "truth");
      }

      if (command === 'dare') {
        await sendTord(interaction, "dare");
      }

      if (command === 'random') {
        await sendTord(interaction, "random");
      }

      if (command === 'update') {
        await update()
          .then(await interaction.reply('Update complete'))
      }
    } catch (error) {
      await interaction.reply("There was an error executing this command");
    }
  } else if (interaction.isButton()) {
    const buttonType = interaction.customId;
    if (buttonType === "truth") {
      await sendTord(interaction, "truth");
    }
    if (buttonType === "dare") {
      await sendTord(interaction, "dare");
    }
    if (buttonType === "random") {
      await sendTord(interaction, "random");
    }
  }
});

client.login(process.env.TOKEN);


async function update() {
  const newTruth = await getList(TRUTH_SHEET_URL);
  const newDare = await getList(DARE_SHEET_URL);
  truthArr = newTruth;
  dareArr = newDare;
  console.log('update complete')
}

async function getList(sheetUrl) {
  return await request(API_ENDPOINT + sheetUrl)
  .then(res => res.body.json())
  .then(rows => {
    const arr = [];
    rows.forEach(row => {
      if (Object.keys(row).length !== 0) {
        arr.push(row.Question);
      }
    }
    );
    return arr;
  })
}

function makeEmbed(embedObj) {
  const author = embedObj.user.nickname? embedObj.user.nickname : embedObj.user.user.username;
  return new EmbedBuilder()
    .setAuthor({
      name: author,
      iconURL: embedObj.user.displayAvatarURL()
      })
    .setTitle(embedObj.content)
    .setDescription(embedObj.description)
}

function makeRow() {
  return new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('truth')
        .setLabel("💬 Truth")
        .setStyle(ButtonStyle.Success)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId('dare')
        .setLabel("😈 Dare")
        .setStyle(ButtonStyle.Danger)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId('random')
        .setLabel("🎲 Random")
        .setStyle(ButtonStyle.Primary)
    )
}

async function sendTord(interaction, type) {
  var tordType;
  if (type === "random") {
    tordType = Math.random() < 0.5 ? "truth" : "dare";
  } else {
    tordType = type;
  }

  const description = tordType === "truth" ? "Truth" : "Dare";
  const arr = tordType === "truth" ? truthArr : dareArr;

  const interactionUser = await interaction.guild.members.fetch(interaction.user.id);

  const embedObj = {
    user: interactionUser,
    description: description,
    content: arr[Math.floor(Math.random() * arr.length)]
  }

  interaction.reply({
    embeds: [makeEmbed(embedObj)],
    components: [makeRow()]
  })
}
