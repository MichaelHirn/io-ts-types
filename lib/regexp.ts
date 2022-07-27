/**
 * @since 0.4.4
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { fromRefinement } from './fromRefinement.ts'

const isRegExp = (u: unknown): u is RegExp => Object.prototype.toString.call(u) === '[object RegExp]'

/**
 * @since 0.4.4
 */
export interface RegExpC extends t.Type<RegExp, RegExp, unknown> {}

/**
 * @example
 * import { regexp } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/regexp'
 * import { right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 *
 * const input1 = /\w+/
 * const input2 = new RegExp('\\w+')
 * assert.deepStrictEqual(regexp.decode(input1), right(input1))
 * assert.deepStrictEqual(regexp.decode(input2), right(input2))
 *
 * @since 0.4.4
 */
export const regexp: RegExpC = fromRefinement('RegExp', isRegExp)
