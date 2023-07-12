const { SlashCommandBuilder } = require("discord.js");
const { useHistory } = require("discord-player");

module.exports = {
  category: "music-player",
  data: new SlashCommandBuilder()
    .setName("back")
    .setDescription("back to previous song!"),
  async execute(interaction) {
    const history = useHistory(interaction.guild.id);
    await history.previous();

    return interaction.reply("Returning to previous song");
  },
};
