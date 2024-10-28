export class User {
    constructor(
        public _id: string,
        public name: string,
        public email: string,
        private password: string,
        private _token: string,
        public expiresInMiliSec: number,
        private _tokenExpirationDate?: Date
    ) { }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}