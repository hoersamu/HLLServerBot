(function () {
    /**
     * Help-Command
     */
    exports.SetServerCommand = class SetServerCommand {

        constructor(cache) {
            this.cache = cache;
        }

        handle(message) {
            let address = message.content.split(' ')[1]
            if (!/^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]):[1-9][0-9]{3,5}$/.test(address)) {
                message.channel.send("Invalid address");
                return;
            }
            this.cache.updateServer(address, message.guild.id);
            message.channel.send(`Successfully changed server address to ${address}`);
            try {
                message.delete();
            } catch (error) {
                console.error("Can't delete message");
            }
        }
    }
})();