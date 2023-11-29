exports.run = async(client, msg, args, bot) => {
	if(!args[0]) return msg.reply("Please provide a message to say.");
	msg.channel.send(args.join(" "));
	msg.delete();
	console.log(' iyes');
};

exports.name = "say";