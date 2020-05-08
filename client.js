(function () {
    const Discord = require('discord.js');
    // The name of the event which is emitted once the client is ready
    const clientOnReadyListenerName = 'ready';
    // The name of the event which is emitted once the client receives a message
    const clientOnMessageListenerName = 'message';
    // The name of the event which is emitted once the client is added to a guild
    const clientOnGuildCreateListenerName = 'guildCreate';
    // The name of the event which is emitted once the client is removed from a guild
    const clientOnGuildDeleteListenerName = 'guildDelete';
    // The maximum timeout we wait for the client to become ready
    const readyTimeout = 20000;
    exports.Client = class Client {

        constructor(secret,database) {
            this.secret = secret;
            this.database = database;
            this.publicMessageListeners = [];
            this.client = new Discord.Client();
        }

        /**
         * Handles the startup of the client by using login with the given token in this.settings.
         * Waits for readyTimeout msecs to become ready, otherwise it will fail.
         * When the client becomes ready, it will start behaving like an observer.
         */
        startUp() {
            return new Promise((resolve, reject) => {
                this.client.on(clientOnReadyListenerName, () => {
                    clearTimeout(this.readyTimeout);
                    this.startObservation();
                    resolve();
                });
                this.readyTimeout = setTimeout(() => {
                    this.client.off(clientOnReadyListenerName,()=>{});
                    reject('Client seems to be unable to connect to the discord server');
                }, readyTimeout);
                this.client.login(this.secret);
            });
        }

        /**
         * Starts the observers and behave like a observable.
         */
        startObservation() {
            this.client.on(clientOnMessageListenerName, (message) => {
                if (message.channel.type != "dm") {
                    this.publicMessageListeners.forEach((observer) => observer.notify(message));
                }
            });
            this.client.on(clientOnGuildCreateListenerName, (guild) => {
                this.database.addGuild(guild.id);
            });
            this.client.on(clientOnGuildDeleteListenerName, (guild) => {
                this.database.deleteGuild(guild.id);
            });
        }

        /**
         * Use these to attach a listener. You will receive every event received from the client.
         * @param {function} listener 
         */
        addPublicMessageListener(observer) {
            this.publicMessageListeners.push(observer);
        }

        //Returns the connection instance 
        getConnection() {
            return this.client;
        }
    }
})();