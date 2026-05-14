export type JwtPayload = {
  /**
   * Subject: Identificador universal del usuario en todo tu ecosistema.
   * Al ser sistemas distribuidos, usaremos el correo electrónico como 'sub'.
   */
  readonly sub: string;

  /* 
   Nota: Al usar el correo como 'sub', ya no necesitamos repetir 
   'readonly email: string' a menos que lo requieras por comodidad 
   en el frontend, pero a nivel estricto, el 'sub' ya cumple esa función.
   
   readonly allowedSystems?: string[];
  */
};
