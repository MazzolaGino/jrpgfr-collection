import _ from "../game/GameSave.js";

export default class DungeonManager {
  static instance = null;

  static getInstance() {
    if (!DungeonManager.instance) {
      DungeonManager.instance = new DungeonManager();
    }
    return DungeonManager.instance;
  }

  constructor() {
    if (DungeonManager.instance) {
      throw new Error("DungeonManager is a singleton. Use getInstance() instead.");
    }
    this.current = null;
    DungeonManager.instance = this;
  }

  setCurrent(name) {
    this.current = this.get(name);
  }

  unsetCurrent() {
    this.current = null;
  }

  reset(name) {
    const dungeon = this.get(name);
    if (dungeon) {
      dungeon.encounters = 20;
      this.updateStorage(dungeon);
    }
  }

  decrement() {
    const dungeon = this.get(this.current.name);
    if (dungeon && dungeon.encounters > 0) {
      dungeon.encounters--;
      this.updateStorage(dungeon);
    }
  }

  end() {
    return this.get(this.current.name).encounters <= 0;
  }

  bossDefeated() {
    let boss = this.get(this.current.name).boss;

    if(boss === 1) {
      return false;
    }

    return true;
  }

  defeatBoss() {
    let dungeon = this.get(this.current.name);
    dungeon.boss = 0;
    this.updateStorage(dungeon);
  }


  useKey() {

    let dungeon = this.get(this.current.name);
    dungeon.boss = 1;
    this.updateStorage(dungeon);

    const save = _.getSave();
    const keyIndex = save.inventory.findIndex(item => item.name === 'Key');

    if (keyIndex !== -1 && save.inventory[keyIndex].nb > 0) {
      save.inventory[keyIndex].nb--;
      if (save.inventory[keyIndex].nb === 0) {
        save.inventory = save.inventory.filter(item => item.name !== 'Key');
      }
      this.reset(this.current.name);
      _.setSave(save);
      
      return true;
    }

    return false;
  }

  add(name, value, level) {

    const dungeon = {
      name: name,
      encounters: value,
      level: level,
      boss: 1
    };

    if (!this.get(name)) {
      this.updateStorage(dungeon);
    }


  }

  remove(name) {
    localStorage.removeItem(name);
  }

  get(name) {
    const dungeonData = localStorage.getItem(name);
    if (dungeonData) {
      return JSON.parse(dungeonData);
    }
    return null;
  }

  updateStorage(dungeon) {
    localStorage.setItem(dungeon.name, JSON.stringify(dungeon));
  }

}