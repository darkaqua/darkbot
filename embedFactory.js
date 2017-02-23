exports.createEmbed = function(message) {
    let embed = {
        "description": message.content,
        "color": message.member.highestRole.color,
        "timestamp": message.createdAt.toISOString(),
        "author": {
            "name": message.author.username,
            "icon_url": message.author.displayAvatarURL
        },
        "footer": {
            "text": "#" + message.channel.name
        }
    };
    return embed;
}
