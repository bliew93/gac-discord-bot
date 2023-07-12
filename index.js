const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { Player } = require("discord-player");

const { token } = require("./config.json");
const eventLoader = require("./loaders/eventLoader");
const commandLoader = require("./loaders/commandLoader");

const client = new Client({
  intents: ["GuildVoiceStates", GatewayIntentBits.Guilds],
});

// this is the entrypoint for discord-player based application
const player = new Player(client);

client.commands = new Collection();
client.cooldowns = new Collection();
client.player = player;

// This method will load all the extractors from the @discord-player/extractor package
client.player.extractors.loadDefault();

commandLoader(client);
eventLoader(client, player);

client.login(token);
