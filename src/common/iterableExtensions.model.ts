/**
 * Contains `static` methods which expose
 * iterable helpers. These methods can be found
 * in `aureooms/js-itertools` - https://aureooms.github.io/js-itertools/.
 *
 * The functions were adapted to fit needs, including adding generics support for
 * tooling assistance.
 */
export class IterableExtensions {
  /**
   * Generator function to return combinations of an iterable object
   * Intended for use in `for..of` loops.
   * @param iterable object array to produce combinations of
   * @param size returns combination results of specified size
   */
  /* istanbul ignore next */
  public static * Combinations<T> (iterable: T[], size: number): IterableIterator<T[]> {
    let pool = Array.from(iterable)
    if (size > pool.length) {
      return []
    }

    let indices = Array.from(this.Range(0, size, 1))

    yield Array.from(this.Pick(pool, indices))

    while (true) {
      let i = size - 1
      while (true) {
        if (i < 0) {
          return []
        }
        if (indices[i] !== (i + pool.length - size)) {
          let pivot = ++indices[i]
          for (++i; i < size; ++i) {
            indices[i] = ++pivot
          }
          break
        }
        --i
      }
      yield Array.from(this.Pick(pool, indices))
    }
  }

  /**
   * Generator function to yield objects in list.
   * Intended for use in `for..of` loops.
   * @param object object to pick from
   * @param keys indexes of the object
   */
  public static * Pick<T> (object: T[], keys: any) {
    for (let key of keys) {
      yield object[key]
    }
  }

  /**
   * Create an iterable range of numbers
   * Intended for use in `for..of` loops.
   * @param start First number returned from iterated range
   * @param stop Will stop before this number
   * @param step Steps between `start` and `stop`
   */
  public static * Range (start: number, stop: number, step: number) {
    if (step < 0) {
      for (; start > stop; start += step) yield start
    } else {
      for (; start < stop; start += step) yield start
    }
  }
}
