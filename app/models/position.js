import Model, { attr, belongsTo } from '@ember-data/model';

export default class PositionModel extends Model {
  @attr('number') index;
  @belongsTo('player', { async: true, inverse: 'positions' }) player;
  @belongsTo('round', { async: true, inverse: 'positions' }) round;
}
