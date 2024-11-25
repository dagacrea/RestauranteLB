import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";

export function authConfig() {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new Strategy(jwtOptions, async (payload, next) => {
      // Si llegamos a este punto es porque el token es valido
      console.log("en strategy", payload);

      /* Con base de datos */

      // Obtengo informacion extra de la DB (opcional)
      const [usuarios] = await db.execute(
        "SELECT nombre FROM usuarios WHERE nombre = ?",
        [payload.nombre]
      );

      // Si hay al menos un usuario reenviarlo
      if (usuarios.length > 0) {
        next(null, usuarios[0]);
      } else {
        next(null, false);
      }
    })
  );
}
