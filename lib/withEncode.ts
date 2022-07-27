/**
 * @since 0.5.12
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'

/**
 * Returns a clone of the given codec which uses the given `encode` function
 *
 * @example
 * import { withEncode } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/withEncode'
 * import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib'
 * import { PathReporter } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/lib/PathReporter'
 * import { right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 *
 * const T = withEncode(t.number, String)
 *
 * assert.deepStrictEqual(T.decode(1), right(1))
 * assert.deepStrictEqual(T.encode(1), '1')
 * assert.deepStrictEqual(PathReporter.report(T.decode('str')), ['Invalid value "str" supplied to : number'])
 *
 * @since 0.5.12
 */
export function withEncode<A, O, I, P>(
  codec: t.Type<A, O, I>,
  encode: (a: A) => P,
  name: string = codec.name
): t.Type<A, P, I> {
  return new t.Type(name, codec.is, codec.validate, encode)
}
