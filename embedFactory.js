exports.createEmbed = function(message) {
    let avatarUrl = message.author.avatarURL ? message.author.avatarURL : message.author.defaultAvatarURL;
    let embed = {
        "description": message.content,
        "color": message.member.highestRole.color,
        "timestamp": message.createdAt.toISOString(),
        "author": {
            "name": message.author.username,
            "icon_url": avatarUrl
        }
    };
    return embed;
}
