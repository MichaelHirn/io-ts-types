/**
 * @since 0.3.2
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'

/**
 * Changes the output type of the given runtime type
 *
 * @example
 * import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib'
 * import { mapOutput } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/mapOutput'
 * import { optionFromNullable } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/optionFromNullable'
 * import { none, some } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Option'
 *
 * // Input: t.Type<Option<number>, number | null, t.mixed>
 * const Input = optionFromNullable(t.number)
 *
 * const toUndefined = <A>(x: A | null): A | undefined => (x === null ? undefined : x)
 *
 * // Output: t.Type<Option<number>, number | undefined, t.mixed>
 * const Output = mapOutput(Input, toUndefined)
 *
 * assert.strictEqual(Output.encode(none), undefined)
 * assert.strictEqual(Output.encode(some(1)), 1)
 *
 * @since 0.3.2
 */
export function mapOutput<A, O, I, P>(
  codec: t.Type<A, O, I>,
  f: (p: O) => P,
  name: string = codec.name
): t.Type<A, P, I> {
  return new t.Type(name, codec.is, codec.validate, a => f(codec.encode(a)))
}
