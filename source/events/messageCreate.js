/*
 * Copyright (c) 2022.
 * @author: argon.#0001
 * @role: Developer
 * @license: MIT
 */

// Inicia as variáveis de ambiente.
require('dotenv').config();

module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(message, client) {
		if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

		const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		if (!client.commands.has(commandName)) return;

		const command = client.commands.get(commandName);

		if (command.args && !args.length) {
			return message.channel.send(`Você não passou nenhum argumento! <@${message.author.id}>`);
		}

		const { cooldowns } = client;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, client.cooldowns);
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`Por favor aguarde ${timeLeft.toFixed(1)} segundos.`);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			await command.execute(message, args);
		}
		catch (error) {
			console.error(error);
			await message.reply('Você deve ter digitado o comando de forma incorreta! O prefixo do bot é `' + process.env.PREFIX + '`');
		}
	},
};