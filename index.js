const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder');
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
/*
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`app listening`);
});
*/
const { Client, GatewayIntentBits, Collection } = require('discord.js')
const { MessageContent, GuildMessages, Guilds } = GatewayIntentBits
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });
const fs = require('fs');
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const Table = new Ascii("Events Loaded");

client.commands = new Collection();

client.once('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`);

	setTimeout(() => {
		client.channels.cache.get('1179704075248476170')?.send('Commands Ready!\n` listCommands `');
	}, 500);

	(await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
		const event = require(file);

		if (event.once) {
			bot.once(event.name, (...args) => event.execute(...args, bot));
		} else {
			bot.on(event.name, (...args) => event.execute(...args, bot));
		};

		await Table.addRow(event.name, "✓ SUCCESSFUL");
	});

	console.log(Table.toString());
});

const commands = fs.readdirSync("./Commands").filter((file) => file.endsWith(".js"));

for (file of commands) {
	const commandName = file.split(".")[0];
	const command = require(`./Commands/${commandName}`);

	client.commands.set(commandName, command);
};

console.log(`Successfully Loaded ${client.commands.size} Commands`);

async function createBot() {
	const bot = await mineflayer.createBot({
		host: 'n4.luxxy.host', // minecraft server ip
		username: 'itzStaff', // username or email, switch if you want to change accounts
		auth: 'offline', // for offline mode servers, you can set this to 'offline'
		port: 20528 // only set if you need a port that isn't 25565
		// version: false,             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
		// password: '12345678'        // set if you want to use password-based auth (may be unreliable). If specified, the `username` must be an email
	});

	module.exports = bot;

	const RANGE_GOAL = 1 // get within this radius of the player

	bot.loadPlugin(pathfinder)

	bot.once('spawn', () => {
		mineflayerViewer(bot, { port: 28882, firstPerson: false }) // port is the

		setInterval(toggleSkin, 500);
		
		setTimeout(() => {
			bot.setControlState('forward', true);
			bot.setControlState('forward', false);
		}, 500);

		setTimeout(() => {
			bot.chat(`/register ${process.env.password} ${process.env.password}`);
			bot.chat(`/login ${process.env.password}`);
		}, 500);

		const defaultMove = new Movements(bot)
	});

	bot.on('mount', () => {
		bot.chat(`mounted ${bot.vehicle.displayName}`)
	});
	bot.on('entitySpawn', async (entity) => {
		if (entity.type === 'global') {
			bot.chat('Ooh lightning!');
		};
	});
	bot.on('noteHeard', (block, instrument, pitch) => {
		bot.chat(`Music for my ears! I just heard a ${instrument.name}`)
	});
	bot.on('pistonMove', (block, isPulling, direction) => {
		const action = isPulling ? 'pulling' : 'pushing'
		bot.chat(`A piston is ${action} near me, i can hear it.`)
	});
	bot.on('spawnReset', (message) => {
		bot.chat('Oh noez! My bed is broken.')
	});
	bot.on('forcedMove', () => {
		bot.chat(`I have been forced to move to ${bot.entity.position}`)
	});
	bot.on('health', () => {
		setTimeout(() => {
			bot.chat(`I have ${bot.health} health and ${bot.food} food`)
		}, 500);
	});
	bot.on('death', () => {
		bot.chat('I died x.x')
	});
	bot.on('whisper', (username, message, rawMessage) => {
		console.log(`I received a message from ${username}: ${message}`)
		bot.whisper(username, 'I can tell secrets too.')
	});
	bot.on('entityHurt', (entity) => {
		if (entity.type === 'mob') {
			bot.chat(`Haha! The ${entity.displayName} got hurt!`)
		} else if (entity.type === 'player') {
			bot.chat(`Aww, poor ${entity.username} got hurt. Maybe you shouldn't have a ping of ${bot.players[entity.username].ping}`)
		};
	});
	bot.on('entityCrouch', (entity) => {
		bot.chat(`${entity.username}: you so sneaky.`)
	});
	bot.on('entityUncrouch', (entity) => {
		bot.chat(`${entity.username}: welcome back from the land of hunchbacks.`)
	});
	bot.on('entitySleep', (entity) => {
		bot.chat(`Good night, ${entity.username}`)
	});
	bot.on('entityWake', (entity) => {
		bot.chat(`Top of the morning, ${entity.username}`)
	});
	bot.on('dismount', (vehicle) => {
		bot.chat(`dismounted ${vehicle.displayName}`)
	});

	let target = null

	bot.on('chat', async (username, message) => {
		if (username === bot.username) return
		// bot.chat(message)

		if (message === 'attack me') attackPlayer(username);
		if (message === 'watch me') watchTarget(username);

		if (message === 'come') {
			target = bot.players[username]?.entity
			if (!target) {
				bot.chat("I don't see you !")
				return
			};
			const { x: playerX, y: playerY, z: playerZ } = target.position

			bot.pathfinder.setMovements(defaultMove)
			bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, RANGE_GOAL));
		};
	});
	// Log errors and kick reasons:
	bot.on('kicked', console.log)
	bot.on('error', console.log)
	// bot.on('end', createBot);

	client.on('messageCreate', async msg => {
		if (msg.author.id === client.user.id) return;
		const args = msg.content.trim().split(/ +/g);
		const commandName = args.shift().toLowerCase(); // convert to lowercase
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (command) {
			try {
				command.run(client, msg, args, bot);
			} catch (error) {
				console.error(error);
				const errorMessage = `Error Name: ${error.name}\nError Message: ${error.message}\nStack Trace: ${error.stack}\nFile Name: ${error.fileName || 'N/A'}\nLine Number: ${error.lineNumber || 'N/A'}\nColumn Number: ${error.columnNumber || 'N/A'}`;

				await msg.channel.send(errorMessage);
			};
		} else {
			setTimeout(() => {
				msg.channel.sendTyping();
			}, 500);
		};

		let entity;

		switch (msg.content.toLowerCase()) {
			case 'w':
				bot.setControlState('forward', true)
				bot.chat(' Walking Forwards')
				break
			case 's':
				bot.setControlState('back', true)
				bot.chat('Walking Backwards')
				break
			case 'a':
				bot.setControlState('left', true)
				bot.chat('Strafing Left')
				break
			case 'd':
				bot.setControlState('right', true)
				bot.chat('Strafing Right')
				break
			case 'sprint' || 'run':
				bot.setControlState('sprint', true)
				bot.chat('Started Sprinting')
				break
			case 'stop':
				bot.clearControlStates()
				bot.chat('Clearing Current Control States')
				break
			case 'jump':
				bot.setControlState('jump', true)
				bot.setControlState('jump', false)
				bot.chat('Jumped Once')
				break
			case 'jump a lot':
				bot.setControlState('jump', true)
				bot.chat('Started Jumping')
				break
			case 'stop jumping':
				bot.setControlState('jump', false)
				bot.chat('Stopped Jumping')
				break
			case 'dismount':
				bot.dismount()
				break
			case 'move vehicle forward':
				bot.moveVehicle(0.0, 1.0)
				break
			case 'move vehicle backward':
				bot.moveVehicle(0.0, -1.0)
				break
			case 'move vehicle left':
				bot.moveVehicle(1.0, 0.0)
				break
			case 'move vehicle right':
				bot.moveVehicle(-1.0, 0.0)
				break
			case 'tp':
				bot.entity.position.y += 10
				break
			case 'pos':
				bot.chat('i am Currently at ' + bot.entity.position.toString());
				break
			case 'wearing':
				sayEquipment(username)
				break
			case 'yp':
				bot.chat(`Yaw ${bot.entity.yaw}, pitch: ${bot.entity.pitch}`)
				break
		};

		if (msg.content === "login" || msg.content === "log on") {
			createBot();
		};
	});

	client.login(process.env.TOKEN);

	function sayEquipment() {
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
			bot.chat('imim naked!')
		};
	};

	function itemToString(item) {
		if (item) {
			return `${item.name} x ${item.count}`
		} else {
			return '(nothing)'
		};
	};

	function itemByName(name) {
		const items = bot.inventory.items()
		if (bot.registry.isNewerOrEqualTo('1.9') && bot.inventory.slots[45]) items.push(bot.inventory.slots[45])
		return items.filter(item => item.name === name)[0]
	};

		let show = true

		function toggleSkin () {
			show = !show
			bot.setSettings({
				skinParts: {
					showJacket: show,
					showHat: show,
					showRightPants: show,
					showLeftPants: show,
					showLeftSleeve: show,
					showRightSleeve: show
				}
			});
		};
};

createBot();