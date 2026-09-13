# luiz0067 Grid Flex

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952b3.svg)](https://getbootstrap.com)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-6.5.2-339af0.svg)](https://fontawesome.com)
[![License](https://img.shields.io/badge/License-GPL%20v2%20or%20later-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

**luiz0067 Grid Flex** é um plugin de bloco Gutenberg avançado para WordPress desenvolvido para oferecer controle total sobre grades responsivas e alinhamentos Flexbox baseados na arquitetura de 12 colunas do **Bootstrap 5.3**. Com suporte nativo a `<InnerBlocks />`, renderização visual WYSIWYG em tempo real e painel lateral intuitivo (*InspectorControls*) organizado em abas especializadas.

---

## 📸 Demonstração Visual e Screenshots

### 1. Editor Gutenberg com Guias Visuais Pontilhadas
Visualização fiel à experiência de edição no painel do WordPress, com contornos pontilhados para cada coluna e indicador de largura Bootstrap em tempo real:

![Editor Gutenberg com Guias Pontilhadas](assets/screenshots/screenshot-editor.png)

### 2. Painel Lateral de Configurações (InspectorControls)
Controles avançados divididos nas abas **"Colunas"**, **"Responsividade"** e **"Alinhamento e Espaçamento"**:

![Painel Lateral InspectorControls](assets/screenshots/screenshot-inspector.png)

### 3. Renderização Semântica no Frontend
Estrutura HTML limpa aplicando diretamente as classes utilitárias do Bootstrap 5 sem códigos residuais ou tags desnecessárias:

![Renderização no Frontend](assets/screenshots/screenshot-frontend.png)

---

## 🚀 Principais Recursos

- **100% Bootstrap 5.3 Nativo**: Utiliza as classes oficiais de grade (`row`, `col-lg-*`, `col-md-*`, `col-*`, `g-*`, `align-items-*`, `justify-content-*`).
- **Suporte Total a InnerBlocks**: Cada coluna funciona como um container independente capaz de abrigar qualquer bloco Gutenberg (títulos, parágrafos, imagens, botões, sanfonas e blocos de terceiros).
- **Editor WYSIWYG com Linhas-Guia**: Bordas pontilhadas (*dashed guides*) e badges de identificação que auxiliam a diagramação e desaparecem na renderização do site.
- **Painel em 3 Abas Intuitivas**:
  - **Colunas**: Ajuste fino de 1 a 6 colunas com botões de presets rápidos (50/50, 33/67, 33/33/33, 25x4, 16.6x6).
  - **Responsividade**: Breakpoints dedicados para Desktop (LG), Tablet (MD) e Mobile (SM/XS).
  - **Alinhamento e Espaçamento**: Calhas (*Gutters* de `g-0` a `g-5`) e alinhamentos nos eixos vertical e horizontal.
- **Controle Individual de Colunas**: O sub-bloco `luiz0067/grid-column` herda os padrões da linha ou permite larguras customizadas independentes para layouts assimétricos.
- **Internacionalização Dinâmica (i18n)**: Suporte nativo com dicionários em 4 idiomas: Português do Brasil (`pt-BR`), Inglês (`en-US`), Italiano (`it`) e Espanhol (`es`).
- **Ativos Locais Autônomos**: Inclui Bootstrap 5.3.8 e Font Awesome 6.5.2 empacotados localmente, garantindo funcionamento offline, alta performance e zero dependência de CDNs externos.

---

## ⚙️ Documentação Detalhada do Painel Lateral (InspectorControls)

O bloco agrupa todas as configurações em três abas no painel lateral do editor:

### Aba 1: Colunas
Destinada ao dimensionamento e quantidade de colunas ativas na grade:
- **Quantidade de Colunas**: Seletor deslizante (*RangeControl*) de 1 a 6 colunas ativas. A alteração sincroniza automaticamente os blocos internos de coluna.
- **Presets Rápidos de Distribuição**:
  - **1 Coluna (100%)**: `col-lg-12` / `col-md-12` / `col-12`.
  - **2 Colunas Iguais (50/50)**: `col-lg-6` / `col-md-6` / `col-12`.
  - **2 Colunas Proporcionais (33/67)**: Coluna 1 em `col-lg-4` e Coluna 2 em `col-lg-8`.
  - **2 Colunas Invertidas (67/33)**: Coluna 1 em `col-lg-8` e Coluna 2 em `col-lg-4`.
  - **3 Colunas Iguais (33/33/33)**: `col-lg-4` para todas as colunas no desktop.
  - **3 Colunas Destacadas (25/50/25)**: Coluna central com o dobro do tamanho das laterais (`col-lg-3`, `col-lg-6`, `col-lg-3`).
  - **4 Colunas Iguais (25x4)**: `col-lg-3` para cada coluna.
  - **6 Colunas Iguais (16.6x6)**: `col-lg-2` para cada coluna.
- **Botões de Ação Rápida**:
  - **+ Adicionar Coluna**: Insere uma nova coluna filha (até o limite de 6 colunas).
  - **- Remover Última Coluna**: Remove a última coluna com segurança (mantendo no mínimo 1 coluna).

### Aba 2: Responsividade
Permite definir as classes de breakpoint padrão do Bootstrap 5 herdadas por todas as colunas filhas:
- **Largura Desktop (≥ 992px)**: Controla a classe `col-lg-*` (`col-lg-12`, `col-lg-8`, `col-lg-6`, `col-lg-4`, `col-lg-3`, `col-lg-2`, `col-lg-auto`, `col-lg`).
- **Largura Tablet (≥ 768px)**: Controla a classe `col-md-*` (`col-md-12`, `col-md-8`, `col-md-6`, `col-md-4`, `col-md-3`, `col-md-auto`, `col-md`).
- **Largura Mobile (< 768px)**: Controla a classe `col-*` (`col-12`, `col-6`, `col-4`, `col-auto`, `col`).
- **Tabela de Referência de 12 Colunas**:
  - *Desktop (`lg`)*: Telas com largura igual ou superior a 992px.
  - *Tablet (`md`)*: Telas com largura entre 768px e 991px.
  - *Mobile (`sm/xs`)*: Telas com largura inferior a 768px.

### Aba 3: Alinhamento e Espaçamento
Configura o comportamento Flexbox da linha (`.row`) e as calhas entre colunas:
- **Espaçamento entre Colunas (Gutter)**:
  - `g-0`: Sem espaçamento (0px).
  - `g-1`: Muito pequeno (0.25rem / ~4px).
  - `g-2`: Pequeno (0.5rem / ~8px).
  - `g-3`: Médio padrão do Bootstrap (1rem / ~16px).
  - `g-4`: Grande (1.5rem / ~24px).
  - `g-5`: Muito grande (3rem / ~48px).
- **Alinhamento Vertical (Cross Axis)**:
  - `align-items-start`: Alinha os itens no topo da linha.
  - `align-items-center`: Centraliza os itens verticalmente.
  - `align-items-end`: Alinha os itens na base inferior da linha.
  - `align-items-stretch`: Estica os itens para preencher a altura da linha.
- **Alinhamento Horizontal (Main Axis)**:
  - `justify-content-start`: Alinha os itens à esquerda (início).
  - `justify-content-center`: Centraliza os itens horizontalmente.
  - `justify-content-end`: Alinha os itens à direita (fim).
  - `justify-content-between`: Distribui as colunas uniformemente de ponta a ponta.
  - `justify-content-around`: Distribui espaço igual ao redor de cada coluna.
- **Classes CSS Extras da Linha**: Campo para inclusão de classes utilitárias adicionais (ex: `gy-4`, `mt-4`, `shadow-sm`).

---

## 🧩 Sub-Bloco: Coluna Grid (`luiz0067/grid-column`)

Cada coluna inserida dentro do Grid Flex é um bloco independente com as seguintes características:
- **Herança Inteligente**: Adota automaticamente as larguras definidas na linha pai via React Context do WordPress.
- **Sobrescrita Individual**: Ao selecionar a coluna no editor, o painel lateral exibe a seção **"Personalização Individual desta Coluna"**, permitindo definir larguras específicas apenas para aquela coluna (ideal para layouts customizados).
- **Classe CSS Adicional**: Campo para personalização visual exclusiva da coluna (ex: `p-3 bg-light rounded`).

---

## 🌐 Gerenciamento de Idiomas (i18n)

O plugin inclui uma página de opções dedicada localizada em:
**Painel Administrativo > Configurações > luiz0067 Grid Flex**

Opções de idioma suportadas:
1. **Automático (Auto-detect)**: Detecta o idioma do perfil do usuário no WordPress.
2. **Português do Brasil (`pt-BR`)**
3. **English (`en-US`)**
4. **Español (`es`)**
5. **Italiano (`it`)**

Os arquivos de tradução encontram-se em `languages/` estruturados em formato JSON nativo:
- `languages/pt-br.json`
- `languages/en-us.json`
- `languages/it.json`
- `languages/es.json`

---

## 📁 Estrutura de Arquivos e Pastas

```
luiz0067-grid-flex/
├── assets/
│   ├── bootstrap/
│   │   ├── css/bootstrap.min.css
│   │   └── js/bootstrap.bundle.min.js
│   ├── fontawesome/
│   │   ├── css/all.min.css
│   │   └── webfonts/
│   └── screenshots/
│       ├── screenshot-editor.png
│       ├── screenshot-inspector.png
│       └── screenshot-frontend.png
├── languages/
│   ├── pt-br.json
│   ├── en-us.json
│   ├── it.json
│   └── es.json
├── src/
│   ├── index.js
│   ├── edit.js
│   ├── save.js
│   ├── column.js
│   ├── i18n.js
│   ├── editor.scss
│   └── style.scss
├── build/
│   ├── index.js
│   ├── index.asset.php
│   ├── index.css
│   └── style-index.css
├── block.json
├── luiz0067-grid-flex.php
├── package.json
└── readme.md
```

---

## 🛠️ Instruções para Desenvolvimento e Compilação

Para compilar os arquivos de origem (`src/`) para produção (`build/`):

```bash
# Instalar as dependências de compilação do WordPress
npm install

# Compilar para produção com minificação
npm run build

# Executar em modo de desenvolvimento com hot-reload / watch
npm run start
```

---

## 👤 Metadados de Autoria

- **Autor:** Luiz Fernando Brogliatto Ferreira
- **Perfil WordPress.org:** [https://profiles.wordpress.org/luiz0067/](https://profiles.wordpress.org/luiz0067/)
- **GitHub:** [https://github.com/luiz0067yahoo](https://github.com/luiz0067yahoo)
- **LinkedIn:** [https://www.linkedin.com/in/luiz-ferreira-260277379/](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---

## 📄 Licença

Este projeto é distribuído sob a licença [GPL v2 or later](https://www.gnu.org/licenses/gpl-2.0.html).