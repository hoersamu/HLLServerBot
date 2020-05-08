(function () {
    const gamedig = require('gamedig');
    const Discord = require('discord.js');

    /**
     * Outputs server statistics
     * Theoretically fnished but could use a overhaul
     */
    exports.ServerCommand = class ServerCommand {

        constructor(imageLoader, cache) {
            this.imageLoader = imageLoader;
            this.cache = cache;
        }

        handle(message) {
            let server = await this.cache.getServer(message.guild.id);
            this.tag = await this.cache.getTag(message.guild.id);
            if (!server.port) {
                message.channel.send("No serverdata set. Try !help");
                return;
            }
            gamedig.query(server).then((state) => {
                //console.log(state)
                message.channel.send(this.createServerMessage(state));
            });
            try {
                message.delete();
            } catch (error) {
                console.error("Can't delete message");
            }
        }

        createServerMessage(state) {
            let attachments = [this.imageLoader.getLogoAttachment()];
            let mapname;
            switch (state.map.substring(0, 3).toLowerCase()) {
                case 'stm':
                    attachments.push(this.imageLoader.getStMarieDuMontAttachment());
                    mapname = "Sainte-Marie-du-Mont";
                    break;
                case 'foy':
                    attachments.push(this.imageLoader.getFoyAttachment());
                    mapname = "Foy";
                    break;
                case 'hur':
                    attachments.push(this.imageLoader.getHurtgenForestAttachment());
                    mapname = "Hurtgen Forest";
                    break;
                case 'oma':
                    attachments.push(this.imageLoader.getOmahaBeachAttachment());
                    mapname = "Omaha Beach";
                    break;
                case 'uta':
                    attachments.push(this.imageLoader.getUtahBeachAttachment());
                    mapname = "Utah Beach";
                    break;
                case 'sme':
                    attachments.push(this.imageLoader.getStMereEgliseAttachment());
                    mapname = "Sainte-Mère-Église";
                    break;
                case 'phl':
                    attachments.push(this.imageLoader.getPurpleHeartLaneAttachment());
                    mapname = "Purple Heart Lane";
                    break;
                case 'hil':
                    attachments.push(this.imageLoader.getHillAttachment());
                    mapname = "Hill 400";
                    break;
            }
            let serverem = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('91.PzG Server Status')
                .attachFiles(attachments)
                .setImage('attachment://map.png')
                .addField('Server Name: ', state.name)
                .addField('Players', `${Math.min(state.players.length, 100)} / 100`)
                .addField('Queue', `${Math.max(state.players.length - 100,0)} / 6`);
            //TODO: Filter names beginning with this.tag
                //if(this.tag!=0)
                //serverem.addField('Clanmember', state.players.filter(f => f.name != null).filter(f => f.name.).length + ' / ' + state.players.length)
            serverem.addField('IP', state.connect)
                .addField('Version', state.raw.version)
                .addField('Ping', state.ping)
                .addField('Map', mapname)
                .setThumbnail('attachment://logo.png')
                .setTimestamp()
                .setFooter('https://91pzg.de', 'attachment://logo.png');
            return serverem;
        }
    }
})();