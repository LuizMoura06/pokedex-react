import { useEffect, useRef } from 'react';
import TypeBadge from './TypeBadge.jsx';
import { artworkUrl } from './PokemonCard.jsx';

const stats = [
  ['hp', 'HP'], ['attack', 'Ataque'], ['defense', 'Defesa'],
  ['specialAttack', 'Ataque Especial'], ['specialDefense', 'Defesa Especial'], ['speed', 'Velocidade'],
];

export default function PokemonDetails({ pokemon, onClose, isFavorite, onToggleFavorite }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const handleEscape = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!pokemon) return null;
  const displayedTypes = pokemon.types.length ? pokemon.types : [{ id: 0, name: 'Typeless' }];

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="details-title" className="details-modal">
        <button ref={closeButtonRef} className="modal-close" type="button" onClick={onClose} aria-label="Fechar detalhes">✕</button>
        <div className="modal-art" style={{ '--type-color': `var(--type-${displayedTypes[0].name.toLowerCase()}, #8894a5)` }}>
          <span className="modal-number">#{String(pokemon.id).padStart(3, '0')}</span>
          <span className="modal-orbit" aria-hidden="true" />
          <img src={artworkUrl(pokemon.id)} alt={pokemon.name} onError={(event) => { event.currentTarget.style.opacity = '0'; }} />
        </div>
        <div className="modal-information">
          <span className="eyebrow">POKÉMON PROFILE</span>
          <h2 id="details-title">{pokemon.name}</h2>
          <div className="type-list">{displayedTypes.map((type) => <TypeBadge name={type.name} key={type.id} />)}</div>
          <p className="modal-description">Conheça os atributos deste Pokémon e compare suas habilidades dentro da Pokédex.</p>
          <div className="stats-heading"><strong>Atributos base</strong><span>Total: {Object.values(pokemon.stats).reduce((a, b) => a + b, 0)}</span></div>
          <div className="stat-bars">
            {stats.map(([key, label]) => (
              <div className="stat-row" key={key}>
                <span>{label}</span>
                <div className="stat-track" role="meter" aria-label={`${label} de ${pokemon.name}`} aria-valuenow={pokemon.stats[key]} aria-valuemin={0} aria-valuemax={255}>
                  <span style={{ width: `${Math.min(100, pokemon.stats[key] / 180 * 100)}%` }} />
                </div>
                <strong>{pokemon.stats[key]}</strong>
              </div>
            ))}
          </div>
          <button type="button" className={`modal-favorite ${isFavorite ? 'is-favorite' : ''}`} onClick={() => onToggleFavorite(pokemon.id)}>
            {isFavorite ? '♥ Remover dos favoritos' : '♡ Adicionar aos favoritos'}
          </button>
        </div>
      </section>
    </div>
  );
}
