import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class tableComponent extends Component {
  @service store;

  @tracked submittedPlayers = false;
  @tracked games = [];
  playernames = [null, null, null, null]; // The four player names
  players = [];                           // The four player records
  round = null;                           // The round record
  index = 0;                              // The index of the next hand

  @action
  async submitPlayers() {
    if (this.playernames.includes(null) || this.playernames.includes('')) {
      console.log("Not all names are entered");
      return; // Stop if not all names are entered
    }

    // Generate round
    this.round = this.store.createRecord('round');
    await this.round.save();

    for (let i in this.playernames) {
      let records = await this.store.query('player', {
        filter: { ':exact:name': this.playernames[i] },
      });

      // Get player from store, or if no results are found,
      // create and save new player
      let player;
      if (records.length == 0) {
        player = this.store.createRecord('player', {
          name: this.playernames[i],
        });
        await player.save();
      } else {
        player = records[0];
      }

      // Save player for future use
      this.players.push(player);

      // Create position and link player to round with it
      let position = this.store.createRecord('position', {
        index: i,
        player: player,
        round: this.round
      });
      position.save();
    }

    this.submittedPlayers = true;
  }

  @action
  async addNewRow(contract, activePlayers, pointsEarned) {
    // BACKEND
    // Create hand
    const dealer = this.players[this.index % 4];  // TODO dealer chosen positionally, should be given by frontend
    const dealername = this.playernames[this.index % 4];
    const hand = this.store.createRecord('hand', {
      contract: contract,
      index: this.index,
      round: this.round,
      dealer: dealer
    });
    await hand.save();
    this.index++;
    
    // Active Players
    let handPlayers = await hand.activePlayers;
    for(let i in this.players){
      if(activePlayers[i]){
        handPlayers.push(this.players[i]);
        this.players[i].save();
      }
    }

    // Points
    for(let i in this.players){
      let point = this.store.createRecord('point', {
        score: pointsEarned[i],
        player: this.players[i],
        hand: hand
      });
      point.save()
    }
    
    hand.save();

    // FRONTEND
    // Calculate new point totals
    let newTotal = [];
    if (this.games.length > 0) {
      this.games[this.games.length - 1].pointsTotal.forEach((e, idx) => {
        newTotal.push(Number(e) + Number(pointsEarned[idx]));
      });
    } else {
      newTotal = pointsEarned;
    }

    this.games = [
      ...this.games,
      {
        dealer: dealername,
        contract: contract,
        activePlayers: activePlayers,
        pointsEarned: pointsEarned,
        pointsTotal: newTotal,
      },
    ];
  }
}
