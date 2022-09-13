/*
 * Copyright (c) 2022.
 * @author: argon.#0001
 * @role: Developer
 * @license: ISC
 */

require('dotenv').config();
const fs = require('node:fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

/**
 * Instanciamento do Client
 * FLAG GUILDS: Responsável pelos servidores.
 * FLAG GUILD_MESSAGES: Permite o bot receber mensagens.
 * @type {Client<boolean>}
 */
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();
client.cooldowns = new Collection();

const commandFolders = fs.readdirSync('./source/commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./source/commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./source/commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const eventFiles = fs.readdirSync('./source/events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./source/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login(process.env.TOKEN);