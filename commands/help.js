const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Explains how to use Timer bot.'),
	async execute(interaction) {
// 		await interaction.reply(`
// \`/timer\` asks the bot to reply to your message with a timer that counts down to the specified time.
// \`/timestamp\` is similar, but it replies with a timestamp of the specified time. This is so you can copy paste it and send a timer in your own message. 

// This bot was created by [Dot32](<https://discord.gg/Pswb8khdgQ>), and is open source on [GitHub](https://github.com/Dot32IsCool/timer_bot).
// 		`);
		const exampleEmbed = new EmbedBuilder()
		.setColor(0xAAB8C2)
		.setTitle('Timer bot /Help')
		.setURL('https://discordtimestampgenerator.netlify.app/')
		.setAuthor({ name: 'Dot32', iconURL: 'https://cdn.discordapp.com/attachments/577832597686583310/1041251453819420732/sunrise_somewhere_revector2.png', url: 'https://discord.gg/Pswb8khdgQ' })
		// .setDescription('Timer bot Help')
		.setThumbnail('https://cdn.discordapp.com/attachments/783244234689609748/1041251717259472936/timer.png')
		.addFields(
			{ name: '/timer', value: 'Asks the bot to reply to your message with a timer that counts down to the specified time.' },
			{ name: '/timestamp', value: 'Is similar to /timer, but it replies with a timestamp of the specified time. This is so you can copy paste it and send a timer in your own message.' },
			// { name: '\u200B', value: '\u200B' },
			{ name: 'Bot Created By', value: '<@379191617627619328> \n\n Have any more questions? Consider joining my [Discord server](<https://discord.gg/Pswb8khdgQ>) or checking out the bots code on [GitHub](https://github.com/Dot32IsCool/timer_bot).', inline: true },
		)
		// .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
		// .setImage('https://i.imgur.com/AfFp7pu.png')
		// .setTimestamp()
		// .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

		// channel.send({ embeds: [exampleEmbed] });
		interaction.reply({ embeds: [exampleEmbed] });
	},
};