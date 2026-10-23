# 🎮 Pokédex Explorer — React + Vite

Uma Pokédex interativa da primeira geração, criada para a Atividade  da disciplina **Desenvolvimento e Integração de Aplicações Web (DIAW)**, PUC Minas — 2026/2.

**Autor:** Luiz Gustavo Moura e Souza


## Funcionalidades

- ✅ Exibição dos **151 Pokémon** do JSON fornecido pelo professor
- ✅ Número, nome, tipos e seis atributos em cada card
- ✅ Busca dinâmica por **nome ou ID**
- ✅ Filtro por tipo e ordenação por número, nome ou atributos
- ✅ Modal detalhado com barras de atributos
- ✅ Seção de **12 treinadores**, mostrando insígnias e Pokémon relacionados
- ✅ Favoritos persistidos no navegador (`localStorage`)
- ✅ Seleção aleatória de Pokémon
- ✅ Estado vazio quando a pesquisa não encontra resultados
- ✅ Interface responsiva para desktop, tablet e celular

## Tecnologias

- React — componentes funcionais, `props`, `useState`, `useEffect` e renderização com `map()`
- Vite — ambiente de desenvolvimento e build
- JavaScript (JSX)
- CSS3 (Grid, Flexbox, animações e media queries)

## Como executar

**Pré-requisito:** Node.js 20.19+ ou 22.12+ e npm instalados.

```bash
git clone https://github.com/LuizMoura06/pokedex-react.git
cd pokedex-react
npm install
npm run dev
```

Abra no navegador o endereço informado pelo Vite, geralmente `http://localhost:5173/`.

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

O resultado do build é gerado na pasta `dist/`.

## Estrutura do projeto

```text
pokedex-react/
├── public/
├── src/
│   ├── components/
│   │   ├── PokemonCard.jsx
│   │   ├── PokemonDetails.jsx
│   │   ├── TrainerGrid.jsx
│   │   └── TypeBadge.jsx
│   ├── data/
│   │   └── pokedex-data.json
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Fonte dos dados e imagens

- **Dados:** arquivo `pokedex-data.json` disponibilizado pelo professor [João Paulo Aramuni](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/blob/main/ATIVIDADES/ATIVIDADE%2003.md). Os dados são locais; **não há dependência de API externa** para pesquisar, filtrar ou consultar Pokémon.
- **Imagens:** arte de Pokémon carregada de [PokéAPI/sprites](https://github.com/PokeAPI/sprites). Se não houver internet, os dados e os controles da Pokédex continuam funcionando, mas as imagens podem não carregar.
- **Direitos:** Pokémon e suas representações visuais pertencem aos respectivos titulares. Aplicação feita para fins educacionais, sem afiliação oficial.

## Conceitos de React demonstrados

| Conceito | Onde está |
| --- | --- |
| Componentização | `src/components/` |
| Props | `PokemonCard`, `PokemonDetails`, `TrainerGrid`, `TypeBadge` |
| `useState` | Busca, filtro, ordenação, aba, favoritos e modal em `App.jsx` |
| `useEffect` | Persistência de favoritos e controle do modal |
| `map()` | Renderização dos cards, tipos, treinadores e atributos |
| Eventos | `onChange`, `onClick`, `onMouseDown`, `onKeyDown` via listener |
| Filtragem e estados derivados | `filteredPokemon` com `useMemo` em `App.jsx` |

## Checklist para a entrega no Canvas

1. Executar `npm install` e `npm run dev`.
2. Testar pesquisa por **Pikachu** e por **25**.
3. Filtrar pelo tipo **Fire** e abrir o **Charizard**.
4. Testar favoritos, detalhes e a seção de treinadores.
5. Confirmar que `npm run build` termina sem erros.
6. Publicar os arquivos em um repositório no GitHub (não enviar `node_modules/`).
7. Enviar a **URL do repositório** na atividade do Canvas antes de **23/10/2026, às 23h59**.


