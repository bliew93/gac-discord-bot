const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  category: "music-player",
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("skip the song!"),
  async execute(interaction) {
    await interaction.reply("skip this song!");
  },
};
