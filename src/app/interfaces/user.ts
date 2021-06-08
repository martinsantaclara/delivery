export interface Roles {
  editor?: boolean;
  admin?: boolean;
}

export interface UserI {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  photoUrl?: string;
  direccion?: string;
  telefono?: string;
  roles: Roles;
}
