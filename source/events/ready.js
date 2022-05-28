/*
 * Copyright (c) 2022.
 * @author: argon.#0001
 * @role: Developer
 * @license: MIT
 */

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(process.env.BOT_NAME + ' -> Pronto!');
	},
};