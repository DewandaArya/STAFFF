exports.run = async (client, msg, args, bot) => {
	await bot.waitForChunksToLoad();
	bot.chat('Ready!');
};

exports.name = "loaded";