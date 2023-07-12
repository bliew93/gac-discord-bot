const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  category: "music-player",
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("resume the song!"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    queue.node.setPaused(false);

    return interaction.reply("Resuming Playback");
  },
};
