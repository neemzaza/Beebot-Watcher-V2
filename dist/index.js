"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rest = exports.commands = void 0;
require('dotenv').config();
const discord_js_1 = require("discord.js");
const botconfig_json_1 = require("./botconfig.json");
const rest_1 = require("@discordjs/rest");
const distube_1 = require("distube");
// import * as leaveEvent from "./command/leaveEvent"
// import "./about"
const builders_1 = require("@discordjs/builders");
require("./music");
const server_1 = __importDefault(require("./server"));
// const token:any = process.env.TOKEN
// Update bot use => "a!updateEventGuildIdEachGuildByMsg!a"
const commands = [
    // About user and server
    new builders_1.SlashCommandBuilder()
        .setName("about")
        .setDescription("use /about to see a full description")
        .addSubcommand(subcmd => subcmd
        .setName("yourself")
        .setDescription("About your discord account")
        .addUserOption(option => option.setName('target').setDescription("This user")))
        .addSubcommand(subcmd => subcmd
        .setName("server")
        .setDescription("About this guild")),
    new builders_1.SlashCommandBuilder()
        .setName("yt")
        .setDescription("View airwavy's youtube channel"),
    new builders_1.SlashCommandBuilder()
        .setName("birthday")
        .setDescription("Happy birthday!!!"),
    new builders_1.SlashCommandBuilder()
        .setName("help")
        .setDescription("use /help to view all commands available")
];
exports.commands = commands;
// @ts-ignore
const mySecret = process.env['TOKEN'];
const rest = new rest_1.REST({ version: '9' }).setToken(mySecret);
exports.rest = rest;
const whoBirthday = "Thun";
const date = new Date();
const intents = ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_VOICE_STATES", "GUILD_INTEGRATIONS"];
const client = new discord_js_1.Client({ intents: intents });
(() => __awaiter(void 0, void 0, void 0, function* () {
    // client.user?.setPresence({ activities: [{ name: 'together' }], status: 'invisible' })
    const distube = new distube_1.DisTube(client, { searchSongs: 0, searchCooldown: 30, leaveOnEmpty: true, emptyCooldown: 0, leaveOnFinish: true, leaveOnStop: true });
    client.on("guildMemberRemove", member => {
        var _a;
        const avatar = (_a = member.user) === null || _a === void 0 ? void 0 : _a.avatarURL();
        const channel = client.channels.cache.get("886952139933483009");
        if (!channel)
            return;
        const embed = new discord_js_1.MessageEmbed()
            .setColor("RED")
            .setTitle(`${member.displayName} has left the server`)
            .setThumbnail(avatar);
        channel.send({ embeds: [embed] });
    });
    client.on('ready', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        distube.setMaxListeners(0);
        let allGuildId = client.guilds.cache.map(guild => guild.id);
        console.log(allGuildId);
        (_a = client.user) === null || _a === void 0 ? void 0 : _a.setActivity("คำถามของคุณ", { type: "LISTENING", url: "https://it-airwavy.ml/" });
    }));
    // Detect @everyone and @here
    client.on('messageCreate', (msg) => {
        var _a, _b;
        let role = msg.guild.roles.cache.find((r) => r.id === "905997597234307162");
        let person = msg.member;
        let message = msg.content.toLowerCase();
        let word = ["@everyone", "@here"];
        const staffRoom = client.channels.cache.get("873030186952691794");
        const embed = new discord_js_1.MessageEmbed()
            .setColor("RED")
            .setTitle(`รายงานครับท่าน - พบการใช้ tag "Everyone หรือ Here"`)
            .setDescription(`สมาชิกชื่อ : ${person.user.username}#${person.user.discriminator}\nเขานั้นได้ทำการ tag "Everyone" หรือ "Here" ตอนนี้ผมได้ทำการลบข้อความนั้นและตักเตือนเขาไปแล้ว`)
            .setAuthor(`REPORT - BEE BOT RETURN`)
            .setTimestamp(new Date());
        if (msg.member.roles.cache.some((role) => role.id === "873035682992513085"))
            return;
        for (let i = 0; i < word.length; i++) {
            if (message.includes(word[i])) {
                if (((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id) === "873030042412797972" || ((_b = msg.guild) === null || _b === void 0 ? void 0 : _b.id) === "841924507261468702") {
                    msg.delete();
                    msg.author.send("พบการแท็ก Everyone หรือ Here นะครับ ตรวจสอบให้แน่ใจว่าได้ไปกดลิงค์อะไรแปลกๆ ป่าว ถ้าคุณไม่ได้จงใจ แสดงว่าคุณนั้น **โดนแฮ็กแล้วครับ**");
                    staffRoom.send({ embeds: [embed] });
                    // console.log(person)
                }
            }
        }
    });
    const maintaince = false;
    client.on('messageCreate', (msg) => {
        var _a, _b;
        if (msg.author.bot)
            return;
        let message = msg.content.toLowerCase();
        let word = ["unable to connect to world", "online-mode", "paper กับ spigot", "spigot กับ paper", "เซิฟหน่วง", "ขึ้นข้อความแดงบนหน้า console", "geyser-java16", "เปลี่ยนไปใช้ zerotier"];
        // for (let i = 0; i < word.length; i++) {
        if (!maintaince ? ((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id) === "873030042412797972" : null || ((_b = msg.guild) === null || _b === void 0 ? void 0 : _b.id) === "841924507261468702") {
            if (message.includes(word[0])) {
                msg.reply("ลองดูคลิปนี้! https://youtu.be/KBnUjWcz9Ds");
            }
            else if (message.includes(word[1])) {
                msg.reply("ใน server.properties ตรง online-mode ถ้าอยากให้มายคราฟไอดีแท้เข้าอย่างเดียวให้ปรับเป็น true นะ ส่วนถ้าอยากให้ทั้งแท้และไม่แท้เข้าให้ปรับเป็น false");
            }
            else if (message.includes(word[2]) || message.includes(word[3])) {
                msg.reply("paper จะดัดแปลงจาก spigot อีกที ซึ่งมันจะแก้ไขบัคบางอย่างที่มีใน minecraft ด้วย!");
            }
            else if (message.includes(word[4])) {
                msg.reply("ลองเพิ่มแรมที่ตัว run.bat ดูนะ โดยไปแก้ไขตรง -Xms1024M ถ้าแรมเครื่องคุณ 8GB แนะนำให้เพิ่มต่อหลัง -Xm...24M เป็น -Xmx5G ครับ หรือถ้าแรมมากกว่า 8GB ก็ให้ปรับตามความเหมาะสม!");
            }
            else if (message.includes(word[5])) {
                msg.reply("ไม่ต้องตกใจ! มันเกิดจากการที่เซิฟไม่ตอบสนองหรือเซิฟค้างชั่วขณะเท่านั้น ลองไปเพิ่มแรมอาจจะหายดี");
            }
            else if (message.includes(word[6])) {
                msg.reply("ลองดูคลิปนี้! https://youtu.be/qunb4jfbNIE");
            }
            else if (message.includes(word[7])) {
                msg.reply("ลองดูคลิปนี้! https://youtu.be/gxryiAMUDmI");
            }
        }
        // }
    });
    // client.on("messageCreate", async (msg: any) => {
    //   const guildId: any = msg.guild?.id
    //   const prefix = '$'
    //   const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    //   const command = args.shift()
    //   if (msg.content === "a!updateEventGuildIdEachGuildByMsg!a") {
    //     try {
    //       await rest.put(
    //         Routes.applicationGuildCommands(clientId, guildId), //'844398657071480872'
    //         { body: commands }
    //       )
    //       console.log(`Logged into ${msg.guild?.name} as ${client.user?.tag}`);
    //     } catch (err) {
    //       console.log("Found error! " + err);
    //     }
    //   }
    //   if (msg.author.bot) return
    //   if (!msg.content.startsWith(prefix)) return
    //   if (["play", "p"].includes(command)) {
    //     if (!msg.member?.voice.channel) return msg.channel.send("คุณไม่ได้อยู่ในห้องเสียงไหนเลยนะ?");
    //     if (!args[0]) return msg.channel.send("เว้นวรรคแล้วใส่ชื่อเพลงด้วย!");
    //     distube.play(msg, args.join(" "))
    //   }
    //   if (command === "stop") {
    //     const bot = msg.guild?.members.cache.get(client.user?.id!)
    //     if (!msg.member?.voice.channel) return msg.channel.send("คุณไม่ได้อยู่ในห้องเสียงไหนเลยนะ?");
    //     if (bot?.voice.channel !== msg.member?.voice.channel) return msg.channel.send('คุณไม่ได้อยู่ที่เดียวกับบอทนะ')
    //     distube.stop(msg)
    //     msg.channel.send('คุณได้หยุดเพลงเรียบร้อย!')
    //   }
    //   if (command === "queue") {
    //     const queue: any = distube.getQueue(msg)
    //     if (!queue) {
    //       return msg.channel.send("ในคิวไม่มีเพลงอยู่เลยนะ")
    //     }
    //     msg.channel.send('คิวตอนนี้:\n' + queue.songs.map((song: { name: string; url: string; formattedDuration: any; }, id: number) =>
    //       `**${id + 1}**. [${song.name}](${song.url}) ความยาว \`${song.formattedDuration}\``
    //     ).join("\n"));
    //   }
    //   if (command === "loop" || command === "l") {
    //     const mode = distube.setRepeatMode(msg)
    //     const queue: any = distube.getQueue(msg)
    //     if (!queue) return msg.channel.send("ในคิวไม่มีเพลงอยู่เลยนะ")
    //     msg.channel.send(`เปิดโหมดการ วนเพลงเป็น \`${mode ? mode === 2 ? 'ทุกคิว' : 'วนแค่เพลงนี้' : 'ปิดอยู่'}\``)
    //   }
    //   if (command === "skip" || command === "sk") {
    //     const queue: any = distube.getQueue(msg)
    //     if (!queue) {
    //       return msg.channel.send("ในคิวไม่มีเพลงอยู่เลยนะ จะข้ามไปไหน?")
    //     }
    //     distube.skip(msg)
    //   }
    //   if (command === "volume" || command === "vol") {
    //     if (!args[0]) return msg.reply("กลับไปใส่ระดับเสียงซะ...")
    //     distube.setVolume(msg, parseInt(args[0]))
    //     msg.channel.send(`ปรับระดับเสียงเพลงให้้เป็น ${args[0]} แล้วครับ`)
    //   }
    // })
    // const status = (queue: Queue) =>
    //   `ความดัง: \`${queue.volume}%\` | ออโต้จูนเสียง: \`${queue.filters.join(', ')
    //   || 'ปิดอยู่'}\` | วนไหม?: \`${queue.repeatMode
    //     ? queue.repeatMode === 2
    //       ? 'All Queue'
    //       : 'This Song'
    //     : 'ปิดอยู่'
    //   }\` | เล่นเองไหม?: \`${queue.autoplay ? 'On' : 'Off'}\``
    // // DisTube event listeners, more in the documentation page
    // distube
    //   .on('playSong', (queue: any, song) =>
    //     queue.textChannel.send(
    //       `กำลังเปิดเพลง \`${song.name}\` ความยาวเพลง \`${song.formattedDuration
    //       }\`\nโดนสั่งโดย by: ${song.user}\n${status(queue)}`,
    //     ))
    //   .on('addSong', (queue: any, song) =>
    //     queue.textChannel.send(
    //       `เพิ่มเพลง ${song.name} - \`${song.formattedDuration}\` ไปยังรายการเปิดเพลง โดย ${song.user}`,
    //     ))
    //   .on('addList', (queue: any, playlist) =>
    //     queue.textChannel.send(
    //       `เพิ่มรายการเพลง \`${playlist.name}\` จำนวน (${playlist.songs.length
    //       } songs) ไปยังรายการเปิดเพลง\n${status(queue)}`,
    //     ))
    //   // DisTubeOptions.searchSongs = true
    //   .on('searchResult', (message, result) => {
    //     let i = 0
    //     message.channel.send(
    //       `**Choose an option from below**\n${result
    //         .map(
    //           song =>
    //             `**${++i}**. ${song.name} - \`${song.formattedDuration
    //             }\``,
    //         )
    //         .join(
    //           '\n',
    //         )}\n*Enter anything else or wait 30 seconds to cancel*`,
    //     )
    //   })
    //   .on('searchCancel', (message: any) => message.channel.send(`การค้นหา ถูกหยุด`))
    //   .on('searchInvalidAnswer', (message: any) =>
    //     message.channel.send(`searchInvalidAnswer`))
    //   .on('searchNoResult', (message: any) => message.channel.send(`ไม่เจออ่ะ`))
    //   .on('error', (textChannel, e: any) => {
    //     console.error(e)
    //     textChannel.send(`An error encountered: ${e.slice(0, 2000)}`)
    //   })
    //   .on('finish', (queue: any) => queue.textChannel.send('หมดคิวละไปนอนต่อละ'))
    //   .on('finishSong', (queue: any) => queue.textChannel.send('เพลงจบไปแล้ว 1'))
    //   .on('disconnect', (queue: any) => queue.textChannel.send('ไปละ'))
    //   .on('empty', (queue: any) => queue.textChannel.send('Empty!'))
    client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c;
        const channel = client.channels.cache.get("887156603302871110");
        const embed = new discord_js_1.MessageEmbed()
            .setColor('#fff')
            .setTitle(`Happy birthday! ${whoBirthday} 14/9/2021!`)
            .setDescription(`สุขสันต์วันเกิด ${whoBirthday} ขอให้เป็นวันที่ดี มีความสุข แข็ง และอย่าเอา Tom & Jerry ตรูไปทำแบบนนั้นอีก -_-`)
            .setImage("https://cdn.discordapp.com/attachments/841924507261468704/886842358866534491/happybirththun2021.jpg")
            .setTimestamp(new Date().setFullYear(new Date().getFullYear(), botconfig_json_1.birthday.month - 1, botconfig_json_1.birthday.date))
            .addFields({ name: "ชื่อ", value: whoBirthday }, { name: "บุคลิก", value: "หน้าตูด" });
        const embedhelp = new discord_js_1.MessageEmbed()
            .setColor('#fff')
            .setTitle(`Help Center - All commands`)
            .addFields({
            name: "Music bot",
            value: "$play เว้นวรรคตามด้วยชื่อเพลงเพื่อเล่น\n$skip เพื่อข้าม\n$stop เพื่อหยุดเพลง\n $queue เพื่อดูลำดับการเปิดเพลง\n$volume เว้นวรรคตามด้วยระดับเสียงเพืื่อปรับระดับเสียงเพลง\n$loop เพืื่อวนเพลงมี 3 โหมด วิธีเลือกให้ใช้คำสั่งนี้ซ้ำมันจะบอกโหมดที่เราใช้อยู่"
        });
        const row = new discord_js_1.MessageActionRow()
            .addComponents(new discord_js_1.MessageButton()
            .setCustomId('primary')
            .setLabel('Subscribe')
            .setStyle('DANGER'));
        if (!interaction.isCommand())
            return;
        if (interaction.commandName === 'help') {
            return interaction.reply({ embeds: [embedhelp], ephemeral: true });
        }
        // WIP
        if (interaction.channel !== channel) {
            interaction.reply({ content: "You not have permission to access this channel (รอหน่อยเดี๋ยวเปิดให้ใช้กันแล้ว)", ephemeral: true });
            return;
        }
        if (interaction.commandName === 'yt') {
            interaction.reply({ content: 'Subscribe Please', components: [row] });
        }
        if (interaction.commandName === 'about') {
            if (interaction.options.getSubcommand() === "yourself") {
                const user = interaction.options.getUser('target');
                if (user) {
                    yield interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
                }
                else {
                    yield interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
                }
            }
            else if (interaction.options.getSubcommand() === "server") {
                yield interaction.reply(`Server name: ${(_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.name}\nTotal members: ${(_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.memberCount}`);
            }
            else if (!interaction.options.getSubcommand()) {
                yield interaction.reply("usage: /about <command>\n\tyourself, server");
            }
        }
    }));
    (0, server_1.default)();
    client.login(mySecret);
}))();
exports.default = client;
