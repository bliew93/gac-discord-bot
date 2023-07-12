const fs = require("node:fs");
const path = require("node:path");

module.exports = (client) => {
  const eventsPath = path.join(__dirname, "../", "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));

      client.player.events.on('playerStart', (queue, track) => {
        // we will later define queue.metadata object while creating the queue
        queue.metadata.channel.send(`Started playing **${track.title}**!`);
    });
    }
  }
};
