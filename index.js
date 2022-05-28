/*
 * Copyright (c) 2022.
 * @author: argon.#0001
 * @role: Developer
 * @license: ISC
 */

//	file sync
const fs = require('node:fs');

// Inicia as variáveis de ambiente.
require('dotenv').config();

// Destruturação da classe Client e Intents.
const { Client, Intents, Collection } = require('discord.js');

/**
 * Instanciamento do Client
 * FLAG GUILDS: Responsável pelos servidores.
 * FLAG GUILD_MESSAGES: Permite o bot receber mensagens.
 * @type {Client<boolean>}
 */
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//	Permite acessar os comandos em outros arquivos
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

// Realiza login no Discord com o Token do Bot atribuído na variável de ambiente
client.login(process.env.TOKEN);