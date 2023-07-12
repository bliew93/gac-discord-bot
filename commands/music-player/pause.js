const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  category: "music-player",
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("pause the song!"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    queue.node.setPaused(true);

    return interaction.reply("Playback Paused");
  },
};
