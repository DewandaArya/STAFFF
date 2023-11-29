const itemByName = require('../index.js');

exports.run = async(client, msg, args, bot) => {
	let name = args[1] || args[0];
	let amount = args.shift();
	
	amount = parseInt(amount, 10)
	const item = itemByName(name)
	if (!item) {
		bot.chat(`I have no ${name}`)
	} else {
		try {
			if (amount) {
				await bot.toss(item.type, null, amount)
				bot.chat(`Dropped ${amount} x ${name}`)
			} else {
				await bot.tossStack(item)
				bot.chat(`Dropped ${name}`)
			}
		} catch (err) {
			bot.chat(`Unable to Drop: ${err.message}`)
		};
	};
};

exports.name = 'drop';