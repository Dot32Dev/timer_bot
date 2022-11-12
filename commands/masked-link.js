const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('masked-link')
		.setDescription('Sends link to discord timestamp generator.'),
	async execute(interaction) {
		await interaction.reply('See the world famous website [here](https://discordtimestampgenerator.netlify.app/)!');
	},
};