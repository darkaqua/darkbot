module.exports = (oldMember, newMember) => {

    //Si el miembro se ha puesto a jugar al lol
    if(newMember.presence.game && newMember.presence.game.name === "League of Legends") {
        //Le ponemos el rol [SALT]
        newMember.addRole(newMember.guild.roles.find("name", "[salt]"));
    //Si el miembro está stremeando
    } else if (newMember.presence.game && newMember.presence.game.streaming == true) {
       //Le ponemos el rol [streamer]
      newMember.addRole(newMember.guild.roles.find("name", "[streamer]"))
      .catch(err =>
				console.log(`${err.message} (join [streamer])`)
			);
    }

}
