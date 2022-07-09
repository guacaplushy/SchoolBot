import { Event } from "../types.js";
import { spam } from "../data.js";
import { MessageEmbed } from "discord.js";

export default {
    name: "messageDelete",
    execute: async (client, message) => {
        if (message.channel.type == 'DM' || message.author?.bot) return;
        const embed = new MessageEmbed();
        if (message.mentions.everyone) {
            embed.setTitle(`${message.member?.displayName} ghost pinged everyone!`);
            embed.setColor("#ff0000");
            embed.setTimestamp();
        } else if ((message.mentions.members?.size as number) == 1) {
            embed.setTitle(`${message.member?.displayName} ghost pinged ${message.mentions.members?.first()?.displayName}!`);
            embed.setColor("#ff0000");
            embed.setTimestamp();
        } else if ((message.mentions.members?.size as number) > 1) {
            embed.setTitle(`${message.member?.displayName} ghost pinged ${message.mentions.members?.size} people!`);
            let pinged : string[] = [];
            message.mentions.members?.forEach(async member => {
                if (!member.user.bot) pinged.push(`<@!${member.user.id}>`);
            });
            embed.addField("Users", pinged.join(', '));
            embed.setColor("#ff0000");
            embed.setTimestamp();
        } else {
            let messageAttachment: string | undefined = message.attachments.size > 0 ? message.attachments.first()?.url : undefined;
            embed.setTitle(`${message.member?.displayName} deleted a message in #${message.channel.name}!`);
            embed.addField("Content", message.content ? message.content : "Image/Embed");
            embed.setColor("#ff0000");
            embed.setTimestamp();
            if (messageAttachment) embed.setImage(messageAttachment);
        }
        await spam.send({ embeds: [embed] });
    }
} as Event<"messageDelete">;