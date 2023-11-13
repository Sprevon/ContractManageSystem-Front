export class HTTPResponse {

    constructor(data) {
        this._message = data._message;
        this._code = data._code;
        this._total = data._total;
        this._data = data._data;
        this._data = data;
    }


    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    get message() {
        return this._message;
    }

    set message(value) {
        this._message = value;
    }

    get code() {
        return this._code;
    }

    set code(value) {
        this._code = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}