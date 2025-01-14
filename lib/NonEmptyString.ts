/**
 * @since 0.4.5
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'

/**
 * @since 0.4.5
 */
export interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol
}

/**
 * @since 0.4.5
 */
export type NonEmptyString = t.Branded<string, NonEmptyStringBrand>

/**
 * @since 0.4.5
 */
export interface NonEmptyStringC extends t.Type<NonEmptyString, string, unknown> {}

/**
 * A codec that succeeds if a string is not empty
 *
 * @example
 * import { NonEmptyString } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/NonEmptyString'
 * import { right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 * import { PathReporter } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/lib/PathReporter'
 *
 * assert.deepStrictEqual(NonEmptyString.decode('a'), right('a'))
 * assert.deepStrictEqual(PathReporter.report(NonEmptyString.decode('')), ['Invalid value "" supplied to : NonEmptyString'])
 *
 * @since 0.4.5
 */
export const NonEmptyString: NonEmptyStringC = t.brand(
  t.string,
  (s): s is NonEmptyString => s.length > 0,
  'NonEmptyString'
)
