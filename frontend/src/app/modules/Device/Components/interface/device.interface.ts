export interface Devices{
    name: string;

    user:number;

    id:number;
}

export interface DevicesCreate{
    name: string;

    user:number;

}


export interface DevicesUpdate{
    name?:string
    user?:number
  }