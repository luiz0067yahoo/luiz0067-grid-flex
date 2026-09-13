/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { getI18nString } from './i18n';

/**
 * Column width choices for Bootstrap 12-column grid
 */
const DESKTOP_WIDTH_OPTIONS = [
	{ label: getI18nString( 'inherit_parent', 'Herdar do Pai (Padrão)' ), value: '' },
	{ label: 'col-lg-12 (100% de largura)', value: 'col-lg-12' },
	{ label: 'col-lg-10 (83.3% de largura)', value: 'col-lg-10' },
	{ label: 'col-lg-9 (75% de largura)', value: 'col-lg-9' },
	{ label: 'col-lg-8 (66.7% de largura)', value: 'col-lg-8' },
	{ label: 'col-lg-7 (58.3% de largura)', value: 'col-lg-7' },
	{ label: 'col-lg-6 (50% de largura)', value: 'col-lg-6' },
	{ label: 'col-lg-5 (41.7% de largura)', value: 'col-lg-5' },
	{ label: 'col-lg-4 (33.3% de largura)', value: 'col-lg-4' },
	{ label: 'col-lg-3 (25% de largura)', value: 'col-lg-3' },
	{ label: 'col-lg-2 (16.7% de largura)', value: 'col-lg-2' },
	{ label: 'col-lg-1 (8.3% de largura)', value: 'col-lg-1' },
	{ label: 'col-lg-auto (Largura natural)', value: 'col-lg-auto' },
	{ label: 'col-lg (Largura flexível)', value: 'col-lg' },
];

const TABLET_WIDTH_OPTIONS = [
	{ label: getI18nString( 'inherit_parent', 'Herdar do Pai (Padrão)' ), value: '' },
	{ label: 'col-md-12 (100% no Tablet)', value: 'col-md-12' },
	{ label: 'col-md-8 (66.7% no Tablet)', value: 'col-md-8' },
	{ label: 'col-md-6 (50% no Tablet)', value: 'col-md-6' },
	{ label: 'col-md-4 (33.3% no Tablet)', value: 'col-md-4' },
	{ label: 'col-md-3 (25% no Tablet)', value: 'col-md-3' },
	{ label: 'col-md-auto (Automático)', value: 'col-md-auto' },
	{ label: 'col-md (Flexível)', value: 'col-md' },
];

const MOBILE_WIDTH_OPTIONS = [
	{ label: getI18nString( 'inherit_parent', 'Herdar do Pai (Padrão)' ), value: '' },
	{ label: 'col-12 (100% no Mobile)', value: 'col-12' },
	{ label: 'col-6 (50% no Mobile)', value: 'col-6' },
	{ label: 'col-4 (33.3% no Mobile)', value: 'col-4' },
	{ label: 'col-auto (Automático)', value: 'col-auto' },
	{ label: 'col (Flexível)', value: 'col' },
];

export const columnBlockSettings = {
	name: 'luiz0067/grid-column',
	title: getI18nString( 'column_badge_label', 'Coluna' ) + ' Grid Flex',
	parent: [ 'luiz0067/grid-flex' ],
	icon: 'columns',
	category: 'layout',
	description: 'Coluna filha com suporte a InnerBlocks e classes do Bootstrap 5.',
	attributes: {
		colWidthDesktopCustom: {
			type: 'string',
			default: '',
		},
		colWidthTabletCustom: {
			type: 'string',
			default: '',
		},
		colWidthMobileCustom: {
			type: 'string',
			default: '',
		},
		columnCustomClass: {
			type: 'string',
			default: '',
		},
	},
	usesContext: [
		'luiz0067/columnsCount',
		'luiz0067/colWidthDesktop',
		'luiz0067/colWidthTablet',
		'luiz0067/colWidthMobile',
	],
	supports: {
		reusable: false,
		html: false,
		customClassName: true,
	},
	edit: function ColumnEdit( { attributes, setAttributes, context } ) {
		const {
			colWidthDesktopCustom,
			colWidthTabletCustom,
			colWidthMobileCustom,
			columnCustomClass,
		} = attributes;

		// Resolução das classes ativas (custom ou herdadas do contexto do pai)
		const effectiveDesktop =
			colWidthDesktopCustom || context[ 'luiz0067/colWidthDesktop' ] || 'col-lg-6';
		const effectiveTablet =
			colWidthTabletCustom || context[ 'luiz0067/colWidthTablet' ] || 'col-md-6';
		const effectiveMobile =
			colWidthMobileCustom || context[ 'luiz0067/colWidthMobile' ] || 'col-12';

		const columnClasses = [
			'luiz0067-grid-col-item',
			effectiveDesktop,
			effectiveTablet,
			effectiveMobile,
			columnCustomClass || '',
		]
			.filter( Boolean )
			.join( ' ' );

		const blockProps = useBlockProps( {
			className: columnClasses,
		} );

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={ getI18nString(
							'column_custom_settings',
							'Personalização Individual desta Coluna'
						) }
						initialOpen={ true }
					>
						<p className="components-base-control__help">
							{ getI18nString(
								'column_custom_help',
								'Sobrescreva a largura padrão herdada do Grid Flex apenas para esta coluna específica.'
							) }
						</p>

						<SelectControl
							label={ getI18nString(
								'col_width_desktop_label',
								'Largura Desktop (≥ 992px)'
							) }
							value={ colWidthDesktopCustom }
							options={ DESKTOP_WIDTH_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { colWidthDesktopCustom: value } )
							}
						/>

						<SelectControl
							label={ getI18nString(
								'col_width_tablet_label',
								'Largura Tablet (≥ 768px)'
							) }
							value={ colWidthTabletCustom }
							options={ TABLET_WIDTH_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { colWidthTabletCustom: value } )
							}
						/>

						<SelectControl
							label={ getI18nString(
								'col_width_mobile_label',
								'Largura Mobile (< 768px)'
							) }
							value={ colWidthMobileCustom }
							options={ MOBILE_WIDTH_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { colWidthMobileCustom: value } )
							}
						/>

						<TextControl
							label="Classe CSS Adicional da Coluna"
							value={ columnCustomClass }
							placeholder="ex: p-3 text-center bg-light"
							onChange={ ( value ) =>
								setAttributes( { columnCustomClass: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>

				<div { ...blockProps }>
					<div className="luiz0067-grid-column-guide">
						<div className="luiz0067-column-header-badge">
							<span className="badge-name">
								<i className="fa-solid fa-columns" style={ { marginRight: '4px' } }></i>
								{ getI18nString( 'column_badge_label', 'Coluna' ) }
							</span>
							<span className="badge-classes">
								{ `${ effectiveDesktop } ${ effectiveTablet } ${ effectiveMobile }` }
							</span>
						</div>
						<div className="luiz0067-column-inner-content">
							<InnerBlocks
								templateLock={ false }
								renderAppender={ InnerBlocks.ButtonBlockAppender }
							/>
						</div>
					</div>
				</div>
			</>
		);
	},
	save: function ColumnSave( { attributes } ) {
		const {
			colWidthDesktopCustom,
			colWidthTabletCustom,
			colWidthMobileCustom,
			columnCustomClass,
		} = attributes;

		// Fallbacks na renderização caso o usuário não tenha definido override
		const effectiveDesktop = colWidthDesktopCustom || 'col-lg-6';
		const effectiveTablet = colWidthTabletCustom || 'col-md-6';
		const effectiveMobile = colWidthMobileCustom || 'col-12';

		const columnClasses = [
			effectiveDesktop,
			effectiveTablet,
			effectiveMobile,
			columnCustomClass || '',
		]
			.filter( Boolean )
			.join( ' ' );

		const blockProps = useBlockProps.save( {
			className: columnClasses,
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},
};
