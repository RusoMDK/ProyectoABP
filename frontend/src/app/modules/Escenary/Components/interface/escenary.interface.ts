export interface Escenary{
    id:number;
    name:string;
    description:string;
    user:number
}

export interface EscenaryCreate{
    name:string;
    description:string;
    user:number
}


export interface EscenaryUpdate{
    name?:string;
    description?:string;
    user?:number
  }