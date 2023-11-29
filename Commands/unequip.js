exports.run = async(client, msg, args, bot) => {
	let destination = args[0];
	if (!destination) {
		msg.reply('Usage:` unequip <destination> `');
	};
	
	try {
		await bot.unequip(destination);
		bot.chat('unequipped');
	} catch (err) {
		bot.chat(`cannot unequip: ${err.message}`)
	};
};

exports.name = 'unequip';