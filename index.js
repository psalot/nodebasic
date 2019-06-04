const express = require("express");
const app = express();
const winston = require("winston");
const logFolder = `/logs/sample`;
global.logger = winston.createLogger({
	transports: [
		new winston.transports.File({
			timestamp: function() {
				return new Date().valueOf();
			},
			formatter: function(options) {
				return (
					options.timestamp() +
					" " +
					options.level.toUpperCase() +
					" " +
					(undefined !== options.message ? options.message : "") +
					(options.meta && Object.keys(options.meta).length
						? "\n\t" + JSON.stringify(options.meta)
						: "")
				);
			},
			colorize: true,
			name: "access-file",
			filename: `${logFolder}/access.log`,
			handleExceptions: true,
			humanReadableUnhandledException: true,
			json: false
		})
	],
	exitOnError: false
});
app.listen("5004", function() {
	console.log(`listening on port 5004`);
	global.logger.info("Test successful");
});
