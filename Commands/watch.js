exports.run = async(client, msg, args, bot) => {
	const target = bot.players[args[0]]?.entity;

	if (!args[0]) {
		bot.chat('Usage:\` watch <playername> \`');
	};
	
	if (!target) return bot.chat("I don't see you !");
	
	bot.lookAt(target.position.offset(0, target.height, 0))
};

exports.name = 'watch';