const fs = require("node:fs");
const path = require("node:path");

module.exports = (client) => {
  const foldersPath = path.join(__dirname, "../", "events");
  const eventFolders = fs.readdirSync(foldersPath);

  for (const folder of eventFolders) {
    const eventsPath = path.join(foldersPath, folder);
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);

      const eventType = event.type;

      switch (eventType) {
        case "Player":
          // TODO: Migrate event logic to separate player event files
          client.player.events.on("playerStart", (queue, track) => {
            // we will later define queue.metadata object while creating the queue
            queue.metadata.channel.send(`Started playing **${track.title}**!`);
          });

          client.player.events.on("playerPause", (queue) => {
            // we will later define queue.metadata object while creating the queue
            queue.metadata.channel.send("Playback Paused");
          });

          client.player.events.on("disconnect", (queue) => {
            // Emitted when the bot leaves the voice channel
            queue.metadata.send("Looks like my job here is done, leaving now!");
          });
          client.player.events.on("emptyChannel", (queue) => {
            // Emitted when the voice channel has been empty for the set threshold
            // Bot will automatically leave the voice channel with this event
            queue.metadata.send(
              `Leaving because no vc activity for the past 5 minutes`
            );
          });
          client.player.events.on("emptyQueue", (queue) => {
            // Emitted when the player queue has finished
            queue.metadata.send("Queue finished!");
          });
          break;
        case "Client":
        default:
          if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
          } else {
            client.on(event.name, (...args) => event.execute(...args));

            client.on("disconnect", function(erMsg, code) {
              console.log(
                "----- Bot disconnected from Discord with code",
                code,
                "for reason:",
                erMsg,
                "-----"
              );
              client.connect();
            });
          }
          break;
      }
    }
  }
};
