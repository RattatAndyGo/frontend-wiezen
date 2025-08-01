import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { sum } from '@ember/object/computed';

export default class NewRowComponent extends Component {
  @tracked contract = '';
  @tracked activePlayers = [false, false, false, false];
  @tracked pointsEarned = [0, 0, 0, 0];

  @action
  resetValues() {
    this.contract = '';
    this.activePlayers = [false, false, false, false];
    this.pointsEarned = [0, 0, 0, 0];
  }

  @action
  submitGame() {
    if(this.isValid() && this.args.onCreate) {
      this.args.onCreate(this.contract, this.activePlayers, this.pointsEarned);
      this.resetValues();
    }
  }

  isValid(){
    let contracts = {
      "Vraag mee": {
        "minimumActive": 2,
        "maximumActive": 2,
        "validPointsActive": [-20, -18, -16, -14, -12, -10 ,-8, -6, 2, 3, 4, 5, 6, 14],
        "validPointsOther": [20, 18, 16, 14, 12, 10, 8, 6, -2, -3, -4, -5, -6, -14]
      },
      "Alleen": {
        "minimumActive": 1,
        "maximumActive": 1,
        "validPointsActive": [-36, -30, -24, -18, -12, 6, 9, 12, 15, 18, 21, 24, 27, 60],
        "validPointsOther": [12, 10, 8, 6, 4, -2, -3, -4, -5, -6, -7, -8, -9, -20]
      },
      "Abondance": {
        "minimumActive": 1,
        "maximumActive": 1,
        "validPointsActive": [-15, 15],
        "validPointsOther": [5, -5]
      },
      "Abondance 10": {
        "minimumActive": 1,
        "maximumActive": 1,
        "validPointsActive": [-18, 18],
        "validPointsOther": [6, -6]
      },
      "Miserie": {
        "minimumActive": 1,
        "maximumActive": 4,
        "validPointsActive": [-42, -35, -28, -21, -14, -7, 0, 7, 14, 21, 28, 35, 42],
        "validPointsOther": [-21, -14, -7, 0, 7, 14, 21]
      },
      "Abondance 11": {
        "minimumActive": 1,
        "maximumActive": 1,
        "validPointsActive": [-24, 24],
        "validPointsOther": [8, -8]
      },
      "Abondance 12": {
        "minimumActive": 1,
        "maximumActive": 1,
        "validPointsActive": [-27, 27],
        "validPointsOther": [9, -9]
      },
      "Troel": {
        "minimumActive": 2,
        "maximumActive": 2,
        "validPointsActive": [-18, -16, -14, -12, -10, -8, -6, 4, 6, 8, 10, 12, 28],
        "validPointsOther": [18, 16, 14, 12, 10, 8, 6, -4, -6, -8, -10, -12, -28]
      },
      "Troela": {
        "minimumActive": 2,
        "maximumActive": 2,
        "validPointsActive": [-20, -18, -16, -14, -12, -10, -8, -6, 4, 6, 8, 10, 24],
        "validPointsOther": [20, 18, 16, 14, 12, 10, 8, 6, -4, -6, -8, -10, -24]
      },
      "Open miserie": {
        "minimumActive": 1,
        "maximumActive": 4,
        "validPointsActive": [-84, -70, -56, -42, -28, -14, 0, 14, 28, 42, 56, 70, 84],
        "validPointsOther": [-42, -28, -14, 0, 14, 28, 42]
      },
      "Solo": {
        "minimumActive": 1,
        "maximumActive": 1,
        "validPointsActive": [-75, 75],
        "validPointsOther": [25, -25]
      },
      "Solo slim": {
        "minimumActive": 1,
        "maximumActive": 1,
        "validPointsActive": [-90, 90],
        "validPointsOther": [30, -30]
      }
    };


    if(!Object.keys(contracts).includes(this.contract)){
      console.log("Invalid contract!");
      return false;
    }

    if(this.activePlayers.filter(x => x).length < contracts[this.contract]["minimumActive"]){
      console.log("Too few active players!");
      return false;
    }
    if(this.activePlayers.filter(x => x).length > contracts[this.contract]["maximumActive"]){
      console.log("Too many active players!");
      return false;
    }
    
    let sum = this.pointsEarned.map(num => Number(num)).reduce((acc, curr) => acc + curr, 0);
    if(sum != 0){
      console.log(`Score does not sum to zero! Sum is ${sum}`);
      return false;
    }

    if(this.contract == "Miserie" || this.contract == "Open miserie"){
      for(let i in this.activePlayers){
        let validPoints = this.activePlayers[i] ? contracts[this.contract]["validPointsActive"] : contracts[this.contract]["validPointsOther"];
        if(!validPoints.includes(this.pointsEarned[i])){
          console.log(`Invalid score for a ${this.contract} for player ${i} (zero indexed)!`);
        }
      }
      return true;  // Next check do not apply for Miserie
    }

    // Index corresponds to amount of slagen the active players won
    let slag = contracts[this.contract]["validPointsActive"].indexOf(Number(this.pointsEarned[this.activePlayers.indexOf(true)]));
    if(slag == -1){
      console.log("Impossible score for winning party!");
      return false;
    }
    for(let i in this.activePlayers){
      let validPoints = this.activePlayers[i] ? contracts[this.contract]["validPointsActive"] : contracts[this.contract]["validPointsOther"];
      if(this.pointsEarned[i] != validPoints[slag]){
        console.log(`Inconsistent points for player ${i} (zero indexed)! Expected ${validPoints[slag]}`);
        return false;
      }
    }

    return true;
  }
}
