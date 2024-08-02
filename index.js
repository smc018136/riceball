require('dotenv').config();
const { Client, GatewayIntentBits, Partials, REST, Routes, ActivityType } = require('discord.js');
const keepAlive = require('./keep_alive'); // Import the keep_alive module
const cron = require('node-cron');

const token = process.env.TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const statuses = ['with JavaScript', 'JetHub'];
let statusIndex = 0;

client.once('ready', () => {
    console.log('Bot is ready!');

    // Sync application commands
    const rest = new REST({ version: '10' }).setToken(token);
    (async () => {
        try {
            const commands = [
                {
                    name: 'duck',
                    description: 'idk'
                }
            ];
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands }
            );
            console.log('Successfully registered application commands.');
        } catch (error) {
            console.error(error);
        }
    })();

    // Start status change loop
    cron.schedule('*/10 * * * * *', () => {
        client.user.setActivity(statuses[statusIndex], { type: ActivityType.Playing });
        statusIndex = (statusIndex + 1) % statuses.length;
    });
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const msg = message.content.toLowerCase();

    if (msg.includes('fdsf') || msg.includes('ffff')) {
        await message.delete();
    } else if (msg.includes('cat')) {
        await message.channel.send('dfsdf');
    } else if (msg.includes('dick')) {
        await message.channel.send('can i suck');
    }
});

// Command handling
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
