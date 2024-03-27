import classNames from "classnames";

const Skeleton = ({count, className}) => {

    const outerClassNames = classNames(
        'relative',
        'overflow-hidden',
        'rounded',
        'bg-gray-200',
        'mb-2.5',
        className,
    );
    const innerClassNames = classNames(
        'animate-shimmer',
        'absolute',
        'inset-0',
        '-translate-x-full',
        'bg-gradient-to-r',
        'from-gray-200',
        'via-white',
        'to-gray-200',
    );

    const boxes = Array.from({ length: count }, (_, i) => (
        <div key={i} className={outerClassNames}>
          <div className={innerClassNames} />
        </div>
      ));
    // const boxes = [];

    // for (let i = 0; i < times; i++) {
    //     boxes.push(<div key={i} className="skeleton-box"></div>)
     return boxes
};

export  default Skeleton;