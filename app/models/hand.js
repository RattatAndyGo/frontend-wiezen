import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class HandModel extends Model {
  @attr('string') contract;
  @attr('number') index;
  @belongsTo('round', { async: true, inverse: 'hands' }) round;
  @hasMany('player', { async: true, inverse: null }) activePlayers;
  @belongsTo('player', { async: true, inverse: null }) dealer;
  @hasMany('point', { async: true, inverse: 'hand' }) points;
}
