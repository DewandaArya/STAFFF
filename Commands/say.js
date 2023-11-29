exports.run = async (client, msg, args, bot) => {
	if (!args[0]) return msg.reply("Please provide a message to say.");

	try {
		bot?.chat(args.join(" "));
		msg.delete();
	} catch (error) {
		console.error(error);
		msg.reply("**:warning:WaWarning**! the Bot is may Currently not Connected.")
	};
};

exports.name = "say";