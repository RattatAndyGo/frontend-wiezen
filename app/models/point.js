import Model, { attr, belongsTo } from '@ember-data/model';

export default class PointModel extends Model {
  @attr('number') score;
  @belongsTo('position', { async: true, inverse: null }) position;
  @belongsTo('hand', { async: true, inverse: 'points' }) hand;
}
