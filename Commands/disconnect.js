exports.run = async(client, msg, args, bot) => {
	bot.chat('Goodbye, cruel world!');
	bot.quit(`${msg.author.username} told me to`);
};

exports.name = "disconnect";