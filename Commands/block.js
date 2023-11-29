exports.run = async(client, msg, args, bot) => {
	const block = bot.blockAtCursor()

	if (!block) {
		return bot.chat('Looking at Air')
	};

	bot.chat(`Looking at ${block.displayName}`);
};

exports.name = 'block';