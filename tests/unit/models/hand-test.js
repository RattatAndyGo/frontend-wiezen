import { module, test } from 'qunit';

import { setupTest } from 'frontend-wiezen/tests/helpers';

module('Unit | Model | hand', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('hand', {});
    assert.ok(model);
  });
});
