require('dotenv').config();
import { Client, Intents, Message, MessageActionRow, MessageButton, MessageEmbed, TextChannel } from "discord.js";
import { clientId, birthday, guildId } from "./botconfig.json"
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { DisTube, Queue } from "distube";
// import * as leaveEvent from "./command/leaveEvent"
// import "./about"
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders"

const distube = new DisTube(client, 
        { searchSongs: 0, searchCooldown: 30,leaveOnEmpty: true, emptyCooldown: 0,leaveOnFinish: true, leaveOnStop: true })

client.on("messageCreate", async (msg: any) => {
        const guildId: any = msg.guild?.id
        const prefix = '$'
        const args = msg.content.slice(prefix.length).trim().split(/ +/g)
        const command = args.shift()

        

        if (msg.content === "a!updateEventGuildIdEachGuildByMsg!a") {
            try {
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId), //'844398657071480872'
                    { body: commands }
                )
                console.log(`Logged into ${msg.guild?.name} as ${client.user?.tag}`);
            } catch (err) {
                console.log("Found error! " + err);
            }
        }
        if (msg.author.bot) return
        if (!msg.content.startsWith(prefix)) return

        if (["play", "p"].includes(command)) {
            if (!msg.member?.voice.channel) return msg.channel.send("คุณไม่ได้อยู่ในห้องเสียงไหนเลยนะ?");
            if (!args[0]) return msg.channel.send("เว้นวรรคแล้วใส่ชื่อเพลงด้วย!");

            distube.play(msg, args.join(" "))
        }
        if (command === "stop") {

            const bot = msg.guild?.members.cache.get(client.user?.id!)
            if (!msg.member?.voice.channel) return msg.channel.send("คุณไม่ได้อยู่ในห้องเสียงไหนเลยนะ?");
            if (bot?.voice.channel !== msg.member?.voice.channel) return msg.channel.send('คุณไม่ได้อยู่ที่เดียวกับบอทนะ')
            distube.stop(msg)
            msg.channel.send('คุณได้หยุดเพลงเรียบร้อย!')
        }
        if (command === "queue") {
            const queue: any = distube.getQueue(msg)

            if (!queue) {
                return msg.channel.send("ในคิวไม่มีเพลงอยู่เลยนะ")
            }
            msg.channel.send('คิวตอนนี้:\n' + queue.songs.map((song: { name: string; url: string; formattedDuration: any; }, id: number) =>
                `**${id + 1}**. [${song.name}](${song.url}) ความยาว \`${song.formattedDuration}\``
            ).join("\n"));

        }

        if (command === "loop" || command === "l") {
            const mode = distube.setRepeatMode(msg)
            const queue: any = distube.getQueue(msg)

            if (!queue) return msg.channel.send("ในคิวไม่มีเพลงอยู่เลยนะ")
            msg.channel.send(`เปิดโหมดการ วนเพลงเป็น \`${mode ? mode === 2 ? 'ทุกคิว' : 'วนแค่เพลงนี้' : 'ปิดอยู่'}\``)
        }

        if (command === "skip" || command === "sk") {
            const queue: any = distube.getQueue(msg)

            if (!queue) {
                return msg.channel.send("ในคิวไม่มีเพลงอยู่เลยนะ จะข้ามไปไหน?")
            }
            distube.skip(msg)
        }

        if (command === "volume" || command === "vol") {
            if (!args[0]) return msg.reply("กลับไปใส่ระดับเสียงซะ...")
            distube.setVolume(msg, parseInt(args[0]))
            msg.channel.send(`ปรับระดับเสียงเพลงให้้เป็น ${args[0]} แล้วครับ`)
        }
    })

    const status = (queue: Queue) => 
            `ความดัง: \`${queue.volume}%\` | ออโต้จูนเสียง: \`${queue.filters.join(', ')
            || 'ปิดอยู่'}\` | วนไหม?: \`${queue.repeatMode
                ? queue.repeatMode === 2
                    ? 'All Queue'
                    : 'This Song'
                : 'ปิดอยู่'
            }\` | เล่นเองไหม?: \`${queue.autoplay ? 'On' : 'Off'}\``

        // DisTube event listeners, more in the documentation page
        distube

            .on('playSong', (queue: any, song) =>
                queue.textChannel.send(
                    `กำลังเปิดเพลง \`${song.name}\` ความยาวเพลง \`${song.formattedDuration
                    }\`\nโดนสั่งโดย by: ${song.user}\n${status(queue)}`,
                ))

            .on('addSong', (queue: any, song) =>
                queue.textChannel.send(
                    `เพิ่มเพลง ${song.name} - \`${song.formattedDuration}\` ไปยังรายการเปิดเพลง โดย ${song.user}`,
                ))
                
            .on('addList', (queue: any, playlist) =>
                queue.textChannel.send(
                    `เพิ่มรายการเพลง \`${playlist.name}\` จำนวน (${playlist.songs.length
                    } songs) ไปยังรายการเปิดเพลง\n${status(queue)}`,
                ))
            // DisTubeOptions.searchSongs = true
            .on('searchResult', (message, result) => {
                let i = 0
                message.channel.send(
                    `**Choose an option from below**\n${result
                        .map(
                            song =>
                                `**${++i}**. ${song.name} - \`${song.formattedDuration
                                }\``,
                        )
                        .join(
                            '\n',
                        )}\n*Enter anything else or wait 30 seconds to cancel*`,
                )
            })
            .on('searchCancel', (message: any) => message.channel.send(`การค้นหา ถูกหยุด`))
            .on('searchInvalidAnswer', (message: any) =>
                message.channel.send(`searchInvalidAnswer`))
            .on('searchNoResult', (message: any) => message.channel.send(`ไม่เจออ่ะ`))
            .on('error', (textChannel, e: any) => {
                console.error(e)
                textChannel.send(`An error encountered: ${e.slice(0, 2000)}`)
            })
            
            .on('finish', (queue: any) => queue.textChannel.send('หมดคิวละไปนอนต่อละ'))
            .on('finishSong', (queue: any) => queue.textChannel.send('เพลงจบไปแล้ว 1'))
            .on('disconnect', (queue: any) => queue.textChannel.send('ไปละ'))
            .on('empty', (queue: any) => queue.textChannel.send('Empty!'))