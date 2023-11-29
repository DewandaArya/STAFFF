const itemByName = require('../index.js');

exports.run = async (client, bot, args, msg) => {
	let destination = args[1] || args[0];
	let name = args[0];
	
	const item = itemByName(name)
	if (item) {
		try {
			await bot.equip(item, destination)
			bot.chat(`equipped ${name}`)
		} catch (err) {
			bot.chat(`cannot equip ${name}: ${err.message}`)
		}
	} else {
		bot.chat(`I have no ${name}`)
	};
};

exports.name = 'equip';