(function () {
    exports.Cache = class Cache {

        constructor(database) {
            this.database = database;
            this.cache = {};
        }

        startUp() {
            /*let cache = this.database.getCache();
            cache.forEach(e => {
                this.prefixCache[e.discord_id] = e.prefix;
            })*/
        }

        getPrefix(discord_id) {
            return new Promise(async(resolve, reject) => {
                if (this.cache[discord_id].prefix)
                    resolve(this.cache[discord_id].prefix);
                else {
                    let data = await this.database.getPrefix(discord_id)
                    this.cache[discord_id].prefix = data.prefix;
                    resolve(this.cache[discord_id].prefix);
                }
            });
        }

        getServer(discord_id) {
            return new Promise(async (resolve, reject) => {
                if (this.cache[discord_id].server)
                    resolve(this.cache[discord_id].server);
                else {
                    let data = await this.database.getServerData(discord_id)
                    this.cache[discord_id].server = {
                        'type': 'hll',
                        'host': data.host,
                        'port': data.port
                    };
                    resolve(this.cache[discord_id].server);
                }
            });
        }

        getTag(discord_id) {
            return new Promise(async(resolve, reject) => {
                if (this.cache[discord_id].tag)
                    resolve(this.prefixCache[discord_id].tag);
                else {
                    let data = await this.database.getTag(discord_id)
                    this.cache[discord_id].tag = data.tag;
                    resolve(this.cache[discord_id].tag);
                }
            });
        }

        updatePrefix(prefix, discord_id) {
            this.cache[discord_id].prefix = prefix;
            this.database.updatePrefix(prefix, discord_id);
        }

        updateServer(address, discord_id) {
            this.cache[discord_id].server = {
                'type': 'hll',
                'host': address.split(':')[0],
                'port': address.split(':')[1]
            };
            this.database.updateServer(address, discord_id);
        }

        updateTag(tag, discord_id) {
            this.cache[discord_id].tag = tag;
            this.database.updateTag(tag, discord_id);
        }
    }
})();