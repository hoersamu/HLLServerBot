(function() {
    /**
     * Help-Command
     */
    exports.PrefixCommand = class PrefixCommand {

        constructor(cache) {
            this.cache = cache;
        }

        handle(message) {
            let char = message.content.split(' ')[1]
            if(char.length!=1) {
                message.channel.send("Invalid char");
                return;
            }
            this.cache.updatePrefix(char,message.guild.id);
            message.channel.send(`Successfully changed prefix to ${char}`);
            try {
                message.delete();
            } catch (error) {
                console.error("Can't delete message");
            }
        }
    }
})();