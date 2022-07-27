/**
 * @since 0.5.0
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { withValidate } from './withValidate.ts'

/**
 * Returns a clone of the given codec that replace a nullable input with the given value `a`
 *
 * @example
 * import { fromNullable } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/fromNullable'
 * import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib'
 * import { right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 * import { PathReporter } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/lib/PathReporter'
 *
 * const T = fromNullable(t.number, -1)
 *
 * assert.deepStrictEqual(T.decode(1), right(1))
 * assert.deepStrictEqual(T.decode(null), right(-1))
 * assert.deepStrictEqual(T.decode(undefined), right(-1))
 * assert.deepStrictEqual(PathReporter.report(T.decode('a')), ['Invalid value "a" supplied to : fromNullable(number)'])
 *
 * @since 0.5.0
 */
export function fromNullable<C extends t.Mixed>(codec: C, a: t.TypeOf<C>, name = `fromNullable(${codec.name})`): C {
  return withValidate(codec, (u, c) => (u == null ? t.success(a) : codec.validate(u, c)), name)
}
