//Roles asignados de manera especial y de Administración
const special = ["[admin]", "[sub-admin]", "[project]", "[bot]", "[darkbot coder]", "tercer componente de Daft Punk", "[salt]", "[helper]"];

module.exports = {
roles: ["@everyone"],
descr: "Te asigna o elimina de un rol.",
exec: (message, args) => {
  if (args[1] && args[2]) {
    //Reemplaza los "_" por espacios en el nombre del rol
  let roleName = args[2].replace(/_/g, " ");
  let rol = (() => {
      return args[2] ? message.guild.roles.findKey("name", roleName) : "";
  })();
  if (rol) {
    //Si el rol se encuentra en "special", avisa al usuario de manera privada
    //De no ser así, busca que el argumento sea "leave" o "join"
    if(special.includes(roleName)) {
      message.author.sendMessage("No puedes escojer ese rol :thinking:");
    } else if (args[1] == "join") {
        message.member.addRole(rol);
        message.author.sendMessage(`Te has unido a \`${roleName}\``);
    } else if (args[1] == "leave") {
      message.member.removeRole(rol);
      message.author.sendMessage(`Has salido de \`${roleName}\``);
      //Si el arugumento no es "leave" o "join", avisa al usuario de manera privada
    } else {
      message.author.sendMessage("Uso: !rol join/leave [nombre], asegurate de usar `_` en lugar de espacios en el nombre.");
    }
    //Si el rol no existe, le avisa al usuario de mandera privada
  } else {
    message.author.sendMessage("Ese rol no existe, asegurate de usar `_` en lugar de espacios en el nombre")
  }
  //Si no se ha usado el comando correctamente, avisa al usuario de manera privada
} else {
  message.author.sendMessage("Uso: !rol join/leave [nombre], asegurate de usar `_` en lugar de espacios en el nombre.");
}
message.delete();
}
}
