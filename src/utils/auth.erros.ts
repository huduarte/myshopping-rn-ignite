export const ErrorMessages = (code: string): string => {
  switch(code){
    case 'auth/weak-password':
      return 'A senha deve conter no minímo 6 digitos'
    case 'auth/invalid-email':
      return 'E-mail inválido'
    case 'auth/email-already-in-use':
      return 'E-mail já cadastrado, tente novamente'
    default:
      return 'Houve um erro ao cadastrar usuário, tente novamente!'
  }
}