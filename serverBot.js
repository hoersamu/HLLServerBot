/**
 * This is the main entry point of your bot.
 * You should manage all dependencies in here and attach them to the according
 * services you require. No need to do this more than once ;-)
 * Because this will become super ugly!
 */

//Load all the modules
const cl = require("./config-loader");
const dc = require("./client");
const puml = require("./public-message-listener");
const chf = require("./command-handler-factory");
const il = require("./image-loader");
const db = require("./database");
const ca = require("./cache");
const path = require("path");

//Load the desired configfile
const configLoader = new cl.ConfigLoader(path.join(__dirname, "/config/config.json"));

//Starts the programm in multiple stages
configLoader.startUp().then(() => {
	const database = new db.Database(configLoader.databaseSettings());
	const imageLoader = new il.ImageLoader();
	Promise.all([imageLoader.startUp(), database.startUp()]).then(() => {
		const discordClient = new dc.Client(configLoader.discordClientSettings().secret, database);
		discordClient.startUp().then(() => {
			const cache = new ca.Cache(database);
			console.log("Loading cache...");
			const commandHandlerFactory = new chf.CommandHandlerFactory(imageLoader, configLoader, cache);
			const publicMessageListener = new puml.MessageHandler(commandHandlerFactory, cache);
			discordClient.addPublicMessageListener(publicMessageListener);
			console.info("Up and running...");
			cache.startUp();
		});
	}).catch((error) => {
		process.exit(error);
	});
}).catch((error) => {
	process.exit(error);
});

//Logs the exit error
process.on("exit", function (code) {
	return console.error(code);
});
