import React from 'react';

/**
 * The AURMAK mark, in the brand's own colours.
 *
 * Navy #282973, cyan #27aae1 and light blue #8cccf0, exactly as supplied in the parent
 * brand's aurmak-logo.svg. The logo is issued, not recoloured or tinted. A `dark` variant
 * paints the whole mark white for use on the navy footer/hero.
 */

const NAVY = '#282973';
const CYAN = '#27aae1';
const SKY = '#8cccf0';

interface AurmakMarkProps {
  className?: string;
  /** Render the mark all-white for dark grounds (footer, hero). */
  dark?: boolean;
}

export const AurmakMark: React.FC<AurmakMarkProps> = ({ className = '', dark = false }) => {
  const navy = dark ? '#FFFFFF' : NAVY;
  const cyan = dark ? '#FFFFFF' : CYAN;
  const sky = dark ? '#FFFFFF' : SKY;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 154.38 34.25"
      role="img"
      aria-label="AURMAK"
      className={className}
    >
      <g>
        <path fill={navy} d="M54.14,18.9l-2.14-4.95-2.11,4.95h4.25ZM43.7,22.53l6.78-14.85h3.07l8.42,18.42h-2.94c-.97,0-2.11-.79-2.54-1.76l-.81-1.82h-7.34l-.81,1.82c-.43.97-1.57,1.76-2.54,1.76h-2.94l1.63-3.58Z" />
        <path fill={navy} fillRule="evenodd" d="M60.99,7.69h2.08c1,0,2.47.18,2.47,3.52v7.72c0,1.1.37,2.02,1.12,2.77.72.61,1.72.92,3.02.92s2.36-.3,3.17-.92c.75-.75,1.12-1.67,1.12-2.77V7.69h12.51c1.76,0,3.25.6,4.46,1.79,1.08,1.09,1.62,2.62,1.62,4.58s-.54,3.49-1.62,4.57c-.57.57-1.23,1.01-1.96,1.31l-2.71-3.16h.21c.32,0,.62-.14.91-.42.41-.4.62-1.17.62-2.3s-.21-1.91-.62-2.31c-.28-.28-.59-.42-.91-.42h-7.96v7.9c0,1.93-.71,3.61-2.13,5.02-1.53,1.54-3.77,2.31-6.71,2.31s-5.03-.77-6.56-2.31c-1.42-1.41-2.13-3.08-2.13-5.02V7.69Z" />
        <path fill={cyan} d="M93.28,26.1h-3.49c-.96,0-2.32-.65-3.31-1.53-.2-.17-.38-.35-.55-.55-2.05-2.42-4.11-4.83-6.17-7.24h5.47c2.68,3.13,5.36,6.2,8.05,9.32" />
        <path fill={navy} d="M127.65,18.9l-2.14-4.95-2.11,4.95h4.25ZM117.2,22.53l6.79-14.85h3.07l8.42,18.42h-2.94c-.97,0-2.11-.79-2.54-1.76l-.81-1.82h-7.34l-.81,1.82c-.43.97-1.57,1.76-2.54,1.76h-2.94l1.63-3.58ZM140.87,24.41v-2.94h0v-1.95l1.25-1.13,6.66,7.72h5.59l-9.02-10.67,8.52-7.75h-5.7l-7.31,6.46v-6.46h-4.55v18.42h1.81l.98.02c.97.02,1.76-.75,1.76-1.72ZM111.52,7.69l-7.03,11.44-7.02-11.44h-3.18v18.42h1.63s.86,0,.86,0c.97,0,1.76-.79,1.76-1.75v-1.48h0v-6.78l4.95,7.83,1,1.61,5.95-9.45v7.18h0v1.15c0,.97.79,1.74,1.76,1.72l.98-.02h1.51V7.69h-3.18Z" />
      </g>
      <g>
        <path fill={cyan} d="M4.97,13.68l6.86-6.86,6.85,6.86,6.85-6.86,6.85,6.86,3.64,3.64c1.78,1.78,1.78,4.66,0,6.43l-3.64,3.64-6.85-6.85-6.85-6.85-6.85,6.85-6.86,6.85-3.64-3.64c-1.78-1.78-1.78-4.66,0-6.43l3.64-3.64Z" />
        <path fill={navy} d="M11.82,34.25l-6.85-6.86,6.85-6.85.07.07c3.75,3.75,3.75,9.82,0,13.57l-.07.07Z" />
        <path fill={navy} d="M25.53,34.25l-.07-.07c-3.75-3.75-3.75-9.82,0-13.57l.07-.07,6.85,6.85-6.85,6.86Z" />
        <rect fill={sky} x="14.79" y="1.61" width="7.78" height="7.78" transform="translate(1.58 14.82) rotate(-45)" />
      </g>
    </svg>
  );
};
