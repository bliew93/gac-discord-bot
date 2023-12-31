const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  category: "music-player",
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("skip the song!"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    queue.node.skip();

    return interaction.reply("Skipping current track");
  },
};
