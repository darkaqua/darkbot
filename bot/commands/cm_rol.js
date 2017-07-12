module.exports = {
	roles: ["@everyone"],
	descr: "Te asigna o elimina de un rol.",
	exec: (message, args) => {
		message.delete();
		//Si no se ha usado el comando correctamente, avisa al usuario de manera privada
		if(!args[1] || !args[2]){
			message.author.send("Uso: !rol join/leave [nombre]");
			return;
		}
		let roleName = args.splice(2).join(' ');
		let rol = roleName ? message.guild.roles.findKey("name", roleName) : "";
		//Si el rol no existe o no es auto asignable
		//avisa al usuario de manera privada
		if(!rol || !global.config.roles.includes(roleName)){
			message.author.send("Ese rol no existe o no es auto asignable :thinking:\nrevisa que lo hayas escrito correctamente.");
			return;
		}
		//Si el rol es auto asignable
		//busca que el argumento sea "leave" o "join"
		if (args[1] === "join") {
			message.member.addRole(rol).then(member =>
				message.author.send(`Te has unido a \`${roleName}\``).catch(console.error)
			).catch(err => {
				message.author.send(`Se ha producido un error.`).catch(console.error);
				console.error(err.message);
			});
			return;
		} else if (args[1] === "leave") {
			message.member.removeRole(rol).then(member =>
				message.author.send(`Has salido de \`${roleName}\``).catch(console.error)
			).catch(err => {
				message.author.send(`Se ha producido un error.`).catch(console.error);
				console.error(err.message);
			});
			return;
		}
		//Si el arugumento no es "leave" o "join", avisa al usuario de manera privada
		message.author.send("Uso: !rol join/leave [nombre].");
	}
}
