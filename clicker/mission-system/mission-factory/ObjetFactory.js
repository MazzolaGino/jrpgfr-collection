import Objet from "../Objet.js";

export default class ObjetFactory {

    static getList() {

        return [
            new Objet('Banana', 100),
            new Objet('Bread', 200),
            new Objet('Carrot', 50),
            new Objet('Cheese', 150),
            new Objet('Cherry', 200),
            new Objet('Fish', 300),
            new Objet('Grapes', 50),
            new Objet('GreenGrapes', 50),
            new Objet('GreenPepper', 50),
            new Objet('Lemon', 100),
            new Objet('Meat', 1000),
            new Objet('Mulberry', 50),
            new Objet('Mushroom', 50),
            new Objet('Nut', 300),
            new Objet('Orange', 100),
            new Objet('Pear', 100),
            new Objet('Pie', 100),
            new Objet('Pineapple', 100),
            new Objet('Radish', 100),
            new Objet('Raw Fish', 1000),
            new Objet('Raw Meat', 1000),
            new Objet('Red Pepper', 100),
            new Objet('Strawberry', 100),
            new Objet('Watermellon', 100),
            new Objet('Yellow Pepper', 100)
        ];

    }

    static getRandomObjet() {
        const randomIndex = Math.floor(Math.random() * ObjetFactory.getList().length);
        let objet = ObjetFactory.getList()[randomIndex];
        objet.image = 'assets/img/meat/I_C_' + objet.nom.replace(/ /g, '') + '.png';
        return objet;
    }
}