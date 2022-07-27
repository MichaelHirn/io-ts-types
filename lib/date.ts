/**
 * @since 0.5.0
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { fromRefinement } from './fromRefinement.ts'

/**
 * @since 0.5.0
 */
export interface DateC extends t.Type<Date, Date, unknown> {}

const isDate = (u: unknown): u is Date => u instanceof Date

/**
 * @since 0.5.0
 */
export const date: DateC = fromRefinement('Date', isDate)
