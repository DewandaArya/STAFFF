exports.run = async (client, msg, args, bot) => {
	entity = bot.nearestEntity((entity) => { return entity.name === 'minecart' })
	if (entity) {
		bot.mount(entity)
	} else {
		bot.chat('no nearby objects')
	};
};

exports.name = "mount";