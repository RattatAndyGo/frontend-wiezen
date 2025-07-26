import Model, { attr, hasMany } from '@ember-data/model';

export default class PlayerModel extends Model {
  @attr('string') name;
  @hasMany('round', { async: true, inverse: 'players' }) rounds;
}
