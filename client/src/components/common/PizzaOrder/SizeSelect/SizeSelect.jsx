import './SizeSelect.scss';

export default function SizeSelect({
  name,
  className,
  title,
  selected,
  onSizeClick,
}) {
  return (
    <button
      type="button"
      name={name}
      className={`size-selector flex flex-wrap mr-4${selected === name ? ' active' : ''}`}
      onClick={onSizeClick}
    >
      <div className="leading-1 mr-1 font-bold">
        {title}
      </div>
      <i className={`fa-duotone fa-pizza-slice select-size ${className}`} />
    </button>
  );
}
