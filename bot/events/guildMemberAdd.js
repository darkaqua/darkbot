
module.exports = (guildMember) => {
    let channel = guildMember.guild.channels.get("287662094898298891");
    channel.sendMessage(`${guildMember} se ha unido al servidor :upside_down:`);
    let memberCount = guildMember.guild.members.size;
    if(memberCount % 100 == 0) {
        channel.sendMessage(`Eres el miembro numero ${memberCount}!`);
    }
}
