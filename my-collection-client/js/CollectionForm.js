import Call from "./Call.js";
import Endpoint from "./Endpoints.js";
import Notif from "./Notif.js";
import Spinner from "./Spinner.js";
import Config from "./Config.js";
import Field from "./Field.js";
import CollectionFormTemplate from "./CollectionFormTemplate.js";
import FieldComponent from "./FieldComponent.js";

export default class CollectionForm extends FieldComponent{

    constructor(element) {
        let template = new CollectionFormTemplate(element);
        super(template.form, template);
        this.element = element;
    }

    load() {
        this.createRating();
        this.createHours();
        this.createStatus();
        this.createReview();
        this.createSubmit();
        this.createDelete();
    }

    createRating() {
        this.rating = new Field(this.template.rating, this.element.form.rating, 'number')
        this.rating.classes = 'uk-input';
        this.rating.load(this.template.rating);
    }

    createHours() {
        this.hours = new Field(this.template.hours, this.element.form.hours_number, 'number')
        this.hours.classes = 'uk-input';
        this.hours.load(this.template.hours);
    }

    createStatus() {
        const statusValue = this.element.form.status || '';
        this.status = new Field(this.template.status, statusValue, 'select', 'select');
        this.status.classes = 'uk-select';
        this.status.options = [
            { value: 'Not Started', label: 'Non commencé' },
            { value: 'In Progress', label: 'En cours' },
            { value: 'Completed', label: 'Terminé' }
        ];
        this.status.load(this.template.status);
    }

    createReview() {
        this.review = new Field(this.template.review, this.element.form.review, 'textarea', 'textarea')
        this.review.classes = 'uk-input';
        this.review.load(this.template.review);
    }

    createSubmit() {
        this.submit = new Field(this.template.submit, '<i class="fa-regular fa-floppy-disk"></i> Sauver', 'a', 'a');
        this.submit.classes = '';
        this.submit.eventHandler = (event) => {
            this.save(event);
        }
        this.submit.load(this.template.submit);
    }

    createDelete() {
        this.delete = new Field(this.template.delete, '<i class="fa-solid fa-trash"></i> Supprimer', 'a', 'a');
        this.delete.classes = '';
        this.delete.eventHandler = (event) => {
            this.remove(event);
        }
        this.delete.load(this.template.delete);
    }

    remove(event) {
        let notif = new Notif();
        notif.success('le jeu a été supprimé de ta collection');
        this.erase(this.template.parent);
    }

    save(event) {

        let toSend = {
            game_id: this.element.id,
            rating: this.rating.value,
            hours_number: this.hours.value,
            status: this.status.value,
            review: this.review.value
        }

        let call = new Call(Config.getRemoteUrl());
        let notif = new Notif();
        let spinner = new Spinner('spinner');

        spinner.show('Nous enregistrons tes infos ...');

        call.post(Endpoint.saveCollectionItem(toSend), (success) => {
            notif.success('Ta fiche de jeu est modifiée !');
            spinner.hide();
        }, (error) => {
            spinner.hide();
            notif.error('Il y a eu un soucis durant la sauvegarde...');
        });

    }
}
