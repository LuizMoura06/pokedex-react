import { artworkUrl } from './PokemonCard.jsx';

export default function TrainerGrid({ trainers, pokemonById, onSelectPokemon }) {
  return (
    <div className="trainer-grid">
      {trainers.map((trainer, index) => (
        <article className="trainer-card" key={trainer.id}>
          <div className="trainer-topline"><span className="trainer-index">TRAINER {String(index + 1).padStart(2, '0')}</span><span className="badge-count">🏅 {trainer.badges} insígnias</span></div>
          <div className="trainer-avatar" aria-hidden="true">{trainer.name.charAt(0).toUpperCase()}</div>
          <h3>{trainer.name}</h3>
          <p>{trainer.pokemonIds.length} Pokémon na equipe</p>
          <div className="trainer-pokemon" aria-label={`Equipe de ${trainer.name}`}>
            {trainer.pokemonIds.map((id) => {
              const pokemon = pokemonById.get(id);
              if (!pokemon) return null;
              return (
                <button type="button" key={id} title={pokemon.name} aria-label={`Ver ${pokemon.name} da equipe de ${trainer.name}`} onClick={() => onSelectPokemon(pokemon)}>
                  <img src={artworkUrl(id)} alt="" loading="lazy" />
                </button>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}
