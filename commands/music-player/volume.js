const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  category: "music-player",
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Set volume of the player")
    .addIntegerOption((option) =>
      option
        .setName("volume")
        .setDescription("Set the volume")
        .setRequired(true)
    ),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    const volume = interaction.options.getInteger("volume");
    queue.node.setVolume(volume);

    return interaction.reply(`Setting volume to ${volume}`);
  },
};
