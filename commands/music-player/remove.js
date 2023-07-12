const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  category: "music-player",
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Remove song from the current queue")
    .addIntegerOption((option) =>
      option.setName("position").setDescription("Enter the track position")
    ),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    const position = interaction.options.getInteger("position");
    const track = queue.tracks.toArray()[position];

    queue.removeTrack(position - 1);

    return interaction.reply(`Removing ${track.title} from the queue`);
  },
};
