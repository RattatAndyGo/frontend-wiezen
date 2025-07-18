import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class tableComponent extends Component {

  @action
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
