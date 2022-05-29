export class CError extends global.Error{
    constructor(message: string, name: string = "CError"){
        super(message);
        this.name = name;
        Object.setPrototypeOf(this, CError.prototype);//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
    }
    name: string;    
}
export class DatabaseRecordError extends CError{
    /**
     *
     */
    constructor(message: string, name: string = "DatabaseRecordError") {
        super(message);
        this.name = name;
        this.errors = {};
        Object.setPrototypeOf(this, DatabaseRecordError.prototype)//https://www.dannyguo.com/blog/how-to-fix-instanceof-not-working-for-custom-errors-in-typescript/
    }
    errors: { [path: string]: DatabaseFieldError}
    addError = (path: string, error: DatabaseFieldError) => {
        this.errors[path] = error;
    };
}

export class DatabaseFieldError extends CError{
    constructor(message: string, properties: {field: string, value: any, msg: string}){
        super(message);
        this.name = 'DatabaseValueError';
        this.field = properties.field;
        this.msg = properties.msg;
        this.value = properties.value;
        Object.setPrototypeOf(this, DatabaseFieldError.prototype)

    }
    
    field: string;
    value: any;
    msg: string;

}