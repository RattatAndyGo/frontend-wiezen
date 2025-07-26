import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NewRowComponent extends Component {
  @tracked contract = '';
  @tracked gamePlayers = [false, false, false, false];
  @tracked pointsEarned = [0, 0, 0, 0];

  @action
  resetValues() {
    this.contract = '';
    this.gamePlayers = [false, false, false, false];
    this.pointsEarned = [0, 0, 0, 0];
  }

  @action
  submitGame() {
    // TODO validate inputs

    if (this.contract && this.args.onCreate) {
      this.args.onCreate(this.contract, this.gamePlayers, this.pointsEarned);
      this.resetValues();
    }
  }
}
