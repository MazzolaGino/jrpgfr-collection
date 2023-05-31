import CookieManager from "../tool/CookieManager.js";

export default class GameSave {

    static init() {
        if (!this.getSave()) {
            this.createSave();
        }
    }

    static createSave() {
        CookieManager.setCookie('game', JSON.stringify({
            difficulty: 1.5,
            clicks: 1,
            click_rate: 1,
            level: 1,
            exp: 0.0,
            exp_to_level_base: 100,
            exp_next_level: 100,
            adv_base: [10, 30],
            bonus: [],
            inventory: [],
            shop: []
            

        }), 1000);
    }

    static getSave() {
        return JSON.parse(CookieManager.getCookie('game'));
    }

    static getClickRate() {
        return this.getSave().click_rate;
    }

    static getClicks() {
        return this.getSave().clicks;
    }

    static getBonus() {
        let save = JSON.parse(CookieManager.getCookie('game'));
        return save.bonus;
    }

    static setSave(json) {
        CookieManager.setCookie('game', JSON.stringify(json), 1000);
    }

    static setClickRate(rate) {
        let save = this.getSave();
        save.click_rate = rate;
        this.setSave(save);
    }

    static setClicks(clicks) {
        let save = this.getSave();
        save.clicks = clicks;
        this.setSave(save);
    }

    static setBonus(bonus) {
        let save = this.getSave();
        save.bonus = bonus
        this.setSave(save);
    }

    static setInventoryItem(item) {
        let save = this.getSave();

        if (!save.inventory) {
            save.inventory = [];
        }

        save.inventory.push(item);

        this.setSave(save);
    }

    static setShopItem(item) {

        let save = this.getSave();

        if (!save.shop) {
            save.shop = [];
        }

        save.shop.push(item);

        this.setSave(save);
    }
}