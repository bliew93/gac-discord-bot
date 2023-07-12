const { SlashCommandBuilder } = require("discord.js");
const { useQueue, useMainPlayer } = require("discord-player");

module.exports = {
  category: "music-player",
  data: new SlashCommandBuilder()
    .setName("insert")
    .setDescription("Insert song from the current queue")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Gimme the song name")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("position")
        .setDescription("Enter the track position")
        .setRequired(true)
    ),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    const player = useMainPlayer();

    const position = interaction.options.getInteger("position");
    const query = interaction.options.getString("query", true);

    const track = queue.tracks.toArray()[position];

    const searchResult = await player.search(query, {
      requestedBy: interaction.user,
    });
    queue.insertTrack(searchResult.tracks[0], position - 1);

    return interaction.reply(`Inserting ${track.title} from the queue`);
  },
};
