import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend-wiezen/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | new-row', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<NewRow />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <NewRow>
        template block text
      </NewRow>
    `);

    assert.dom().hasText('template block text');
  });
});
