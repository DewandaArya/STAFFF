exports.run = async(client, msg, args, bot) => {
const entity = bot.nearestEntity()
if (!entity) {
	bot.chat('No nearby entities')
} else {
	bot.chat(`Attacking ${entity.name ?? entity.username}`)
	bot.attack(entity)
};
};

exports.name = "attack";