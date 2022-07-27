/**
 * @since 0.5.13
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { pipe } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/pipeable.ts'
import { map } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either.ts'

/**
 * @since 0.5.13
 */
export interface BooleanFromNumberC extends t.Type<boolean, number, unknown> {}

/**
 * @example
 * import { BooleanFromNumber } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/BooleanFromNumber'
 * import { right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 * import { PathReporter } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/lib/PathReporter'
 *
 * assert.deepStrictEqual(BooleanFromNumber.decode(1), right(true))
 * assert.deepStrictEqual(BooleanFromNumber.decode(0), right(false))
 * assert.deepStrictEqual(BooleanFromNumber.decode(123), right(true))
 * assert.deepStrictEqual(PathReporter.report(BooleanFromNumber.decode('a')), ['Invalid value "a" supplied to : BooleanFromNumber'])
 *
 * @since 0.5.13
 */
export const BooleanFromNumber: BooleanFromNumberC = new t.Type<boolean, number, unknown>(
  'BooleanFromNumber',
  t.boolean.is,
  (u, c) =>
    pipe(
      t.number.validate(u, c),
      map(n => n !== 0)
    ),
  Number
)
