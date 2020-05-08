(function () {
	const helpHandlerCommand = require("./handler/help-command");
	const pingHandlerCommand = require("./handler/ping-command");
	const serverHandlerCommand = require("./handler/server-command");
	const mapHandlerCommand = require("./handler/map-command");
	const prefixHandlerCommand = require("./handler/prefix-command");
	const setServerHandlerCommand = require("./handler/setServer-command");
	const setTagHandlerCommand = require("./handler/setTag-command");

	exports.CommandHandlerFactory = class CommandHandlerFactory {
		constructor(imageLoader, configLoader, cache) {
			this.imageLoader = imageLoader;
			this.config = configLoader;
			this.cache = cache;
		}

		createHelpCommandHandler() {
			return new helpHandlerCommand.HelpCommand(this.imageLoader);
		}

		createPingCommandHandler() {
			return new pingHandlerCommand.PingCommand();
		}

		createServerCommandHandler() {
			return new serverHandlerCommand.ServerCommand(this.imageLoader, this.cache);
		}

		createMapCommandHandler() {
			return new mapHandlerCommand.MapCommand(this.imageLoader,this.config);
		}

		createPrefixCommandHandler() {
			return new prefixHandlerCommand.PrefixCommand(this.cache);
		}

		createSetServerCommandHandler() {
			return new setServerHandlerCommand.SetServerCommand(this.cache);
		}

		createSetTagCommandHandler() {
			return new setTagHandlerCommand.SetTagCommand(this.cache);
		}
	};
})();
