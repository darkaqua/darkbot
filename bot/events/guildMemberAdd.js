
module.exports = (guildMember) => {
    let channel = guildMember.guild.channels.find("name", "bienvenida");
    channel.send(`${guildMember} se ha unido al servidor :upside_down:`).catch(console.error);
    let memberCount = guildMember.guild.memberCount;
    if(memberCount % 100 === 0) {
        channel.send(`Eres el miembro numero ${memberCount}!`).catch(console.error);
    }
}
