/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import Edit from './edit';
import save from './save';
import { columnBlockSettings } from './column';
import metadata from '../block.json';

/**
 * Register child column block: luiz0067/grid-column
 */
registerBlockType( columnBlockSettings.name, {
	title: columnBlockSettings.title,
	parent: columnBlockSettings.parent,
	icon: columnBlockSettings.icon,
	category: columnBlockSettings.category,
	description: columnBlockSettings.description,
	attributes: columnBlockSettings.attributes,
	usesContext: columnBlockSettings.usesContext,
	supports: columnBlockSettings.supports,
	edit: columnBlockSettings.edit,
	save: columnBlockSettings.save,
} );

/**
 * Register main block: luiz0067/grid-flex
 */
registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
