const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  category: "music-player",
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play the song!")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Gimme the song name")
        .setRequired(true)
    ),
  async execute(interaction) {
    const channel = interaction.member.voice.channel;
    const player = interaction.client.player;

    if (!channel) {
      return interaction.reply("You are not connected to a voice channel!");
    }
    const query = interaction.options.getString("query", true);

    // let's defer the interaction as things can take time to process
    await interaction.deferReply();

    try {
      const { track } = await player.play(channel, query, {
        nodeOptions: {
          // nodeOptions are the options for guild node (aka your queue in simple word)
          metadata: interaction,
        },
      });

      return interaction.followUp(`**${track.title}** enqueued!`);
    } catch (e) {
      // let's return error if something failed
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
