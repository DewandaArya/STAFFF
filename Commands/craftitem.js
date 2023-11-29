exports.run = async(client, msg, args, bot) => {
	let amount = args[0];
	let name = args.slice(1).join(" ");
	
if (!amount || !name) {
	msg.reply('Usage:` craftitem <amount> <itemname> `');
};

	amount = parseInt(amount, 10)
	const item = bot.registry.itemsByName[name]
	const craftingTableID = bot.registry.blocksByName.crafting_table.id

	const craftingTable = bot.findBlock({
		matching: craftingTableID
	})

	if (item) {
		const recipe = bot.recipesFor(item.id, null, 1, craftingTable)[0]
		if (recipe) {
			bot.chat(`I can make ${name}`)
			try {
				await bot.craft(recipe, amount, craftingTable)
				bot.chat(`did the recipe for ${name} ${amount} times`)
			} catch (err) {
				bot.chat(`error making ${name}`)
			}
		} else {
			bot.chat(`I cannot make ${name}`);
		};
	} else {
		bot.chat(`unknown item: ${name}`);
	};
};

																							 exports.name = 'craftitem';