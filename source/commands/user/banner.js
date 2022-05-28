/*
 * Copyright (c) 2022.
 * @author: argon.#0001
 * @role: Developer
 * @license: MIT
 */

const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
	name: 'banner',
	description: 'Mostra o avatar do usuário',
	cooldown: 5,
	args: false,
	async execute(message, args) {
		axios.get(`https://discord.com/api/users/${message.author.id}`, {
			headers: {
				Authorization: `Bot ${process.env.TOKEN}`,
			},
		})
			.then((res) => {
				const { banner } = res.data;

				const bannerEmbed = new MessageEmbed()
					.setColor('#faad29')
					.setTitle('Banner')
					.setAuthor({
						name: `${message.author.username}`,
						iconURL: message.author.displayAvatarURL({ dynamic: true, size: 512, format: 'png' }),
					})
					.setImage(`https://cdn.discordapp.com/banners/${message.author.id}/${banner}?size=4096`)
					.setTimestamp()
					.setFooter({ text: `Solicitado por ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 512, format: 'png' }) });

				message.channel.send({ embeds: [bannerEmbed] });
			});
	},
};