exports.run = async(client, msg, args, bot) => {
	const player = bot.players[args[0]]
	if (!player || !player.entity) {
		bot.chat('I can\'t see you')
	} else {
		bot.chat(`Attacking ${player.username}`)
		bot.attack(player.entity)
	};
};

exports.name = "attackplayer";