export default function TypeBadge({ name }) {
  return <span className="type-badge" style={{ '--badge-color': `var(--type-${name.toLowerCase()}, #8894a5)` }}>{name}</span>;
}
