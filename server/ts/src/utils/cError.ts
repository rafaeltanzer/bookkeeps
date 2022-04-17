export class CError extends global.Error{
    constructor(msg: string){
        super(msg);

        Object.setPrototypeOf(this, CError.prototype);//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
    }
    name: string = 'CError';    
}
export class DatabaseRecordError extends CError{
    /**
     *
     */
    constructor(msg: string) {
        super(msg);
        this.name = 'DatabaseRecordError';
        this.errors = {};
    }

    errors: { [path: string]: DatabaseFieldError}
    addError = (path: string, error: DatabaseFieldError) => {
        this.errors[path] = error;
    };
}

export class DatabaseFieldError extends CError{
    constructor(msg: string, properties: {field: string, value: any, message: string}){
        super(msg);
        this.name = 'DatabaseValueError';
        this.field = properties.field;
        this.message = properties.message;
        this.value = properties.value;

    }
    
    field: string;
    value: any;
    message: string;

}