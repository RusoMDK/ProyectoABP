export interface User{
    id:number;

    name: string;

    username: string;
  
    email: string;
  
    password: string;
  
    role?: number;
}

export interface UserCreate{
    name: string;

    username: string;
  
    email: string;
  
    password: string;
  
    role?: number;
}


export interface UserUpdate{
    name?: string;

    username?: string;
  
    email?: string;
  
    password?: string;
  
    role?: number;
  }