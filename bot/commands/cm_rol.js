module.exports = {
	roles: ["@everyone"],
	descr: "Te asigna o elimina de un rol.",
	exec: (message, args) => {
		if (args[1] && args[2]) {
			let roleName = args.splice(2).join(' ');
			let rol = roleName ? message.guild.roles.findKey("name", roleName) : "";
			if (rol && global.config.roles.includes(roleName)) {
				//Si el rol es auto asignable
				//busca que el argumento sea "leave" o "join"
				if (args[1] == "join") {
					message.member.addRole(rol);
					message.author.sendMessage(`Te has unido a \`${roleName}\``);
				} else if (args[1] == "leave") {
					message.member.removeRole(rol);
					message.author.sendMessage(`Has salido de \`${roleName}\``);
					//Si el arugumento no es "leave" o "join", avisa al usuario de manera privada
				} else {
					message.author.sendMessage("Uso: !rol join/leave [nombre].");
				}
				//Si el rol no existe o no es auto asignable
				//avisa al usuario de manera privada
			} else {
				message.author.sendMessage("Ese rol no existe o no es auto asignable :thinking:\nrevisa que lo hayas escrito correctamente.");
			}
			//Si no se ha usado el comando correctamente, avisa al usuario de manera privada
		} else {
			message.author.sendMessage("Uso: !rol join/leave [nombre]");
		}
		message.delete();
	}
}
