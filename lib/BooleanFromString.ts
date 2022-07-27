/**
 * @since 0.5.0
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { pipe } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/pipeable.ts'
import { chain } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either.ts'

/**
 * @since 0.5.0
 */
export interface BooleanFromStringC extends t.Type<boolean, string, unknown> {}

/**
 * @example
 * import { BooleanFromString } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/BooleanFromString'
 * import { right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 * import { PathReporter } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/lib/PathReporter'
 *
 * assert.deepStrictEqual(BooleanFromString.decode('true'), right(true))
 * assert.deepStrictEqual(BooleanFromString.decode('false'), right(false))
 * assert.deepStrictEqual(PathReporter.report(BooleanFromString.decode('a')), ['Invalid value "a" supplied to : BooleanFromString'])
 *
 * @since 0.5.0
 */
export const BooleanFromString: BooleanFromStringC = new t.Type<boolean, string, unknown>(
  'BooleanFromString',
  t.boolean.is,
  (u, c) =>
    pipe(
      t.string.validate(u, c),
      chain(s => (s === 'true' ? t.success(true) : s === 'false' ? t.success(false) : t.failure(u, c)))
    ),
  String
)
