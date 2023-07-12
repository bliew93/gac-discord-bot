const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  category: "music-player",
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("stop the queue!"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue) {
      return interaction.reply("Queue does not exist!");
    }

    queue.delete();

    return interaction.reply("Stopping the queue!");
  },
};
