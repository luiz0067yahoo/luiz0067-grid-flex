/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TabPanel,
	SelectControl,
	RangeControl,
	Button,
	ButtonGroup,
	TextControl,
	Notice,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { getI18nString } from './i18n';

/**
 * Default InnerBlocks template
 */
const TEMPLATE_DEFAULT = [
	[ 'luiz0067/grid-column', { colWidthDesktopCustom: 'col-lg-6' } ],
	[ 'luiz0067/grid-column', { colWidthDesktopCustom: 'col-lg-6' } ],
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		columnsCount,
		colWidthDesktop,
		colWidthTablet,
		colWidthMobile,
		gutterSize,
		verticalAlign,
		horizontalAlign,
		rowCustomClass,
	} = attributes;

	// Obter blocos filhos via core/block-editor store
	const { innerBlocks } = useSelect(
		( select ) => ( {
			innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
		} ),
		[ clientId ]
	);

	const { insertBlock, removeBlock, replaceInnerBlocks } = useDispatch(
		'core/block-editor'
	);

	// Atualizar número de colunas garantindo sincronização dos blocos filhos
	const updateColumnsCount = ( newCount ) => {
		const targetCount = Math.max( 1, Math.min( 6, parseInt( newCount, 10 ) || 1 ) );
		setAttributes( { columnsCount: targetCount } );

		const currentCount = innerBlocks ? innerBlocks.length : 0;
		if ( targetCount > currentCount ) {
			const toAdd = targetCount - currentCount;
			for ( let i = 0; i < toAdd; i++ ) {
				insertBlock(
					createBlock( 'luiz0067/grid-column', {
						colWidthDesktopCustom: '',
						colWidthTabletCustom: '',
						colWidthMobileCustom: '',
					} ),
					currentCount + i,
					clientId,
					false
				);
			}
		} else if ( targetCount < currentCount ) {
			const toRemove = currentCount - targetCount;
			for ( let i = 0; i < toRemove; i++ ) {
				const lastIndex = currentCount - 1 - i;
				if ( innerBlocks[ lastIndex ] ) {
					removeBlock( innerBlocks[ lastIndex ].clientId, false );
				}
			}
		}
	};

	// Aplicar presets de layout instantâneos
	const applyPreset = ( preset ) => {
		let desktop = 'col-lg-6';
		let tablet = 'col-md-6';
		let mobile = 'col-12';
		let count = 2;
		let customWidths = [];

		switch ( preset ) {
			case '1-col':
				count = 1;
				desktop = 'col-lg-12';
				tablet = 'col-md-12';
				mobile = 'col-12';
				customWidths = [ 'col-lg-12' ];
				break;
			case '2-cols-equal':
				count = 2;
				desktop = 'col-lg-6';
				tablet = 'col-md-6';
				mobile = 'col-12';
				customWidths = [ 'col-lg-6', 'col-lg-6' ];
				break;
			case '2-cols-33-67':
				count = 2;
				desktop = 'col-lg-4';
				tablet = 'col-md-6';
				mobile = 'col-12';
				customWidths = [ 'col-lg-4', 'col-lg-8' ];
				break;
			case '2-cols-67-33':
				count = 2;
				desktop = 'col-lg-8';
				tablet = 'col-md-6';
				mobile = 'col-12';
				customWidths = [ 'col-lg-8', 'col-lg-4' ];
				break;
			case '3-cols-equal':
				count = 3;
				desktop = 'col-lg-4';
				tablet = 'col-md-6';
				mobile = 'col-12';
				customWidths = [ 'col-lg-4', 'col-lg-4', 'col-lg-4' ];
				break;
			case '3-cols-25-50-25':
				count = 3;
				desktop = 'col-lg-3';
				tablet = 'col-md-6';
				mobile = 'col-12';
				customWidths = [ 'col-lg-3', 'col-lg-6', 'col-lg-3' ];
				break;
			case '4-cols-equal':
				count = 4;
				desktop = 'col-lg-3';
				tablet = 'col-md-6';
				mobile = 'col-12';
				customWidths = [ 'col-lg-3', 'col-lg-3', 'col-lg-3', 'col-lg-3' ];
				break;
			case '6-cols-equal':
				count = 6;
				desktop = 'col-lg-2';
				tablet = 'col-md-4';
				mobile = 'col-6';
				customWidths = [
					'col-lg-2',
					'col-lg-2',
					'col-lg-2',
					'col-lg-2',
					'col-lg-2',
					'col-lg-2',
				];
				break;
			default:
				break;
		}

		setAttributes( {
			columnsCount: count,
			colWidthDesktop: desktop,
			colWidthTablet: tablet,
			colWidthMobile: mobile,
		} );

		// Cria ou reorganiza os blocos filhos com as larguras personalizadas
		const newBlocks = customWidths.map( ( w, idx ) => {
			const existing = innerBlocks && innerBlocks[ idx ];
			return createBlock(
				'luiz0067/grid-column',
				{
					colWidthDesktopCustom: w,
					colWidthTabletCustom: tablet,
					colWidthMobileCustom: mobile,
				},
				existing ? existing.innerBlocks : []
			);
		} );

		replaceInnerBlocks( clientId, newBlocks, false );
	};

	// Classes dinâmicas para a linha Bootstrap no editor
	const rowClasses = [
		'row',
		gutterSize || 'g-3',
		verticalAlign || 'align-items-start',
		horizontalAlign || 'justify-content-start',
		rowCustomClass || '',
	]
		.filter( Boolean )
		.join( ' ' );

	const blockProps = useBlockProps( {
		className: 'wp-block-luiz0067-grid-flex is-editor-canvas',
	} );

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="luiz0067-grid-tabs"
					activeClass="is-active"
					tabs={ [
						{
							name: 'columns',
							title: getI18nString( 'tab_columns', 'Colunas' ),
							className: 'tab-columns',
						},
						{
							name: 'responsive',
							title: getI18nString( 'tab_responsive', 'Responsividade' ),
							className: 'tab-responsive',
						},
						{
							name: 'alignment',
							title: getI18nString(
								'tab_alignment',
								'Alinhamento e Espaçamento'
							),
							className: 'tab-alignment',
						},
					] }
				>
					{ ( tab ) => {
						if ( tab.name === 'columns' ) {
							return (
								<PanelBody
									title={ getI18nString(
										'columns_section_title',
										'Configuração de Colunas'
									) }
									initialOpen={ true }
								>
									<RangeControl
										label={ getI18nString(
											'columns_count_label',
											'Quantidade de Colunas'
										) }
										help={ getI18nString(
											'columns_count_help',
											'Escolha entre 1 e 6 colunas ativas para a sua linha Bootstrap.'
										) }
										value={ columnsCount }
										onChange={ updateColumnsCount }
										min={ 1 }
										max={ 6 }
										step={ 1 }
									/>

									<div style={ { marginTop: '16px', marginBottom: '20px' } }>
										<label
											style={ {
												display: 'block',
												fontWeight: '600',
												marginBottom: '8px',
												fontSize: '12px',
												textTransform: 'uppercase',
												letterSpacing: '0.5px',
											} }
										>
											{ getI18nString(
												'quick_presets_label',
												'Presets Rápidos de Distribuição'
											) }
										</label>
										<div
											style={ {
												display: 'grid',
												gridTemplateColumns: '1fr 1fr',
												gap: '8px',
											} }
										>
											<Button
												isSecondary
												isSmall
												onClick={ () => applyPreset( '1-col' ) }
											>
												{ getI18nString( 'preset_1_col', '1 Coluna (100%)' ) }
											</Button>
											<Button
												isSecondary
												isSmall
												onClick={ () => applyPreset( '2-cols-equal' ) }
											>
												{ getI18nString(
													'preset_2_cols_equal',
													'2 Colunas (50/50)'
												) }
											</Button>
											<Button
												isSecondary
												isSmall
												onClick={ () => applyPreset( '2-cols-33-67' ) }
											>
												{ getI18nString(
													'preset_2_cols_33_67',
													'2 Colunas (33/67)'
												) }
											</Button>
											<Button
												isSecondary
												isSmall
												onClick={ () => applyPreset( '2-cols-67-33' ) }
											>
												{ getI18nString(
													'preset_2_cols_67_33',
													'2 Colunas (67/33)'
												) }
											</Button>
											<Button
												isSecondary
												isSmall
												onClick={ () => applyPreset( '3-cols-equal' ) }
											>
												{ getI18nString(
													'preset_3_cols_equal',
													'3 Colunas (33/33/33)'
												) }
											</Button>
											<Button
												isSecondary
												isSmall
												onClick={ () => applyPreset( '3-cols-25-50-25' ) }
											>
												{ getI18nString(
													'preset_3_cols_25_50_25',
													'3 Colunas (25/50/25)'
												) }
											</Button>
											<Button
												isSecondary
												isSmall
												onClick={ () => applyPreset( '4-cols-equal' ) }
											>
												{ getI18nString(
													'preset_4_cols_equal',
													'4 Colunas (25x4)'
												) }
											</Button>
											<Button
												isSecondary
												isSmall
												onClick={ () => applyPreset( '6-cols-equal' ) }
											>
												{ getI18nString(
													'preset_6_cols_equal',
													'6 Colunas (16.6x6)'
												) }
											</Button>
										</div>
									</div>

									<div style={ { marginTop: '16px', display: 'flex', gap: '8px' } }>
										<Button
											isPrimary
											disabled={ columnsCount >= 6 }
											onClick={ () => updateColumnsCount( columnsCount + 1 ) }
											style={ { flex: 1, justifyContent: 'center' } }
										>
											+ { getI18nString( 'add_column_button', 'Adicionar Coluna' ) }
										</Button>
										<Button
											isDestructive
											disabled={ columnsCount <= 1 }
											onClick={ () => updateColumnsCount( columnsCount - 1 ) }
											style={ { flex: 1, justifyContent: 'center' } }
										>
											- { getI18nString( 'remove_column_button', 'Remover Última' ) }
										</Button>
									</div>
								</PanelBody>
							);
						}

						if ( tab.name === 'responsive' ) {
							return (
								<PanelBody
									title={ getI18nString(
										'responsive_section_title',
										'Breakpoints Responsivos (Bootstrap 5)'
									) }
									initialOpen={ true }
								>
									<SelectControl
										label={ getI18nString(
											'col_width_desktop_label',
											'Largura Desktop (≥ 992px)'
										) }
										help={ getI18nString(
											'col_width_desktop_help',
											'Classe de coluna do Bootstrap para telas grandes (LG). Padrão herdado pelas colunas.'
										) }
										value={ colWidthDesktop }
										options={ [
											{ label: 'col-lg-12 (100% de largura)', value: 'col-lg-12' },
											{ label: 'col-lg-8 (66.7% de largura)', value: 'col-lg-8' },
											{ label: 'col-lg-6 (50% de largura)', value: 'col-lg-6' },
											{ label: 'col-lg-4 (33.3% de largura)', value: 'col-lg-4' },
											{ label: 'col-lg-3 (25% de largura)', value: 'col-lg-3' },
											{ label: 'col-lg-2 (16.7% de largura)', value: 'col-lg-2' },
											{ label: 'col-lg-auto (Largura natural)', value: 'col-lg-auto' },
											{ label: 'col-lg (Largura uniforme flexível)', value: 'col-lg' },
										] }
										onChange={ ( value ) =>
											setAttributes( { colWidthDesktop: value } )
										}
									/>

									<SelectControl
										label={ getI18nString(
											'col_width_tablet_label',
											'Largura Tablet (≥ 768px)'
										) }
										help={ getI18nString(
											'col_width_tablet_help',
											'Classe de coluna do Bootstrap para tablets (MD). Padrão herdado pelas colunas.'
										) }
										value={ colWidthTablet }
										options={ [
											{ label: 'col-md-12 (100% no Tablet)', value: 'col-md-12' },
											{ label: 'col-md-8 (66.7% no Tablet)', value: 'col-md-8' },
											{ label: 'col-md-6 (50% no Tablet)', value: 'col-md-6' },
											{ label: 'col-md-4 (33.3% no Tablet)', value: 'col-md-4' },
											{ label: 'col-md-3 (25% no Tablet)', value: 'col-md-3' },
											{ label: 'col-md-auto (Automático)', value: 'col-md-auto' },
											{ label: 'col-md (Flexível)', value: 'col-md' },
										] }
										onChange={ ( value ) =>
											setAttributes( { colWidthTablet: value } )
										}
									/>

									<SelectControl
										label={ getI18nString(
											'col_width_mobile_label',
											'Largura Mobile (< 768px)'
										) }
										help={ getI18nString(
											'col_width_mobile_help',
											'Classe de coluna do Bootstrap para smartphones (padrão 12 colunas = 100% de largura).'
										) }
										value={ colWidthMobile }
										options={ [
											{ label: 'col-12 (100% no Mobile)', value: 'col-12' },
											{ label: 'col-6 (50% no Mobile / 2 colunas)', value: 'col-6' },
											{ label: 'col-4 (33.3% no Mobile / 3 colunas)', value: 'col-4' },
											{ label: 'col-auto (Largura do conteúdo)', value: 'col-auto' },
											{ label: 'col (Flexível)', value: 'col' },
										] }
										onChange={ ( value ) =>
											setAttributes( { colWidthMobile: value } )
										}
									/>

									<div
										style={ {
											background: '#f0f4f8',
											padding: '12px',
											borderRadius: '6px',
											fontSize: '12px',
											lineHeight: '1.5',
											marginTop: '16px',
										} }
									>
										<strong>{ getI18nString( 'breakpoint_guide_title', 'Tabela de Referência de 12 Colunas' ) }:</strong>
										<ul style={ { margin: '6px 0 0 16px', padding: 0 } }>
											<li><strong>Desktop (lg):</strong> Telas ≥ 992px</li>
											<li><strong>Tablet (md):</strong> Telas ≥ 768px e &lt; 992px</li>
											<li><strong>Mobile (sm/xs):</strong> Telas &lt; 768px</li>
										</ul>
									</div>
								</PanelBody>
							);
						}

						if ( tab.name === 'alignment' ) {
							return (
								<PanelBody
									title={ getI18nString(
										'alignment_section_title',
										'Espaçamento e Alinhamento Flexbox'
									) }
									initialOpen={ true }
								>
									<SelectControl
										label={ getI18nString(
											'gutter_size_label',
											'Espaçamento entre Colunas (Gutter)'
										) }
										help={ getI18nString(
											'gutter_size_help',
											"Controla as classes 'g-*' do Bootstrap para margens horizontais e verticais entre as colunas."
										) }
										value={ gutterSize }
										options={ [
											{ label: getI18nString( 'gutter_0', 'g-0 (Sem espaçamento / 0px)' ), value: 'g-0' },
											{ label: getI18nString( 'gutter_1', 'g-1 (Muito pequeno / 0.25rem)' ), value: 'g-1' },
											{ label: getI18nString( 'gutter_2', 'g-2 (Pequeno / 0.5rem)' ), value: 'g-2' },
											{ label: getI18nString( 'gutter_3', 'g-3 (Médio Padrão / 1rem)' ), value: 'g-3' },
											{ label: getI18nString( 'gutter_4', 'g-4 (Grande / 1.5rem)' ), value: 'g-4' },
											{ label: getI18nString( 'gutter_5', 'g-5 (Muito Grande / 3rem)' ), value: 'g-5' },
										] }
										onChange={ ( value ) =>
											setAttributes( { gutterSize: value } )
										}
									/>

									<SelectControl
										label={ getI18nString(
											'vertical_align_label',
											'Alinhamento Vertical (Cross Axis)'
										) }
										help={ getI18nString(
											'vertical_align_help',
											'Alinha as colunas verticalmente dentro da linha através da classe Bootstrap align-items-*.'
										) }
										value={ verticalAlign }
										options={ [
											{ label: getI18nString( 'align_start', 'align-items-start (Topo)' ), value: 'align-items-start' },
											{ label: getI18nString( 'align_center', 'align-items-center (Centro)' ), value: 'align-items-center' },
											{ label: getI18nString( 'align_end', 'align-items-end (Base)' ), value: 'align-items-end' },
											{ label: getI18nString( 'align_stretch', 'align-items-stretch (Esticado)' ), value: 'align-items-stretch' },
										] }
										onChange={ ( value ) =>
											setAttributes( { verticalAlign: value } )
										}
									/>

									<SelectControl
										label={ getI18nString(
											'horizontal_align_label',
											'Alinhamento Horizontal (Main Axis)'
										) }
										help={ getI18nString(
											'horizontal_align_help',
											'Distribui as colunas horizontalmente na linha através da classe Bootstrap justify-content-*.'
										) }
										value={ horizontalAlign }
										options={ [
											{ label: getI18nString( 'justify_start', 'justify-content-start (Esquerda)' ), value: 'justify-content-start' },
											{ label: getI18nString( 'justify_center', 'justify-content-center (Centro)' ), value: 'justify-content-center' },
											{ label: getI18nString( 'justify_end', 'justify-content-end (Direita)' ), value: 'justify-content-end' },
											{ label: getI18nString( 'justify_between', 'justify-content-between (Espaçamento uniforme)' ), value: 'justify-content-between' },
											{ label: getI18nString( 'justify_around', 'justify-content-around (Espaço ao redor)' ), value: 'justify-content-around' },
										] }
										onChange={ ( value ) =>
											setAttributes( { horizontalAlign: value } )
										}
									/>

									<TextControl
										label={ getI18nString(
											'row_custom_class_label',
											'Classes CSS Extras da Linha'
										) }
										help={ getI18nString(
											'row_custom_class_help',
											"Classes utilitárias adicionais aplicadas diretamente na tag '.row'."
										) }
										value={ rowCustomClass }
										placeholder="ex: gy-4 py-2 border-top"
										onChange={ ( value ) =>
											setAttributes( { rowCustomClass: value } )
										}
									/>
								</PanelBody>
							);
						}

						return null;
					} }
				</TabPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="luiz0067-grid-flex-header-bar">
					<span className="badge-title">
						<i className="fa-solid fa-table-cells" style={ { marginRight: '6px' } }></i>
						{ getI18nString( 'block_title', 'Grid Flex' ) } ({ columnsCount } { getI18nString( 'tab_columns', 'Colunas' ) })
					</span>
					<span className="badge-meta">
						<code>.{ gutterSize }</code> &bull; <code>.{ verticalAlign }</code> &bull; <code>.{ horizontalAlign }</code>
					</span>
					<span className="badge-info">
						{ getI18nString( 'editor_guide_notice', 'Linhas-guia visíveis apenas no editor' ) }
					</span>
				</div>

				<div className={ rowClasses }>
					<InnerBlocks
						allowedBlocks={ [ 'luiz0067/grid-column' ] }
						template={ TEMPLATE_DEFAULT }
						orientation="horizontal"
					/>
				</div>
			</div>
		</>
	);
}
