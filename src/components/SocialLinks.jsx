import { socials } from "../data";

function Icon({ children }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const icons = {
  Instagram: (
    <Icon>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </Icon>
  ),
  Facebook: (
    <Icon>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Icon>
  ),
  Reddit: (
    <Icon>
      <circle cx="12" cy="13" r="7" />
      <circle cx="9.2" cy="12.2" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="12.2" r="0.8" fill="currentColor" stroke="none" />
      <path d="M9.2 15.4c.9.8 1.8 1.1 2.8 1.1s1.9-.3 2.8-1.1" />
      <circle cx="17.5" cy="7.4" r="1.3" />
      <path d="M16.4 8.2 14.2 6" />
    </Icon>
  ),
  X: (
    <Icon>
      <path d="M5 5l14 14M19 5 5 19" />
    </Icon>
  ),
  LinkedIn: (
    <Icon>
      <rect x="3" y="9" width="4" height="12" />
      <circle cx="5" cy="4.5" r="1.6" />
      <path d="M10 21V9h3.2v1.7A3.6 3.6 0 0 1 16.6 9c2.4 0 4.4 1.6 4.4 5.1V21h-4v-6.2c0-1.5-.6-2.3-1.8-2.3s-2 .9-2 2.4V21H10z" />
    </Icon>
  ),
};

export default function SocialLinks() {
  return (
    <div className="social-line">
      {socials.map((item) => (
        <a key={item.name} href={item.href} target="_blank" rel="noreferrer" aria-label={item.name}>
          {icons[item.name]}
        </a>
      ))}
    </div>
  );
}
