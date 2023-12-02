exports.run = async (client, msg, args, bot) => {
	const eq = bot.entity.equipment
	const eqText = []
	if (eq[0]) eqText.push(`holding a ${eq[0].displayName}`)
	if (eq[1]) eqText.push(`wearing a ${eq[1].displayName} on your feet`)
	if (eq[2]) eqText.push(`wearing a ${eq[2].displayName} on your legs`)
	if (eq[3]) eqText.push(`wearing a ${eq[3].displayName} on your torso`)
	if (eq[4]) eqText.push(`wearing a ${eq[4].displayName} on your head`)
	if (eqText.length) {
		bot.chat(`im ${eqText.join(', ')}.`)
	} else {
		bot.chat('imim naked!');
	};
};

exports.name = "wearing";