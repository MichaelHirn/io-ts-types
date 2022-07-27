/**
 * @since 0.5.0
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { pipe } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/pipeable.ts'
import { chain } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either.ts'

/**
 * @since 0.5.0
 */
export interface DateFromUnixTimeC extends t.Type<Date, number, unknown> {}

/**
 * @example
 * import { DateFromUnixTime } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/DateFromUnixTime'
 * import { right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 *
 * const date = new Date(1973, 10, 30)
 * const input = date.getTime() / 1000
 * assert.deepStrictEqual(DateFromUnixTime.decode(input), right(date))
 *
 * @since 0.5.0
 */
export const DateFromUnixTime: DateFromUnixTimeC = new t.Type<Date, number, unknown>(
  'DateFromUnixTime',
  (u): u is Date => u instanceof Date,
  (u, c) =>
    pipe(
      t.Int.validate(u, c),
      chain(n => {
        const d = new Date(n * 1000)
        return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d)
      })
    ),
  a => Math.floor(a.getTime() / 1000)
)
