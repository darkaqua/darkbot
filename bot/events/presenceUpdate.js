module.exports = (oldMember, newMember) => {

    //Si el miembro se ha puesto a jugar al lol
    if(newMember.presence.game && newMember.presence.game.name === "League of Legends") {
        //Le ponemos el rol [SALT]
        newMember.addRole(newMember.guild.roles.find("name", "[salt]"));
    }

}
