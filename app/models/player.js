import Model, { attr, hasMany } from '@ember-data/model';

export default class PlayerModel extends Model {
  @attr('string') name;
  @hasMany('position', { async: true, inverse: 'player' }) positions;
}
