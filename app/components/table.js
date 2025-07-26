import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class tableComponent extends Component {
  @service store;

  @tracked submittedPlayers = false;
  players = [null, null, null, null]; // The four players

  @action
  async submitPlayers() {
    if (this.players.includes(null) || this.players.includes("")) {
      return;   // Stop if not all names are entered
    }

    // Generate round
    const round = this.store.createRecord('round');
    await round.save();
    let round_players = await round.players;

    for(let i in this.players){
      this.store.query('player', {filter: { name: this.players[i] }})
        .then(async (records) => {
          // Get player from store, or if no results are found,
          // create and save new player
          let player;
          if(records.length == 0){
            player = this.store.createRecord('player', {
              name: this.players[i]
            });
            await player.save();
          }else{
            player = records[0];
          }

          // Link player with round
          round_players.push(player);
          await player.save();
        });
    }
    
    await round.save();

    this.submittedPlayers = true;    
  }

  @action
  addNewRow(contract, gamePlayers, pointsEarned) {
    // Calculate new point totals
    let newTotal = [];
    if (this.games.length > 0) {
      this.games[this.games.length - 1].pointsTotal.forEach((e, idx) => {
        newTotal.push(Number(e) + Number(pointsEarned[idx]));
      });
    } else {
      newTotal = pointsEarned;
    }

    // TODO send to triplestore

    this.games = [
      ...this.games,
      {
        contract: contract,
        gamePlayers: gamePlayers,
        pointsEarned: pointsEarned,
        pointsTotal: newTotal,
      },
    ];
  }

  @tracked games = [];
}
