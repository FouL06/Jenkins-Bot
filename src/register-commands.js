require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "add",
    description: "adds to numbers.",
    options: [
      {
        name: "first-number",
        description: "first num",
        type: ApplicationCommandOptionType.Number,
        choices: [
          {
            name: "one",
            value: 1,
          },
          {
            name: "two",
            value: 2,
          },
        ],
        required: true,
      },
      {
        name: "second-number",
        description: "second num",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "embed",
    description: "sends and embed...",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registering commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID,
        process.env.DISCORD_SERVER_ID
      ),
      {
        body: commands,
      }
    );

    console.log("Commands were registered successfully...");
  } catch (error) {
    console.log(error);
  }
})();
