export class Model {
}
export class Title {
    id!: number;
    text!:string;
    categoryId!:number;
}

export class Category {
    id!: number;
    text!:string;
}

export class User {
    user:string|undefined;
    role:number|undefined
}

export enum Role {
    User = 'User',
    Admin = 'Admin'
}

export class UserToken {
    id!: number;
    userName!: string
    email!: string;
    role!: Role;
    token!: string;
  }
  
  export class UserLogin {
    email!: string;
    password!: string;
  }
  
  export class JwtToken {
    id!: string;
    given_name!: string;
    email!: string;
    role!: Role;
    exp!: number;
    iat!: number;
    nbf!: number;
  }
  
  export class UserJwtToken {
    id!: number;
    name!: string;
    email!: string;
    role!: Role;
    exp!: number;
    iat!: number;
    nbf!: number;
  }