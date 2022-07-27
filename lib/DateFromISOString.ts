/**
 * @since 0.5.0
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { pipe } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/pipeable.ts'
import { chain } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either.ts'

/**
 * @since 0.5.0
 */
export interface DateFromISOStringC extends t.Type<Date, string, unknown> {}

/**
 * @example
 * import { DateFromISOString } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/DateFromISOString'
 * import { right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 *
 * const date = new Date(1973, 10, 30)
 * const input = date.toISOString()
 * assert.deepStrictEqual(DateFromISOString.decode(input), right(date))
 *
 * @since 0.5.0
 */
export const DateFromISOString: DateFromISOStringC = new t.Type<Date, string, unknown>(
  'DateFromISOString',
  (u): u is Date => u instanceof Date,
  (u, c) =>
    pipe(
      t.string.validate(u, c),
      chain(s => {
        const d = new Date(s)
        return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d)
      })
    ),
  a => a.toISOString()
)
