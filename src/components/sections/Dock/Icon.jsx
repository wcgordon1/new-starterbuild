import { Icons } from './icons';

const Icon = ({ name }) => {
  const icon = Icons[name];
  if (!icon) return null;

  return (
    <svg
      width={icon.width}
      height={icon.height}
      viewBox={icon.viewBox}
      fill={icon.fill}
      strokeWidth={icon.strokeWidth}
      strokeLinecap={icon.strokeLinecap}
      strokeLinejoin={icon.strokeLinejoin}
      stroke={icon.stroke}
    >
      {icon.paths.map((path, index) => (
        <path key={index} d={path.d} />
      ))}
    </svg>
  );
};

export default Icon;
