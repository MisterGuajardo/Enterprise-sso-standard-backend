import { JwtPayload } from '../types/jwt-payload.type';

export interface ITokenProvider {
  /**
   * Toma un payload inmutable y retorna un JWT firmado criptográficamente.
   *
   * @param payload Objeto con los datos del usuario autenticado.
   * @returns El token firmado en formato string.
   */
  signPayload(payload: JwtPayload): Promise<string>;
}
