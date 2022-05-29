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
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const botconfig_json_1 = require("./botconfig.json");
const v9_1 = require("discord-api-types/v9");
const distube_1 = require("distube");
const distube = new distube_1.DisTube(client, { searchSongs: 0, searchCooldown: 30, leaveOnEmpty: true, emptyCooldown: 0, leaveOnFinish: true, leaveOnStop: true });
client.on("messageCreate", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const guildId = (_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id;
    const prefix = '$';
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    if (msg.content === "a!updateEventGuildIdEachGuildByMsg!a") {
        try {
            yield rest.put(v9_1.Routes.applicationGuildCommands(botconfig_json_1.clientId, guildId), //'844398657071480872'
            { body: commands });
            console.log(`Logged into ${(_b = msg.guild) === null || _b === void 0 ? void 0 : _b.name} as ${(_c = client.user) === null || _c === void 0 ? void 0 : _c.tag}`);
        }
        catch (err) {
            console.log("Found error! " + err);
        }
    }
    if (msg.author.bot)
        return;
    if (!msg.content.startsWith(prefix))
        return;
    if (["play", "p"].includes(command)) {
        if (!((_d = msg.member) === null || _d === void 0 ? void 0 : _d.voice.channel))
            return msg.channel.send("คุณไม่ได้อยู่ในห้องเสียงไหนเลยนะ?");
        if (!args[0])
            return msg.channel.send("เว้นวรรคแล้วใส่ชื่อเพลงด้วย!");
        distube.play(msg, args.join(" "));
    }
    if (command === "stop") {
        const bot = (_e = msg.guild) === null || _e === void 0 ? void 0 : _e.members.cache.get((_f = client.user) === null || _f === void 0 ? void 0 : _f.id);
        if (!((_g = msg.member) === null || _g === void 0 ? void 0 : _g.voice.channel))
            return msg.channel.send("คุณไม่ได้อยู่ในห้องเสียงไหนเลยนะ?");
        if ((bot === null || bot === void 0 ? void 0 : bot.voice.channel) !== ((_h = msg.member) === null || _h === void 0 ? void 0 : _h.voice.channel))
            return msg.channel.send('คุณไม่ได้อยู่ที่เดียวกับบอทนะ');
        distube.stop(msg);
        msg.channel.send('คุณได้หยุดเพลงเรียบร้อย!');
    }
    if (command === "queue") {
        const queue = distube.getQueue(msg);
        if (!queue) {
            return msg.channel.send("ในคิวไม่มีเพลงอยู่เลยนะ");
        }
        msg.channel.send('คิวตอนนี้:\n' + queue.songs.map((song, id) => `**${id + 1}**. [${song.name}](${song.url}) ความยาว \`${song.formattedDuration}\``).join("\n"));
    }
    if (command === "loop" || command === "l") {
        const mode = distube.setRepeatMode(msg);
        const queue = distube.getQueue(msg);
        if (!queue)
            return msg.channel.send("ในคิวไม่มีเพลงอยู่เลยนะ");
        msg.channel.send(`เปิดโหมดการ วนเพลงเป็น \`${mode ? mode === 2 ? 'ทุกคิว' : 'วนแค่เพลงนี้' : 'ปิดอยู่'}\``);
    }
    if (command === "skip" || command === "sk") {
        const queue = distube.getQueue(msg);
        if (!queue) {
            return msg.channel.send("ในคิวไม่มีเพลงอยู่เลยนะ จะข้ามไปไหน?");
        }
        distube.skip(msg);
    }
    if (command === "volume" || command === "vol") {
        if (!args[0])
            return msg.reply("กลับไปใส่ระดับเสียงซะ...");
        distube.setVolume(msg, parseInt(args[0]));
        msg.channel.send(`ปรับระดับเสียงเพลงให้้เป็น ${args[0]} แล้วครับ`);
    }
}));
const status = (queue) => `ความดัง: \`${queue.volume}%\` | ออโต้จูนเสียง: \`${queue.filters.join(', ')
    || 'ปิดอยู่'}\` | วนไหม?: \`${queue.repeatMode
    ? queue.repeatMode === 2
        ? 'All Queue'
        : 'This Song'
    : 'ปิดอยู่'}\` | เล่นเองไหม?: \`${queue.autoplay ? 'On' : 'Off'}\``;
// DisTube event listeners, more in the documentation page
distube
    .on('playSong', (queue, song) => queue.textChannel.send(`กำลังเปิดเพลง \`${song.name}\` ความยาวเพลง \`${song.formattedDuration}\`\nโดนสั่งโดย by: ${song.user}\n${status(queue)}`))
    .on('addSong', (queue, song) => queue.textChannel.send(`เพิ่มเพลง ${song.name} - \`${song.formattedDuration}\` ไปยังรายการเปิดเพลง โดย ${song.user}`))
    .on('addList', (queue, playlist) => queue.textChannel.send(`เพิ่มรายการเพลง \`${playlist.name}\` จำนวน (${playlist.songs.length} songs) ไปยังรายการเปิดเพลง\n${status(queue)}`))
    // DisTubeOptions.searchSongs = true
    .on('searchResult', (message, result) => {
    let i = 0;
    message.channel.send(`**Choose an option from below**\n${result
        .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
        .join('\n')}\n*Enter anything else or wait 30 seconds to cancel*`);
})
    .on('searchCancel', (message) => message.channel.send(`การค้นหา ถูกหยุด`))
    .on('searchInvalidAnswer', (message) => message.channel.send(`searchInvalidAnswer`))
    .on('searchNoResult', (message) => message.channel.send(`ไม่เจออ่ะ`))
    .on('error', (textChannel, e) => {
    console.error(e);
    textChannel.send(`An error encountered: ${e.slice(0, 2000)}`);
})
    .on('finish', (queue) => queue.textChannel.send('หมดคิวละไปนอนต่อละ'))
    .on('finishSong', (queue) => queue.textChannel.send('เพลงจบไปแล้ว 1'))
    .on('disconnect', (queue) => queue.textChannel.send('ไปละ'))
    .on('empty', (queue) => queue.textChannel.send('Empty!'));
