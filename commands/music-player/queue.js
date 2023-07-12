const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  category: "music-player",
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("queue the song!"),
  async execute(interaction) {
    await interaction.reply("queue this song!");
  },
};
