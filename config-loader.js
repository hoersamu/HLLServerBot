(function () {
    const fs = require('fs');
    /**
     * This class can be used in order to parse a file and load the config according
     * to the contents of the file. Furthermore it validates the file on startup
     * and grants clustered access to specific config parts.
     */
    exports.ConfigLoader = class ConfigLoader {

        constructor(filePath) {
            if (filePath == null)
                throw new Error('Cannot initialize a configloader without a config file');
            this.filePath = filePath;
        }
        /**
         * Startup function that starts to parse and validate the contents of a given 
         * config file.
         */
        startUp() {
            return new Promise((resolve, reject) => {
                fs.readFile(this.filePath, { encoding: 'utf-8' }, (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        this.data = JSON.parse(data);
                        try {
                            this.validateConfig();
                            resolve();
                        } catch (validationError) {
                            reject(validationError);
                        }
                    }
                })
            });
        }

        discordClientSettings() {
            return this.data.discord;
        }

        databaseSettings() {
            return this.data.database;
        }

        /**
         * This implements a validation of the filecontent loaded from config file.
         */
        validateConfig() {
            this.validateDiscordClientSettings();
            this.validateDatabaseSettings();
        }

        validateDiscordClientSettings() {
            if (!this.data.discord)
                throw new Error('Missing area discord inside config file!');
            if (!this.data.discord.secret)
                throw new Error('Missing parameter <host> inside database config settings!');
        }

        validateDatabaseSettings() {
            if (!this.data.database)
                throw new Error('Missing area database inside config file!');
            if (!this.data.database.host)
                throw new Error('Missing parameter <host> inside database config settings!');
            if (!this.data.database.user)
                throw new Error('Missing parameter <user> inside database config settings!');
            if (!this.data.database.password)
                throw new Error('Missing parameter <password> inside database config settings!');
            if (!this.data.database.database)
                throw new Error('Missing parameter <database> inside database config settings!');
        }
    }
})();