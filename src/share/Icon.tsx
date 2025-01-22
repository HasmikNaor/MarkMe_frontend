interface IIcon {
  data: string;
  fill: string;
  className?: string;
  width?: number;
  height?: number;
  viewbox: string;
}
const Icon = ({ data, fill, className, width, height, viewbox }: IIcon) => {
  const viewboxData = viewbox.split(" ").map(Number);

  const w = viewboxData[2];
  const h = viewboxData[3];

  return (
    <svg
      fill={fill}
      className={className}
      viewBox={viewbox}
      width={width || w}
      height={height || h}
    >
      <g>
        <path d={data} />
      </g>
    </svg>
  );
};
export default Icon;
