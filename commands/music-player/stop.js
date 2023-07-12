const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  category: "music-player",
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("stop the song!"),
  async execute(interaction) {
    await interaction.reply("stop this song!");
  },
};
