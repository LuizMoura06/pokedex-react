import TypeBadge from './TypeBadge.jsx';

const shortStats = [
  ['hp', 'HP'], ['attack', 'ATK'], ['defense', 'DEF'],
  ['specialAttack', 'SP.ATK'], ['specialDefense', 'SP.DEF'], ['speed', 'SPD'],
];

export const artworkUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export default function PokemonCard({ pokemon, onSelect, isFavorite, onToggleFavorite }) {
  const displayedTypes = pokemon.types.length ? pokemon.types : [{ id: 0, name: 'Typeless' }];
  const mainType = displayedTypes[0].name;

  return (
    <article className="pokemon-card" style={{ '--type-color': `var(--type-${mainType.toLowerCase()}, #8894a5)` }}>
      <div className="card-topline">
        <span className="pokemon-number">#{String(pokemon.id).padStart(3, '0')}</span>
        <button
          type="button"
          className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
          onClick={() => onToggleFavorite(pokemon.id)}
          aria-label={isFavorite ? `Remover ${pokemon.name} dos favoritos` : `Favoritar ${pokemon.name}`}
          aria-pressed={isFavorite}
          title={isFavorite ? 'Remover favorito' : 'Adicionar aos favoritos'}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <button type="button" className="pokemon-image-button" onClick={() => onSelect(pokemon)} aria-label={`Ver detalhes de ${pokemon.name}`}>
        <span className="image-orbit" aria-hidden="true" />
        <img src={artworkUrl(pokemon.id)} alt={pokemon.name} loading="lazy" onError={(event) => { event.currentTarget.style.opacity = '0'; }} />
      </button>

      <div className="pokemon-card-content">
        <div className="pokemon-heading">
          <h3>{pokemon.name}</h3>
          <div className="type-list">{displayedTypes.map((type) => <TypeBadge key={type.id} name={type.name} />)}</div>
        </div>
        <div className="compact-stats" aria-label={`Atributos de ${pokemon.name}`}>
          {shortStats.map(([key, label]) => (
            <div key={key} className="compact-stat"><span>{label}</span><strong>{pokemon.stats[key]}</strong></div>
          ))}
        </div>
        <button type="button" className="details-button" onClick={() => onSelect(pokemon)}>
          Ver detalhes <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  );
}
