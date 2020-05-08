(function () {
    const Discord = require("discord.js");

    exports.MapCommand = class MapCommand {

        constructor(imageLoader, config) {
            this.imageLoader = imageLoader;
            this.emojis = config.emojis();
        }

        handle(message) {
           let attachment = this.imageLoader.getLogoAttachment();
            let mapvote = new Discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Mapvote")
                .attachFiles(attachment)
                .setThumbnail("attachment://logo.png")
                .setTimestamp()
                .setDescription([
                    "Sainte-Marie-du-Mont: " + this.emojis.stMarieDuMont,
                    "Hurtgen Forest: " + this.emojis.hurtgenForest,
                    "Foy: " + this.emojis.foy,
                    "Utah Beach: " + this.emojis.utahBeach,
                    "Omaha Beach: " + this.emojis.omahaBeach,
                    "Sainte-Mère-Église: " + this.emojis.sainteMereEglise,
                    "Purple Heart Lane: " + this.emojis.purpleHeart,
                    "Hill 400: " + this.emojis.hill
                ].join('\n'));
            message.channel.send(mapvote).then(async msg => {
                await msg.react(this.emojis.stMarieDuMont);
                await msg.react(this.emojis.hurtgenForest);
                await msg.react(this.emojis.foy);
                await msg.react(this.emojis.utahBeach);
                await msg.react(this.emojis.omahaBeach);
                await msg.react(this.emojis.sainteMereEglise);
                await msg.react(this.emojis.purpleHeart);
                await msg.react(this.emojis.hill);
            });
            try {
                message.delete();
            } catch (error) {
                console.error("Can't delete message");
            }
        }
    }
})();