// Función de ejemplo para validar usuario
export function validarUsuario(usuario, contraseña) {
  // Validar contra la lista de usuarios
  const usuarios = obtenerUsuarios();
  const encontrado = usuarios.find(
    (u) => u.usuario === usuario && u.contraseña === contraseña
  );
  if (encontrado) {
    return { ok: true, usuario: encontrado };
  } else {
    return { ok: false, mensaje: 'Usuario o contraseña incorrectos' };
  }
}

// Función de ejemplo para obtener usuarios
export function obtenerUsuarios() {
  // Retorna un array de usuarios de ejemplo
  return [
    {
      usuario: '123',
      codigo: '123',
      nombre: 'Administrador',
      contraseña: '123',
      rol: 'administrador',
      email: 'admin@correo.com'
    },
    {
      usuario: 'user1',
      nombre: 'Usuario Uno',
      contraseña: 'user1pass',
      rol: 'usuario'
    }
  ];
}
