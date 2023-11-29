exports.run = async(client, msg, args, bot) => {
	let items = null;
	
	if (!items) {
		items = bot.inventory.items()
		if (bot.registry.isNewerOrEqualTo('1.9') && bot.inventory.slots[45]) items.push(bot.inventory.slots[45])
	};
	const output = items.map(itemToString).join(', ')
	if (output) {
		bot.chat(output)
	} else {
		bot.chat('empty')
	};
};

exports.name = 'listitems';