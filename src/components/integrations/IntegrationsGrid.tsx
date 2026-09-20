import React, { useState } from 'react';
import { INTEGRATION_LOGOS, IntegrationLogo } from '../../data/integrations';

const LogoTile: React.FC<IntegrationLogo> = ({ name, slug, src }) => {
  const localSrc = `/logos/${slug}.svg`;
  const [imgSrc, setImgSrc] = useState(src ?? localSrc);

  return (
    <li className="w-28 flex flex-col items-center gap-3 text-center">
      <div className="h-24 w-24 rounded-full bg-white border border-aurmak-border shadow-md flex items-center justify-center">
        <img
          src={imgSrc}
          alt={`${name} logo`}
          width={56}
          height={56}
          className="h-14 w-14 object-contain"
          onError={() => imgSrc !== localSrc && setImgSrc(localSrc)}
        />
      </div>
      <span className="text-base font-medium text-aurmak-navy leading-tight">{name}</span>
    </li>
  );
};

export const IntegrationsGrid: React.FC = () => (
  <ul className="flex flex-wrap justify-center gap-x-6 gap-y-8" aria-label="Applications we connect to">
    {INTEGRATION_LOGOS.map((logo) => (
      <LogoTile key={logo.slug} {...logo} />
    ))}
  </ul>
);
