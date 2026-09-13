/**
 * Internationalization helper for luiz0067 Grid Flex
 */

import { __ } from '@wordpress/i18n';

/**
 * Translate string with priority:
 * 1. window.luiz0067_grid_flex_i18n localized dictionary
 * 2. Core wp.i18n.__ with textdomain
 * 3. Fallback string provided
 *
 * @param {string} key
 * @param {string} fallback
 * @returns {string}
 */
export function getI18nString( key, fallback = '' ) {
	if (
		typeof window !== 'undefined' &&
		window.luiz0067_grid_flex_i18n &&
		typeof window.luiz0067_grid_flex_i18n[ key ] === 'string'
	) {
		return window.luiz0067_grid_flex_i18n[ key ];
	}

	return __( fallback || key, 'luiz0067-grid-flex' );
}
