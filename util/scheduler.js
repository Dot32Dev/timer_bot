//@ts-check

/**
 * @typedef {Object} IPingbackEventData | Event data
 * @property {number} date | Date of when the event triggers
 * @property {string} ogMsgId | Original message ID
 * @property {string} channel | Channel ID
 * @property {string} userid | The user ID to mention  
 */

const { TextChannel } = require('discord.js')
const fs = require('fs')
const client = require('../index')
module.exports = {
    createPingBackEvent,
    checkSchedules
}

function readScheduleFile() {
    if(!fs.existsSync('schedules.json')) {
        fs.writeFileSync('schedules.json', JSON.stringify({ events: [] }))
    }
    return JSON.parse(fs.readFileSync('schedules.json').toString())
}

/**
 * 
 * @param {object} scheduleData | Schedule data
 * @param {array} scheduleData.events | Array of events
 */
function writeScheduleFile(scheduleData) {
    fs.writeFileSync('schedules.json', JSON.stringify(scheduleData, null, '\t'))
}

async function checkSchedules() {
    const schedule = readScheduleFile()
    schedule.events.forEach(async event => {
        //check if event is in the past, then run it and remove it from the schedule
        if (event.date < Date.now()) {
            const index = schedule.events.indexOf(event)
            schedule.events.splice(index, 1)
            handleEvent(event)
            writeScheduleFile(schedule)
        }
    })
}

async function handleEvent(event) {
    const channel = await client.channels.fetch(event.channel)
    if(!(channel instanceof TextChannel)) return
    if(!channel) return console.warn(`Exec Event ${event.userid} FAILED: Channel ${event.channel} not found`)
    const message = await channel.messages.fetch(event.ogMsgId)
    if(!message) return console.warn(`Exec Event ${event.userid} FAILED: Message ${event.ogMsgId} not found`)
    message.reply(`<@${event.userid}>`)
}

/**
 * Create a pingback event and write it into the schedule
 * @param {IPingbackEventData} eventData | Event data
 */
function createPingBackEvent(eventData) {
    const schedule = readScheduleFile()
    schedule.events.push(eventData)
    writeScheduleFile(schedule)
}