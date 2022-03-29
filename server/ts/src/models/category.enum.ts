export enum Category{
    Personal = 1,
    Buisness,
    Leisure,
    Food,
    Friends
}

export let CategoryList : string[] = Object.values(Category).filter(val => typeof val === 'string') as string[];