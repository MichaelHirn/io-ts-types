/**
 * @since 0.5.0
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { pipe } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/pipeable.ts'
import { chain } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either.ts'

/**
 * @since 0.5.0
 */
export interface DateFromNumberC extends t.Type<Date, number, unknown> {}

/**
 * @example
 * import { DateFromNumber } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/DateFromNumber'
 * import { right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 *
 * const date = new Date(1973, 10, 30)
 * const input = date.getTime()
 * assert.deepStrictEqual(DateFromNumber.decode(input), right(date))
 *
 * @since 0.5.0
 */
export const DateFromNumber: DateFromNumberC = new t.Type<Date, number, unknown>(
  'DateFromNumber',
  (u): u is Date => u instanceof Date,
  (u, c) =>
    pipe(
      t.number.validate(u, c),
      chain(n => {
        const d = new Date(n)
        return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d)
      })
    ),
  a => a.getTime()
)
