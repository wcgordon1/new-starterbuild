import React, { useEffect, useState } from "react";
import mailgo from "mailgo";
import Icon from "./Icon";

const DockItem = ({
  iconName,
  path,
  ariaLabel,
  isHovered,
  isNeighbor,
  onMouseEnter,
  external,
  email,
}) => {
  const scale = isHovered ? 2.5 : isNeighbor ? 2 : 1;
  const margin = isHovered || isNeighbor ? "28px" : "4px";
  const linkStyle = { transform: `scale(${scale})`, margin: `0 ${margin}` };

  return (
    <div className="dock__item" style={linkStyle} onMouseEnter={onMouseEnter}>
      {email ? (
        <a
          href="#mailgo"
          data-address={email.address}
          data-domain={email.domain}
          aria-label={ariaLabel}
        >
          <div className="dock__item__link__wrap">
            <Icon name={iconName} />
          </div>
        </a>
      ) : external ? (
        <a href={path} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
          <div className="dock__item__link__wrap social">
            <Icon name={iconName} />
          </div>
        </a>
      ) : (
        <a href={path} aria-label={ariaLabel}>
          <div className="dock__item__link__wrap">
            <Icon name={iconName} />
          </div>
        </a>
      )}
    </div>
  );
};

// Dock component
const Dock = () => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [hoverEffectsEnabled, setHoverEffectsEnabled] = useState(
    window.innerWidth >= 900
  );

  useEffect(() => {
    const checkScreenSize = () => {
      const isEnabled = window.innerWidth >= 900;
      setHoverEffectsEnabled(isEnabled);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleMouseEnter = (index) => {
    if (hoverEffectsEnabled) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (hoverEffectsEnabled) {
      setTimeout(() => {
        setHoveredIndex(-100);
      }, 50);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setHoveredIndex(-100);
    }, 50);
  }, []);

  useEffect(() => {
    const mailgoConfig = {
      showFooter: false,
    };
    mailgo(mailgoConfig);
  }, []);

  const icons = [
    { iconName: "home", path: "/", ariaLabel: "Home page" },
    { iconName: "about", path: "/about", ariaLabel: "About page" },
    //{ iconName: "folder", path: "/projects", ariaLabel: "Projects page" },
    {
      iconName: "x",
      path: "https://x.com/starterbuild",
      ariaLabel: "Visit StarterBuild on X (opens in a new tab)",
      external: true,
    },
    {
      iconName: "linkedin",
      path: "https://www.linkedin.com/company/starterbuild/",
      ariaLabel: "Visit StarterBuild on LinkedIn (opens in a new tab)",
      external: true,
    },
    {
      iconName: "envelope",
      email: { address: "will", domain: "starterbuild.com" },
      ariaLabel: "Contact me",
    },
  ];

  return (
    <div className="dock__container" onMouseLeave={handleMouseLeave}>
      <div className="dock">
        {icons.map((item, index) => (
          <DockItem
            key={index}
            iconName={item.iconName}
            path={item.path}
            ariaLabel={item.ariaLabel}
            isHovered={index === hoveredIndex}
            isNeighbor={Math.abs(index - hoveredIndex) === 1}
            onMouseEnter={() => handleMouseEnter(index)}
            external={item.external}
            email={item.email}
          />
        ))}
      </div>
    </div>
  );
};

export default Dock;
