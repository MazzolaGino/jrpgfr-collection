import GameSave from "./game/GameSave.js";
import Config from "./resource/Config.js";
import Display from "./tool/Display.js";
import NumberFormatter from "./tool/NumberFormatter.js";
import Observable from "./tool/Observable.js";
import Blob from "./Blob.js";

export default class WeaponShop extends Observable {
  static load(id = 'blob-weapon-shop', onlyItems = false) {

    const element = document.getElementById(id);
    element.innerHTML = '';

    if (!onlyItems) {
      element.innerHTML = `
          <div class="blob-menu-header"> Weapon Shop </div>
        `;
    }

    const save = GameSave.getSave();

    let weaponShopItems = save.weapon_shop;

    if (weaponShopItems.length < 1) {

      save.weapon_shop = this.getDefaultWeaponShopItems();
      GameSave.setSave(save);
      weaponShopItems = save.weapon_shop;
    }

    weaponShopItems.forEach((item) => {
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
    const weaponShopItem = save.weapon_shop.find((item) => item.name === name);

    if (weaponShopItem) {
      weaponShopItem.nb++;
      weaponShopItem.price *= parseFloat(save.difficulty);
      GameSave.setSave(save);
    }
  }

  static click(event) {
    const li = event.target.closest('div');

    if (li) {
      const item = JSON.parse(li.dataset.value);

      if (this.canBuy(item.price)) {
        item.nb++;
        GameSave.setClicks(parseFloat(GameSave.getSave().clicks) - parseFloat(item.price));
        item.price *= GameSave.getSave().difficulty;
        li.dataset.value = JSON.stringify(item);
        this.increment(item.name);

        li.querySelector('.shop-item-nb').textContent = NumberFormatter.format(item.nb);
        li.querySelector('.shop-item-price').textContent = NumberFormatter.format(item.price);

        Display.clickCount(Config.getBlobCountId(), GameSave.getSave().clicks);
        Blob.updateStatistics();

        WeaponShop.load('modal-weapon-shop', true);
      }
    }
  }

  static line(item, id = 'blob-weapon-shop') {

    const element = document.getElementById(id);
    element.classList.add('blob-menu');

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
    vItemNb.textContent = ` ${NumberFormatter.format(item.nb)}`;

    const vItemPrice = document.createElement('span');
    vItemPrice.classList.add('shop-item-price');
    vItemPrice.textContent = NumberFormatter.format(item.price);

    vItem.append(vItemImg, vItemNb, vItemPrice);
    element.append(vItem);
  }

  static getDefaultWeaponShopItems() {
    return [
      {
        name: 'Dagger',
        img: 'W_Dagger001.png',
        bonus: 5,
        nb: 0,
        price: 1000
      },
      {
        name: 'Force Dagger',
        img: 'W_Dagger002.png',
        nb: 0,
        bonus: 10,
        price: 2500
      }
    ];
  }
}
