
module.exports = (guildMember) => {
    let channel = guildMember.guild.channels.find("name", "bienvenida")
    channel.sendMessage(`${guildMember} se ha unido al servidor :upside_down:`);
    let memberCount = guildMember.guild.memberCount;
    if(memberCount % 100 == 0) {
        channel.sendMessage(`Eres el miembro numero ${memberCount}!`);
    }
}
