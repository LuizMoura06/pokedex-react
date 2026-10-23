import { useCallback, useEffect, useMemo, useState } from 'react';
import data from './data/pokedex-data.json';
import PokemonCard from './components/PokemonCard.jsx';
import PokemonDetails from './components/PokemonDetails.jsx';
import TrainerGrid from './components/TrainerGrid.jsx';

const INITIAL_COUNT = 24;
const FAVORITES_KEY = 'pokedex-diaw-favorites';

const sortOptions = [
  { value: 'id', label: 'Número (crescente)' },
  { value: 'name', label: 'Nome (A–Z)' },
  { value: 'hp', label: 'Maior HP' },
  { value: 'attack', label: 'Maior ataque' },
  { value: 'defense', label: 'Maior defesa' },
  { value: 'specialAttack', label: 'Maior ataque especial' },
  { value: 'speed', label: 'Maior velocidade' },
];

function readFavorites() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(FAVORITES_KEY) || '[]');
    return Array.isArray(stored) ? stored.filter(Number.isInteger) : [];
  } catch {
    return [];
  }
}

function PokeBallIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" />
      <path d="M4 24h40" stroke="currentColor" strokeWidth="4" />
      <circle cx="24" cy="24" r="8" fill="#111623" stroke="currentColor" strokeWidth="4" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('pokemon');
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('id');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(readFavorites);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    try { window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); }
    catch {}
  }, [favorites]);

  useEffect(() => { setVisibleCount(INITIAL_COUNT); }, [search, selectedType, sortBy, favoritesOnly]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  }, []);
  const closeDetails = useCallback(() => setSelectedPokemon(null), []);

  const pokemonById = useMemo(() => new Map(data.pokemon.map((pokemon) => [pokemon.id, pokemon])), []);
  const favoriteIds = useMemo(() => new Set(favorites), [favorites]);
  const filteredPokemon = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = data.pokemon.filter((pokemon) => {
      const matchesSearch = !query || pokemon.name.toLowerCase().includes(query) || String(pokemon.id).includes(query);
      const matchesType = selectedType === 'all' || (selectedType === 'Typeless' ? pokemon.types.length === 0 : pokemon.types.some((type) => type.name === selectedType));
      return matchesSearch && matchesType && (!favoritesOnly || favoriteIds.has(pokemon.id));
    });
    return filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'id') return a.id - b.id;
      return b.stats[sortBy] - a.stats[sortBy] || a.id - b.id;
    });
  }, [search, selectedType, sortBy, favoritesOnly, favoriteIds]);

  const resetFilters = () => {
    setSearch('');
    setSelectedType('all');
    setFavoritesOnly(false);
    setSortBy('id');
  };

  const pickRandom = () => setSelectedPokemon(data.pokemon[Math.floor(Math.random() * data.pokemon.length)]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner container">
          <a className="brand" href="#inicio" aria-label="Ir para o início da Pokédex"><span className="brand-symbol"><PokeBallIcon size={27} /></span><span>POKÉ<span className="brand-red">DEX</span><small>EXPLORER</small></span></a>
          <nav aria-label="Navegação principal" className="main-nav">
            <button type="button" className={activeTab === 'pokemon' ? 'nav-active' : ''} onClick={() => setActiveTab('pokemon')}>Pokédex</button>
            <button type="button" className={activeTab === 'trainers' ? 'nav-active' : ''} onClick={() => setActiveTab('trainers')}>Treinadores</button>
          </nav>
          <div className="header-counter"><span className="online-dot" /> GEN 01 DATABASE</div>
        </div>
      </header>

      <main id="inicio" className="container">
        <section className="hero" aria-label="Introdução à Pokédex">
          <div className="hero-decoration hero-decoration-one" aria-hidden="true" />
          <div className="hero-decoration hero-decoration-two" aria-hidden="true" />
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-line" /> YOUR JOURNEY STARTS HERE</span>
            <h1>Explore o mundo <br />dos <span>Pokémon.</span></h1>
            <p>Descubra habilidades, compare atributos e conheça os treinadores da primeira geração. Sua aventura começa com um clique.</p>
            <div className="hero-actions">
              <button type="button" className="primary-button" onClick={() => { setActiveTab('pokemon'); document.getElementById('explorar')?.scrollIntoView({ behavior: 'smooth' }); }}>Explorar Pokédex <span aria-hidden="true">↗</span></button>
              <button type="button" className="secondary-button" onClick={pickRandom}>🎲 Surpreenda-me</button>
            </div>
          </div>
          <div className="hero-ball" aria-hidden="true"><div className="hero-ball-top" /><div className="hero-ball-center"><span /></div><div className="hero-ball-shine" /></div>
          <div className="hero-stats">
            <div><strong>{data.pokemon.length}</strong><span>POKÉMON</span></div>
            <i />
            <div><strong>{data.types.length}</strong><span>TIPOS</span></div>
            <i />
            <div><strong>{data.trainers.length}</strong><span>TREINADORES</span></div>
          </div>
        </section>

        <section id="explorar" className="explore-section">
          <div className="section-heading">
            <div><span className="eyebrow">GENERATION I • KANTO REGION</span><h2>{activeTab === 'pokemon' ? 'Descubra sua próxima aventura' : 'Treinadores de Kanto'}</h2><p>{activeTab === 'pokemon' ? 'Explore cada Pokémon, seus tipos e atributos de batalha.' : 'Conheça os treinadores e descubra quais Pokémon fazem parte de suas equipes.'}</p></div>
            <span className="section-tag"><PokeBallIcon size={18} /> {activeTab === 'pokemon' ? `${filteredPokemon.length} encontrados` : `${data.trainers.length} treinadores`}</span>
          </div>

          {activeTab === 'pokemon' ? (
            <>
              <div className="filter-panel">
                <label className="search-field"><span aria-hidden="true">⌕</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nome ou número..." aria-label="Pesquisar Pokémon por nome ou número" /><kbd>/</kbd></label>
                <label className="select-field"><span className="field-label">TIPO</span><select aria-label="Filtrar por tipo" value={selectedType} onChange={(event) => setSelectedType(event.target.value)}><option value="all">Todos os tipos</option>{data.types.map((type) => <option key={type.id} value={type.name}>{type.name}</option>)}</select></label>
                <label className="select-field sort-field"><span className="field-label">ORDENAR</span><select aria-label="Ordenar Pokémon" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>{sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
              </div>
              <div className="filter-meta"><span>Mostrando <strong>{Math.min(visibleCount, filteredPokemon.length)}</strong> de <strong>{filteredPokemon.length}</strong> Pokémon</span><button type="button" className={`favorite-filter ${favoritesOnly ? 'active' : ''}`} aria-pressed={favoritesOnly} onClick={() => setFavoritesOnly((value) => !value)}>{favoritesOnly ? '♥' : '♡'} Favoritos ({favorites.length})</button></div>

              {filteredPokemon.length ? (
                <><div className="pokemon-grid">{filteredPokemon.slice(0, visibleCount).map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} onSelect={setSelectedPokemon} isFavorite={favoriteIds.has(pokemon.id)} onToggleFavorite={toggleFavorite} />)}</div>
                {visibleCount < filteredPokemon.length && <div className="load-more-wrap"><button type="button" className="load-more-button" onClick={() => setVisibleCount((count) => count + INITIAL_COUNT)}>Carregar mais Pokémon <span aria-hidden="true">↓</span></button></div>}</>
              ) : (
                <div className="empty-state"><PokeBallIcon size={54} /><h3>Nenhum Pokémon encontrado</h3><p>Tente pesquisar outro nome, número ou tipo.</p><button type="button" className="secondary-button" onClick={resetFilters}>Limpar filtros</button></div>
              )}
            </>
          ) : <TrainerGrid trainers={data.trainers} pokemonById={pokemonById} onSelectPokemon={setSelectedPokemon} />}
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><span className="footer-brand"><PokeBallIcon size={18} /> POKÉDEX EXPLORER</span><p>Projeto acadêmico • Desenvolvimento e Integração de Aplicações Web • PUC Minas</p><span>Feito com React + Vite</span></div></footer>

      {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} onClose={closeDetails} isFavorite={favoriteIds.has(selectedPokemon.id)} onToggleFavorite={toggleFavorite} />}
    </div>
  );
}
