import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class SearchComponent extends Component {
    @service router;
    @tracked playername = "";

    @action
    searchPlayer(){
        this.router.transitionTo('search', this.playername);
    }
}
