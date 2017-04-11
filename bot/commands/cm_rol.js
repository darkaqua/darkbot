module.exports = {
	roles: ["@everyone"],
	descr: "Te asigna o elimina de un rol.",
	exec: (message, args) => {
		message.delete();
		//Si no se ha usado el comando correctamente, avisa al usuario de manera privada
		if(!args[1] || !args[2]){
			message.author.sendMessage("Uso: !rol join/leave [nombre]");
			return;
		}
		let roleName = args.splice(2).join(' ');
		let rol = roleName ? message.guild.roles.findKey("name", roleName) : "";
		//Si el rol no existe o no es auto asignable
		//avisa al usuario de manera privada
		if(!rol || !global.config.roles.includes(roleName)){
			message.author.sendMessage("Ese rol no existe o no es auto asignable :thinking:\nrevisa que lo hayas escrito correctamente.");
			return;
		}
		//Si el rol es auto asignable
		//busca que el argumento sea "leave" o "join"
		if (args[1] == "join") {
			message.member.addRole(rol).then(member =>
				message.author.sendMessage(`Te has unido a \`${roleName}\``)
			).catch(err => {
				message.author.sendMessage(`Se ha producido un error.`);
				console.log(err.message);
			});
			return;
		} else if (args[1] == "leave") {
			message.member.removeRole(rol).then(member =>
				message.author.sendMessage(`Has salido de \`${roleName}\``)
			).catch(err => {
				message.author.sendMessage(`Se ha producido un error.`);
				console.log(err.message);
			});
			return;
		}
		//Si el arugumento no es "leave" o "join", avisa al usuario de manera privada
		message.author.sendMessage("Uso: !rol join/leave [nombre].");
	}
}
