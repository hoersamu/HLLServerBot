(function() {
    exports.MessageHandler = class MessageHandler {

        constructor(commandHandlerFactory,cache) {
            this.commandHandlerFactory = commandHandlerFactory;
            this.cache = cache;
            this.messageRegistry = {
                help: this.commandHandlerFactory.createHelpCommandHandler(),
                ping: this.commandHandlerFactory.createPingCommandHandler(),
                server: this.commandHandlerFactory.createServerCommandHandler(),
                //map: this.commandHandlerFactory.createMapCommandHandler(),
                prefix: this.commandHandlerFactory.createPrefixCommandHandler(),
                setserver: this.commandHandlerFactory.createSetServerCommandHandler(),
                settag: this.commandHandlerFactory.createSetTagCommandHandler()
            };
        }

        async notify(message) {
            if (!message.content.startsWith(await this.cache.getPrefix(message.guild.id))) {
                return;
            }
            const cmd = message.content.substring(1).toLowerCase().split(' ')[0];
            if (!cmd) {
                return;
            }
            const handler = this.messageRegistry[cmd];
            if (!handler) {
                message.channel.send('Invalid Command!').then(msg => { msg.delete({timeout:10000}) });
                message.delete();
                return;
            }
            handler.handle(message);
        }
    }
})();