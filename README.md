# Pokédex React

Projeto da Atividade 03 de Desenvolvimento e Integração de Aplicações Web (DIAW), da PUC Minas.

A Pokédex reúne os 151 Pokémon da primeira geração, com informações sobre tipos e atributos. É possível pesquisar por nome ou número, filtrar por tipo, ordenar os resultados e consultar os detalhes de cada Pokémon.

## Funcionalidades

- Listagem dos 151 Pokémon
- Pesquisa por nome ou número
- Filtros por tipo e ordenação
- Visualização de atributos e detalhes
- Favoritos salvos no navegador
- Seção de treinadores e suas equipes
- Layout para celular e computador

## Tecnologias

- React
- Vite
- JavaScript
- CSS

## Como executar

É necessário ter Node.js e npm instalados.

```bash
git clone https://github.com/LuizMoura06/pokedex-react.git
cd pokedex-react
npm install
npm run dev
```

Abra o endereço indicado no terminal, normalmente `http://localhost:5173/`.

## Organização do projeto

- `src/App.jsx`: tela principal, pesquisa e filtros.
- `src/components/`: cards, detalhes e lista de treinadores.
- `src/data/`: arquivo JSON com os Pokémon e treinadores.
- `src/index.css`: estilos da interface.



## Dados e imagens

Os dados estão no arquivo `src/data/pokedex-data.json`, disponibilizado na [atividade da disciplina](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/blob/main/ATIVIDADES/ATIVIDADE%2003.md).

As imagens dos Pokémon são carregadas do projeto [PokéAPI/sprites](https://github.com/PokeAPI/sprites).

## Autor

Luiz Gustavo Moura e Souza
