function Hexagone(props) {
  const { className, round } = props;
  return (
    <>
      <svg
        className="hidden absolute w-0 h-0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="round">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={round || 2}
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div className={`hexagone relative ${className}`}>
        <div className="absolute inset-0 w-full h-full grid place-items-center">
          {props.children}
        </div>
      </div>
    </>
  );
}

export default Hexagone;
