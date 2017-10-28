export class IterableExtensions {
  /**
   * Generator function to return combinations of an iterable object
   * @param iterable object array to produce combinations of
   * @param size returns combination results of specified size
   */
  public static * Combinations<T> (iterable: T[], size: number): IterableIterator<T[]> {
    let pool = Array.from(iterable)
    let len = pool.length
    if (size > len) {
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
        if (indices[i] !== (i + len - size)) {
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

  public static * Pick<T> (object: T[], keys: any) {
    for (let key of keys) {
      yield object[key]
    }
  }

  public static * Range (start: number, stop: number, step: number) {
    if (step < 0) {
      for (; start > stop; start += step) yield start
    } else {
      for (; start < stop; start += step) yield start
    }
  }
}
