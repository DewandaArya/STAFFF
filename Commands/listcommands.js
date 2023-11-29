const Discord = require('discord.js');

exports.run = async(client, msg, args, bot) => {
	let embed = new Discord.EmbedBuilder()
	.setTitle(`Currently Avalaible Commands (${client.commands.size}):`)
	.setDescription(client.commands.map(c => c.name).join(', '))
	.setColor('Random')
	.setTimestamp()

	msg.reply({ embeds: [embed] });
};

exports.name = 'listCommands';