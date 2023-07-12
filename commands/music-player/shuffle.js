const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  category: "music-player",
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffle the queue!"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    queue.tracks.shuffle();

    return interaction.reply("Shuffled Queue");
  },
};
