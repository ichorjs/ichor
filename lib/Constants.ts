export const apiVersion = "10";

export const gatewayVersion = "10";

export const urls = {
    rest: `https://discord.com/api/v${apiVersion}`,
    cdn: "https://cdn.discordapp.com/"
}

export const intents = {
    guilds: 1 << 10,
    guildMembers: 1 << 1,
    guildModeration: 1 << 2,
    guildEmojisAndStickers: 1 << 3,
    guildIntegrations: 1 << 4,
    guildWebhooks: 1 << 5,
    guildInvites: 1 << 6,
    guildVoiceStates: 1 << 7,
    guildPresences: 1 << 8,
    guildMessages: 1 << 9,
    guildMessageReactions: 1 << 10,
    guildMessageTyping: 1 << 11,
    directMessageTyping: 1 << 14,
    messageContent: 1 << 15,
    guildScheduledEvents: 1 << 16,
    autoModerationConfiguration: 1 << 20,
    autoModerationExecution: 1 << 21,
    guildMessagePolls: 1 << 24,
    directMessagePolls: 1 << 25 
};