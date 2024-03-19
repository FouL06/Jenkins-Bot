require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.username} is online`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value,
      num2 = interaction.options.get("second-number").value;

    interaction.reply("The sum is " + (num1 + num2));
  }

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("This is an embed")
      .setColor("Random")
      .addFields({ name: "Field Title", value: "Field value", inline: true });

    interaction.reply({ embeds: [embed] });
  }
});

client.on("messageCreate", (msg) => {
  if (msg.content === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("This is an embed")
      .setColor("Random")
      .addFields({ name: "Field Title", value: "Field value", inline: true });

    msg.channel.send({ embeds: [embed] });
  }
});

client.login(process.env.DISCORD_TOKEN);
