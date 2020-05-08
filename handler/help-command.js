(function() {
    const Discord = require('discord.js');
    /**
     * Help-Command
     */
    exports.HelpCommand = class HelpCommand {

        constructor(imageLoader) {
            this.attachment = imageLoader.getLogoAttachment();
        }

        handle(message) {
            let helpmsg = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Mögliche Befehle')
                .attachFiles(this.attachment)
                .setThumbnail('attachment://logo.png')
                .addField('server: ', 'displays serverstatus')
                .addField('map','Creates a mapvote')
                .addField('prefix #','changes the prefix to another char')
                .addField('setServer ip:port','changes or sets the server address')
                .addField('setTag tag','changes or sets the clan tag')
                .setTimestamp()
                .setFooter('https://91pzg.de', 'attachment://logo.png');
            message.channel.send(helpmsg).then(msg => {
                msg.delete({timeout:10000})
            });
            try {
                message.delete();
            } catch (error) {
                console.error("Can't delete message");
            }
        }
    }
})();