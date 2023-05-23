import CookieManager from './CookieManager.js';


export default class Endpoint {
    static addToCollection(id) {
        console.log(id);
        return {
            controller: 'GameEndpoint',
            action: 'addToCollection',
            params: {
                token : CookieManager.getCookie('token'),
                object: id
            }

        };
    }

    static getGameList(value) {
        return {
            controller: 'GameEndpoint',
            action: 'getList',
            params: {
                token: CookieManager.getCookie('token'),
                search: value
            }
        };
    }

    static getCollection(search) {
        return {
            controller: 'GameEndpoint',
            action: 'getCollection',
            params: {
                token: CookieManager.getCookie('token'),
                search: search
            }
        };
    }

    static saveCollectionItem(data) {
        return {
            controller: 'GameEndpoint',
            action: 'updateCollectionItem',
            params: {
                token: CookieManager.getCookie('token'),
                item: data
            }
        };
    }
    static getCollectionItem(id){
        return {
            controller: 'GameEndpoint',
            action: 'getCollectionItem',
            params: {
                token: CookieManager.getCookie('token'),
                id: id
            }
        };
    }
   
   
}