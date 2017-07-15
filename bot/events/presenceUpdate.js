module.exports = (oldMember, newMember) => {

    //Si el miembro se ha puesto a jugar al lol
    if(newMember.presence.game && newMember.presence.game.name === "League of Legends") {
        //Le ponemos el rol [SALT]
        newMember.addRole(newMember.guild.roles.find("name", "[salt]"));
    //Si el miembro está stremeando
  } else if (newMember.presence.game && newMember.presence.game.streaming === true) {
       //Le ponemos el rol [streaming]
      newMember.addRole(newMember.guild.roles.find("name", "[twitch]"))
      .catch(err =>
				console.log(`${err.message} (join [twitch])`)
			);
    //Si el miembro dejó de estremear
  } else if (oldMember.presence.game && oldMember.presence.game.streaming === true && ((newMember.presence.game && newMember.presence.game.streaming === false) || !newMember.presence.game)) {
      //Le quitamos el rol [streaming]
      newMember.removeRole(newMember.guild.roles.find("name", "[twitch]"))
      .catch(err =>
        console.log(`${err.message} (leave [twitch])`)
      );
    }
}
