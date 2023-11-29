exports.run = async(client, msg, args, bot) => {
	bot.chat('activating item');
	bot.activateItem();
};

exports.name = 'useitem';