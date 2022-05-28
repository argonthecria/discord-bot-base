/*
 * Copyright (c) 2022.
 * @author: argon.#0001
 * @role: Developer
 * @license: MIT
 */

const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'avatar',
	description: 'Mostra o avatar do usuário',
	cooldown: 5,
	args: false,
	async execute(message, args) {
		const avatarEmbed = new MessageEmbed()
			.setColor('#faad29')
			.setTitle('Avatar')
			.setAuthor({
				name: `${message.author.username}`,
				iconURL: message.author.displayAvatarURL(),
			})
			.setImage(message.author.displayAvatarURL({ dynamic: true, size: 512, format: 'png' }))
			.setTimestamp()
			.setFooter({ text: `Solicitado por ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 512, format: 'png' }) });

		await message.channel.send({ embeds: [avatarEmbed] });
	},
};