(function () {
    /**
     * Help-Command
     */
    exports.SetTagCommand = class SetTagCommand {

        constructor(cache) {
            this.cache = cache;
        }

        handle(message) {
            let tag = message.content.split(' ')[1]
            this.cache.updateTag(tag, message.guild.id);
            message.channel.send(`Successfully changed clan tag to ${tag}`);
            try {
                message.delete();
            } catch (error) {
                console.error("Can't delete message");
            }
        }
    }
})();