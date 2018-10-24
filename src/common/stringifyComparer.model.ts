import { IObjectComparer } from './objectComparer.interface';

/**
 * Compares objects using `JSON.stringify`
 */
export class StringifyComparer implements IObjectComparer {
  public areEquivalent (objA: any, objB: any): boolean {
    return JSON.stringify(objA) === JSON.stringify(objB);
  }
}
