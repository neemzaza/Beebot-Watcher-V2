import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders"

const commands = [
  // About user and server
  new SlashCommandBuilder()
    .setName("about")
    .setDescription("use /about to see a full description")
    .addSubcommand(subcmd =>
      subcmd
        .setName("yourself")
        .setDescription("About your discord account")
        .addUserOption(option => option.setName('target').setDescription("This user"))
    )
    .addSubcommand(subcmd =>
      subcmd
        .setName("server")
        .setDescription("About this guild")
    ),
  new SlashCommandBuilder()
    .setName("yt")
    .setDescription("View airwavy's youtube channel"),

  new SlashCommandBuilder()
    .setName("birthday")
    .setDescription("Happy birthday!!!"),

  new SlashCommandBuilder()
    .setName("help")
    .setDescription("use /help to view all commands available"),

  new SlashCommandBuilder()
    .setName("play")
    .setDescription("use /play music or url to play that you requested")
    .addStringOption(option => 
      option.setName("music")
            .setDescription("You can get from Youtube URL or type name to search")
            .setRequired(true)
)
  ,


]

export { commands }