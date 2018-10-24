export class MapExtensions {
  /**
   * Handy method to create an ES6 Map
   * with a grouping of keys.
   *
   * https://stackoverflow.com/a/38327540
   *
   * @example
   *
   * MapExtensions.GroupBy(cards, card => card.suit);
   *
   * @param list Array of objects to group
   * @param keyGetter Key to group by. "obj => obj.key"
   */
  public static GroupBy<T> (list: T[], keyGetter: any): Map<any, T[]> {
    const map = new Map<any, T[]>();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
}
