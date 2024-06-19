export interface Sensor{
    id:number
    type: string
    description: string
    escenary:number
    device:number
}

export interface SensorCreate{
    type: string
    description: string
    escenary:number
    device:number
}


export interface SensorUpdate{
    type?: string
    description?: string
    escenary?:number
    device?:number
  }

export interface SensorData{
    id:number
    type: string
    description: string
    userName: string
}