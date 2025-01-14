/**
 * @since 0.4.6
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'

const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * @since 0.4.6
 */
export interface UUIDBrand {
  readonly UUID: unique symbol
}

/**
 * @since 0.4.6
 */
export type UUID = t.Branded<string, UUIDBrand>

/**
 * @example
 * import { UUID } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/UUID'
 * import { right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 * import { PathReporter } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/lib/PathReporter'
 *
 * assert.deepStrictEqual(UUID.decode('00000000-0000-0000-0000-000000000000'), right('00000000-0000-0000-0000-000000000000'))
 * assert.deepStrictEqual(PathReporter.report(UUID.decode('not a uuid')), ['Invalid value "not a uuid" supplied to : UUID'])
 *
 * @since 0.4.6
 */
export const UUID = t.brand(t.string, (s): s is UUID => regex.test(s), 'UUID')
