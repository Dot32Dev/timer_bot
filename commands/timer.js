//@ts-check
const { SlashCommandBuilder } = require('discord.js');
const locale = require('../data/localizations/timer.json');
const { createPingBackEvent } = require('../util/scheduler');
const { CommandInteraction } = require('discord.js');

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
		.setDescription('Sends a timer to the specified time in chat.')
		.setNameLocalizations(locale.data.name)
		.setDescriptionLocalizations(locale.data.description)
		.addNumberOption(option =>
			option.setName('years')
				.setNameLocalizations(locale.options.names.years)
				.setDescriptionLocalizations(locale.options.descriptions.years)
				.setDescription('How many many years to count down for.'))
		.addNumberOption(option =>
			option.setName('months')
				.setNameLocalizations(locale.options.names.months)
				.setDescriptionLocalizations(locale.options.descriptions.months)
				.setDescription('How many many months to count down for.'))
		.addNumberOption(option =>
			option.setName('weeks')
				.setNameLocalizations(locale.options.names.weeks)
				.setDescriptionLocalizations(locale.options.descriptions.weeks)
				.setDescription('How many many weeks to count down for.'))
		.addNumberOption(option =>
			option.setName('days')
				.setNameLocalizations(locale.options.names.days)
				.setDescriptionLocalizations(locale.options.descriptions.days)
				.setDescription('How many many days to count down for.'))
		.addNumberOption(option =>
			option.setName('hours')
				.setNameLocalizations(locale.options.names.hours)
				.setDescriptionLocalizations(locale.options.descriptions.hours)
				.setDescription('How many many hours to count down for.'))
		.addNumberOption(option =>
			option.setName('minutes')
				.setNameLocalizations(locale.options.names.minutes)
				.setDescriptionLocalizations(locale.options.descriptions.minutes)
				.setDescription('How many many minutes to count down for.'))
		.addNumberOption(option =>
			option.setName('seconds')
				.setNameLocalizations(locale.options.names.seconds)
				.setDescriptionLocalizations(locale.options.descriptions.seconds)
				.setDescription('How many many seconds to count down for.'))
		.addBooleanOption(option =>
			option.setName('ping')
				.setNameLocalizations(locale.options.names.ping)
				.setDescriptionLocalizations(locale.options.descriptions.ping)
				.setDescription('Whether or not to ping the user when the timer is done.')),
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 * @returns 
	 */
	async execute(interaction) {
		const years = interaction.options.getNumber('years') ?? 0;
		const months = interaction.options.getNumber('months') ?? 0;
		const weeks = interaction.options.getNumber('weeks') ?? 0;
		const days = interaction.options.getNumber('days') ?? 0;
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

		let datum = new Date(Date.UTC(year + years, month + months, day + days + weeks * 7, hour + hours, minute + minutes, second + seconds))

		if (interaction.options.getBoolean('ping') && (datum.getTime() - d.getTime()) > 31536000000) {
			return interaction.reply({ content: 'Pings can only be valid for a year.', ephemeral: true })
		}

		if (isNaN(datum.getTime())) {
			await interaction.reply({ content: 'Failed to process timestamp. Please use a smaller time period.', ephemeral: true });
		} else {
			const message = await interaction.reply(
				{
					content: `Timer ends <t:${datum.getTime() / 1000}:R>${interaction.options.getBoolean('ping') ? `\nYou will be pinged at the end of the timer.` : ''}`,
					fetchReply: true
				}
			);
			if (interaction.options.getBoolean('ping')) {
				createPingBackEvent({
					userid: interaction.user.id,
					channel: interaction.channelId,
					date: datum.getTime(),
					ogMsgId: message.id
				})
			}
		}
	},
};