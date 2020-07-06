export interface User
{
    id : number,
    name : string,
    email : string,
}
export interface RegisterUser
{ 
    name : string,
    email : string,
    password : string,
    device_name : string
}
export interface LoginUser
{
    email : string,
    password : string,
    device_name : string,
    token : string
}

export class ConnectedUser
{
    id : number
    name : string
    email : string
    token : string
}
