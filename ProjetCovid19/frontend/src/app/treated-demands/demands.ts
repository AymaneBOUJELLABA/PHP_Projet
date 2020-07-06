export interface demand
{
    nom : string,
    prenom : string,
    user_id: number,
    isTreated : number,
    Q1:string,
    Q2:string,
    Q3:string,
    Q4:string,
    Q5:string,
    
    resultat:string,
}

export interface GraphData
{
    notTreated : number,

    positif : number,

    negatif : number,
}