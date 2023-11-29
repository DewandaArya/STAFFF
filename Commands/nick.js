exports.run = async (client, msg, args, bot) => {
	bot.chat(`My name is ${bot?.player.displayName}`);
};

exports.name = 'nick';