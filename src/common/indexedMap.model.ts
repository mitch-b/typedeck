import { MapIndexable } from './mapIndexable.interface'

/**
 * Extension of ES6 Map<T, U> that enforces T
 * to implement `IIndexable`, so that when
 * `Map.has` checks its internal keys, the typical
 * `object === object` match won't fail, because
 * it will use the `IIndexable.getIndex()` value
 * as the key.
 */
export class IndexedMap<T extends MapIndexable, U> {
  private internalMap: Map<string, U> = new Map<string, U>()

  public add (item: T, value: U): this {
    this.internalMap.set(item.getIndex(), value)
    return this
  }

  public get (item: T): U {
    return this.internalMap.get(item.getIndex()) as U
  }

  public contains (item: T): boolean {
    return this.internalMap.has(item.getIndex())
  }

  public clear (): this {
    this.internalMap.clear()
    return this
  }

  public delete (item: T): this {
    this.internalMap.delete(item.getIndex())
    return this
  }

  public entries (): Map<string, U> {
    return this.internalMap
  }
}
