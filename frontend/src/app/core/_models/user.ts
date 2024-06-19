export interface User {
  id: number;
  sub: number,
  username: string;
  email: string;
  role: {
    name: string;
  };
  modules: string; // O el tipo adecuado si no es string
  permissions: string; // O el tipo adecuado si no es string
}
