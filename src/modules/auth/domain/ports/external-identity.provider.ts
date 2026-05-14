import { LoginCredentials } from '../types/login-credentials.type';
import { AuthenticatedUser } from '../types/authenticated-user.type';

export interface IExternalIdentityProvider {
  /**
   * Valida las credenciales contra un sistema externo.
   * Debe lanzar una excepción si las credenciales son inválidas.
   *
   * @param credentials Objeto inmutable con correo y contraseña.
   * @returns Los datos básicos del usuario necesarios para firmar el token.
   */
  validateUser(credentials: LoginCredentials): Promise<AuthenticatedUser>;
}
