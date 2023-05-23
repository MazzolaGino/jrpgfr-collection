export default class Config {
    static getRemoteUrl() {
        return 'http://my-collection.local';
    }

    static getLocalUrl() {
        return 'http://my-collection-client.local';
    }

    static getRoot() {
        return 'app';
    }

    static getAuthenticationUrl() {
        return 'https://jrpgfr.net/wp-json/wfactor/v1/token';
    }

    static getMeUrl() {
        return 'https://jrpgfr.net/wp-json/wfactor/v1/user';
    }

    static getValidateUrl() {
        return 'https://jrpgfr.net/wp-json/wfactor/v1/validate';
    }

    static getPasswordResetUrl() {
        return 'https://jrpgfr.net/entre/?action=lostpassword';
    }
}