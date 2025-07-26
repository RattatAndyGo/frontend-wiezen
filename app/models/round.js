import Model, { attr, hasMany } from '@ember-data/model';

export default class RoundModel extends Model {
    @attr('date', { defaultValue() {return new Date();} }) time;
    @hasMany('player', { async: true, inverse: 'rounds' }) players;
    @hasMany('hand', { async: true, inverse: 'round' }) hands;
}
