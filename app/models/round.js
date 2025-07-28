import Model, { attr, hasMany } from '@ember-data/model';

export default class RoundModel extends Model {
  @attr('date', {
    defaultValue() {
      return new Date();
    },
  })
  time;
  @hasMany('position', { async: true, inverse: 'round' }) positions;
  @hasMany('hand', { async: true, inverse: 'round' }) hands;
}
