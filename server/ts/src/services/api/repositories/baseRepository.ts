export default interface IBaseRepository<T>{
    createNewDoc(doc: T): Promise<T>;
    findOneDoc(filter: any): Promise<T|null>;
    findDocs(filter: any): Promise<T[]|null>;
    deleteOneDoc(filter: any): void;
    deleteDocs(filter: any): void;
    updateDoc(filter: any, updatedDoc: T): Promise<T|null>
}