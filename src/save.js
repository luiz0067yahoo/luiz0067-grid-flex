/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save Component
 */
export default function save( { attributes } ) {
	const {
		gutterSize,
		verticalAlign,
		horizontalAlign,
		rowCustomClass,
	} = attributes;

	// Montagem rigorosa das classes Bootstrap 5 para a linha
	const rowClasses = [
		'row',
		gutterSize || 'g-3',
		verticalAlign || 'align-items-start',
		horizontalAlign || 'justify-content-start',
		rowCustomClass || '',
	]
		.filter( Boolean )
		.join( ' ' );

	const blockProps = useBlockProps.save( {
		className: 'wp-block-luiz0067-grid-flex',
	} );

	return (
		<div { ...blockProps }>
			<div className={ rowClasses }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
