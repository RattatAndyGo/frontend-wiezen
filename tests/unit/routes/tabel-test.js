import { module, test } from 'qunit';
import { setupTest } from 'frontend-wiezen/tests/helpers';

module('Unit | Route | tabel', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:tabel');
    assert.ok(route);
  });
});
