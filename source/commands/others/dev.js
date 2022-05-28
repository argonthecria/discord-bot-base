/*
 * Copyright (c) 2022.
 * @author: argon.#0001
 * @role: Developer
 * @license: MIT
 */

module.exports = {
	name: 'dev',
	description: 'Mostra o desenvolvedor do Bot',
	cooldown: 5,
	args: false,
	async execute(message, args) {
		const messageBot = await message.channel.send('Desenvolvedor do Bot: argon.#0001');
		await messageBot.react('❤️');
	},
};