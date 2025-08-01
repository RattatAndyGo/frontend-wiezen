import Route from '@ember/routing/route';

export default class SearchRoute extends Route {
  async model({ playername }) {
    const res = await fetch(`/search/${playername}`);
    return await res.json();
  }
}
