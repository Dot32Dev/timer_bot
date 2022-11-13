const { SlashCommandBuilder } = require('discord.js');

let d = new Date()
let year = d.getUTCFullYear()
let month = d.getUTCMonth()
let day = d.getUTCDate()
let hour = d.getUTCHours()
let minute = d.getUTCMinutes()
let second = d.getUTCSeconds()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timer')
		.setDescription('Sends a timer in chat.')
		.addNumberOption(option =>
			option.setName('years')
				.setDescription('How many many years to count down for.'))
		.addNumberOption(option =>
			option.setName('months')
				.setDescription('How many many months to count down for.'))
		.addNumberOption(option =>
			option.setName('weeks')
				.setDescription('How many many weeks to count down for.'))
		.addNumberOption(option =>
			option.setName('days')
				.setDescription('How many many days to count down for.'))
		.addNumberOption(option =>
			option.setName('hours')
				.setDescription('How many many hours to count down for.'))
		.addNumberOption(option =>
			option.setName('minutes')
				.setDescription('How many many minutes to count down for.'))
		.addNumberOption(option =>
			option.setName('seconds')
				.setDescription('How many many seconds to count down for.')),
	async execute(interaction) {

		const years = interaction.options.getNumber('years') ?? 0;
		const months = interaction.options.getNumber('months') ?? 0;
		const weeks = interaction.options.getNumber('weeks') ?? 0;
		const days = interaction.options.getNumber('days')	?? 0;
		const hours = interaction.options.getNumber('hours') ?? 0;
		const minutes = interaction.options.getNumber('minutes') ?? 0;
		const seconds = interaction.options.getNumber('seconds') ?? 0;

		let d = new Date()
		let year = d.getUTCFullYear()
		let month = d.getUTCMonth()
		let day = d.getUTCDate()
		let hour = d.getUTCHours()
		let minute = d.getUTCMinutes()
		let second = d.getUTCSeconds()

		let datum = new Date(Date.UTC(year+years, month+months, day + days + weeks*7, hour + hours, minute + minutes, second + seconds))

		await interaction.reply(`Timer ends <t:${datum.getTime()/1000}:R>`);
	},
};