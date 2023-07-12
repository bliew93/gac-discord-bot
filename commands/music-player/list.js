const { SlashCommandBuilder } = require("discord.js");
const { useQueue, useHistory } = require("discord-player");

module.exports = {
  category: "music-player",
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Show current queue"),
  async execute(interaction) {
    let response = "";

    const queue = useQueue(interaction.guild.id);
    const history = useHistory(interaction.guild.id);

    if (!queue) {
      interaction.reply("No queue! Play something!");
    }

    const tracks = queue.tracks.toArray().join("\n");
    const prevTracks = history.tracks.toArray().join("\n");
    const currentTrack = queue.currentTrack;

    if (prevTracks) {
      response += `**Previous Songs**\n${prevTracks}\n\n`;
    }

    response += `**Current Queue**\n${tracks}\n\n**Current Song**\n${currentTrack}`;

    return interaction.reply(response);
  },
};
