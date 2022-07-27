/**
 * @since 0.4.4
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { NumberFromString } from './NumberFromString.ts'
import { pipe } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/pipeable.ts'
import { chain } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either.ts'

/**
 * @since 0.4.4
 */
export interface IntFromStringC extends t.Type<t.Int, string, unknown> {}

/**
 * A codec that succeeds if a string can be parsed to an integer
 *
 * @example
 * import { IntFromString } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/IntFromString'
 * import { right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 * import { PathReporter } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/lib/PathReporter'
 *
 * assert.deepStrictEqual(IntFromString.decode('1'), right(1))
 * assert.deepStrictEqual(PathReporter.report(IntFromString.decode('1.1')), ['Invalid value "1.1" supplied to : IntFromString'])
 *
 * @since 0.4.4
 */
export const IntFromString: IntFromStringC = new t.Type<t.Int, string, unknown>(
  'IntFromString',
  t.Int.is,
  (u, c) =>
    pipe(
      NumberFromString.validate(u, c),
      chain(n => (t.Int.is(n) ? t.success(n) : t.failure(u, c)))
    ),
  NumberFromString.encode
)
