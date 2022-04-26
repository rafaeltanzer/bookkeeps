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

    }
    
    field: string;
    value: any;
    msg: string;

}