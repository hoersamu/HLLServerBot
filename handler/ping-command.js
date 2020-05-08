(function () {
    /**
     * Ping -> Pong
     */
    exports.PingCommand = class PingCommand {

        constructor() { }

        handle(message) {
            message.channel.send('pong').then(msg => {
                msg.delete({ timeout: 1000 });
            });
            try {
                message.delete();
            } catch (error) {
                console.error("Can't delete message");
            }
        }
    }
})();