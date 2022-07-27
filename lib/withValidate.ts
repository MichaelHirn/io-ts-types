/**
 * @since 0.4.3
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { clone } from './clone.ts'

/**
 * Returns a clone of the given codec which uses the given `validate` function
 *
 * @example
 * import { withValidate } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/withValidate'
 * import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib'
 * import { PathReporter } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/lib/PathReporter'
 * import { either, right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 *
 * const T = withValidate(t.number, (u, c) => either.map(t.number.validate(u, c), n => n * 2))
 *
 * assert.deepStrictEqual(T.decode(1), right(2))
 * assert.deepStrictEqual(PathReporter.report(T.decode(null)), ['Invalid value null supplied to : number'])
 *
 * @since 0.4.3
 */
export function withValidate<C extends t.Any>(codec: C, validate: C['validate'], name: string = codec.name): C {
  const r: any = clone(codec)
  r.validate = validate
  // tslint:disable-next-line: deprecation
  r.decode = (i: any) => validate(i, t.getDefaultContext(r))
  r.name = name
  return r
}
