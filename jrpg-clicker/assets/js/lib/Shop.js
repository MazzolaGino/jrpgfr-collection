import GameSave from "./game/GameSave.js";
import Config from "./resource/Config.js";
import Display from "./tool/Display.js";
import NumberFormatter from "./tool/NumberFormatter.js";
import Observable from "./tool/Observable.js";
import Blob from "./Blob.js";

export default class Shop extends Observable {
    static load(id = 'blob-shop', onlyItems = false) {

        document.getElementById(id).innerHTML = '';
        if (onlyItems === false) {
            document.getElementById(id).innerHTML = `
                <div class="blob-menu-header"> Shop </div>
            `
        }

        const save = GameSave.getSave();

        let shopItems = save.shop;

        if (shopItems.length < 1) {
            save.shop = this.getDefaultShopItems();
            GameSave.setSave(save);
            shopItems = save.shop;
        }

        shopItems.forEach((item) => {
            if (this.canBuy(item.price)) { 
                this.line(item, id);
            }
        });

    }

    static canBuy(price) {
        return price <= GameSave.getSave().clicks;
    }

    static increment(name) {

        const save = GameSave.getSave();
        const shop = save.shop.find(item => item.name === name);

        if (shop) {

            shop.nb++;
            shop.price *= parseFloat(save.difficulty);
            GameSave.setSave(save);
        }
    }

    static click(event) {

        let li = event.target.closest('div.blob-menu-item');

        // get item from li dataset
        const item = JSON.parse(li.dataset.value);

        if (this.canBuy(item.price)) {

            // Increment
            item.nb++;

            // Decrement clicks
            GameSave.setClicks(parseFloat(GameSave.getClicks()) - parseFloat(item.price));

            // create new price
            item.price *= GameSave.getSave().difficulty;

            // Save on li dataset
            li.dataset.value = JSON.stringify(item);

            // Save on cookies
            this.increment(item.name, item.price);

            // Refresh view
            li.querySelector('.shop-item-nb').textContent = NumberFormatter.format(item.nb);
            li.querySelector('.shop-item-price').textContent = NumberFormatter.format(item.price);

            // notify the view for click count change
            Display.clickCount(Config.getBlobCountId(), GameSave.getClicks());

            Blob.updateStatistics();

            Shop.load('modal-shop', true);

        }


    }

    static line(item, id = 'blob-shop') {
        const el = document.getElementById(id);
        el.classList.add('blob-menu');

        const vItem = document.createElement('div');
        vItem.classList.add('blob-menu-item');
        vItem.dataset.value = JSON.stringify(item);
        vItem.addEventListener('click', (event) => this.click(event));

        const vItemImg = document.createElement('img');
        vItemImg.src = `assets/img/icons/${item.img}`;

        const vItemName = document.createElement('span');
        vItemName.classList.add('shop-item-name');
        vItemName.textContent = item.name;

        const vItemNb = document.createElement('span');
        vItemNb.classList.add('shop-item-nb');
        vItemNb.textContent = ' ' + NumberFormatter.format(item.nb);

        const vItemPrice = document.createElement('span');
        vItemPrice.classList.add('shop-item-price');
        vItemPrice.textContent = NumberFormatter.format(item.price);

        vItem.append(vItemImg, vItemNb, vItemPrice);

        el.append(vItem);
    }

    static getDefaultShopItems() {
        return [
            {
                name: 'Silver Medal',
                img: 'Ac_Medal02.png',
                bonus: 0.1,
                nb: 0,
                price: 10
            },
            {
                name: 'Gold Medal',
                img: 'Ac_Medal01.png',
                nb: 0,
                bonus: 0.2,
                price: 100
            },
            {
                name: 'Cross Medal',
                img: 'Ac_Medal03.png',
                nb: 0,
                bonus: 0.3,
                price: 1000
            },
            {
                name: 'Blue Medal',
                img: 'Ac_Medal04.png',
                bonus: 0.5,
                nb: 0,
                price: 2000
            },
            {
                name: 'Red Necklace',
                img: 'Ac_Necklace01.png',
                bonus: 0.75,
                nb: 0,
                price: 3000
            },
            {
                name: 'Blue Necklace',
                img: 'Ac_Necklace02.png',
                bonus: 0.85,
                nb: 0,
                price: 5000
            }
        ];
    }
}