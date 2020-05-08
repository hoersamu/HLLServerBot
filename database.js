(function () {
    const mysql = require('mysql');
    /** 
     * This class is used to connect to the database system of discord.
     * It implements a heartbeat in order to keep a connection running.
     * This class should be used as a singleton throughout the project.
     */
    exports.Database = class Database {
        /**
         * Takes the database connection parameters in order to establish a connection.
         * @param {
         *  host: 'hostname',
         *  user: 'username',
         *  password: '*******',
         *  database: 'database name'
         * } dbConnectionSettings 
         */
        constructor(dbConnectionSettings) {
            this.dbConnectionSettings = dbConnectionSettings;
            this.connection = mysql.createConnection(this.dbConnectionSettings);
        }

        /**
         * Toggles a heartbeat to the database in order to keep the connection alive.
         * If the heartbeat is already running, it will be quit.
         */
        toggleHeartbeat() {
            if (this.heartbeatInterval) {
                clearInterval(this.heartbeatInterval);
            } else {
                this.heartbeatInterval = setInterval(() => {
                    this.connection.query('SELECT 1');
                }, 60000);
            }
        }

        /**
         * Starts a connection to the database and resolves the result within a promise.
         * If the connection has been successful, a heartbeat will be toggled in order to keep the
         * connection alive.
         */
        startUp() {
            return new Promise((resolve, reject) => {
                this.connection.connect((error) => {
                    if (error) {
                        reject(error);
                    } else {
                        this.toggleHeartbeat();
                        resolve();
                    }
                });
            });
        }

        /**
         * Shuts down the database connection and removes all intervals that are running.
         */
        dispose() {
            if (this.heartbeatInterval) {
                clearInterval(this.heartbeatInterval);
            }
            this.connection.end();
        }

        getCache() {
            return new Promise((resolve, reject) => {
                this.connection.query("SELECT * FROM Guilds", (error, result) => {
                    if (error) throw error;
                    resolve(result);
                });
            });
        }

        getPrefix(discord_id) {
            return new Promise((resolve, reject) => {
                this.connection.query(`SELECT prefix FROM Guilds WHERE discord_id = "${discord_id}"`, (error, result) => {
                    if (error) throw error;
                    resolve(result[0]);
                });
            });
        }

        getServerData(discord_id) {
            return new Promise((resolve, reject) => {
                this.connection.query(`SELECT * FROM Servers WHERE guild_id = (SELECT guild_id FROM Guilds WHERE discord_id = "${discord_id}")`, (error, result) => {
                    if (error) throw error;
                    resolve(result[0]);
                });
            });
        }

        getTag(discord_id) {
            return new Promise((resolve, reject) => {
                this.connection.query(`SELECT tag FROM Guilds WHERE discord_id = "${discord_id}"`, (error, result) => {
                    if (error) throw error;
                    resolve(result[0]);
                });
            });
        }

        updatePrefix(prefix, discord_id) {
            this.connection.query(`UPDATE Guilds SET prefix = "${prefix}" WHERE discord_id = "${discord_id}"`, (error, result) => {
                if (error) throw error;
            });
        }

        updateServer(address, discord_id) {
            this.connection.query(`INSERT INTO Servers (guild_id,host,port) VALUES ((SELECT guild_id FROM Guilds WHERE discord_id = "${discord_id}"),"${address.split(':')[0]}","${address.split(':')[1]}") ON DUPLICATE KEY UPDATE host = "${address.split(':')[0]}", port = "${address.split(':')[1]}"`, (error, result) => {
                if (error) throw error;
            });
        }

        updatePrefix(tag, discord_id) {
            this.connection.query(`UPDATE Guilds SET tag = "${tag}" WHERE discord_id = "${discord_id}"`, (error, result) => {
                if (error) throw error;
            });
        }

        addGuild(discord_id) {
            this.connection.query(`INSERT INTO Guilds (discord_id) VALUES ("${discord_id}")`, (error, result) => {
                if (error) throw error;
            });
        }

        deleteGuild(discord_id) {
            this.connection.query(`DELETE FROM Servers WHERE guild_id = (SELECT FROM Guilds WHERE discord_id = "${discord_id}")`, (error, result) => {
                if (error) throw error;
                this.connection.query(`DELETE FROM Guilds WHERE discord_id = ("${discord_id}")`, (error, result) => {
                    if (error) throw error;
                });
            });
        }
    }
})()