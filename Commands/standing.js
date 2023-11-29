exports.run = async(client, msg, args, bot) => {
	const block = bot.blockAt(bot.entity.position.offset(0, -1, 0))
	bot.chat(`Im currently standing above a ${block.displayName} in the ${block.biome.name} biome`)
	console.log(block);
};

exports.name = "standing";