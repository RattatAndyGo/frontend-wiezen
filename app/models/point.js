import Model, { attr, belongsTo } from '@ember-data/model';

export default class PointModel extends Model {
    @attr('number') score;
    @belongsTo('player', { async: true, inverse: null }) player;
    @belongsTo('hand', { async: true, inverse: 'points' }) hand;
}
