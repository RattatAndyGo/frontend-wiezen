import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TableRowComponent extends Component {
  @tracked isSubmitted = false;

  gameTypes = [
    'Vraag mee',
    'Alleen',
    'Abondance 9',
    'Abondance 10',
    'Miserie',
    'Abondance 11',
    'Abondance 12',
    'Troel',
    'Troela',
    'Solo',
    'Solo Slim',
  ];

  gameType = '';
  gamePlayers = [false, false, false, false];
  pointsEarned = [0, 0, 0, 0];
  pointsTotal = [0, 0, 0, 0];

  @action submitGame() {
    this.isSubmitted = true;
  }
}
