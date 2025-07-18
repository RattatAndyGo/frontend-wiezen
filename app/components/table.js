import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class tableComponent extends Component {
  @tracked submittedPlayers = false;
  players = [null, null, null, null];       // The four players

  @action
  submitPlayers(){
    if(!this.players.includes(null)){
        this.submittedPlayers = true;
    }
  }

  @action
  // Adds a new hand to the Triplestore and updates UI
  // gameType is any of "Vraag mee", "Alleen", "Abondance 9"...
  // gamePlayers is an boolean array of length 4 denoting who took the contract
  // pointsEarned is an int array of length 4 denoting how many points each player earned
  addNewRow(gameType, gamePlayers, pointsEarned){
    // Calculate new point totals
    // If there is a previous game, add pointsEarned to previous total
    // If this is the first game, set equal to points from this game
    let newTotal = [];
    if(this.games.length > 0){
        this.games[this.games.length - 1].pointsTotal.forEach((e, idx) => {
            newTotal.push(Number(e) + Number(pointsEarned[idx]));
        });
    }else{
        newTotal = pointsEarned;
    }

    // TODO send to triplestore

    this.games=[...this.games, {
        gameType: gameType,
        gamePlayers: gamePlayers,
        pointsEarned: pointsEarned,
        pointsTotal: newTotal
    }];
  }

  @tracked games = [];
}
