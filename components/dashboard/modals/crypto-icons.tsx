import React from "react";

const CryptoIcons: Record<string, React.ReactNode> = {
  BTC: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      <path
        d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.921-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
        fill="white"
      />
    </svg>
  ),
  ETH: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#627EEA" />
      <path d="M16.498 4v8.87l7.497 3.35L16.498 4z" fill="white" fillOpacity="0.602" />
      <path d="M16.498 4L9 16.22l7.498-3.35V4z" fill="white" />
      <path d="M16.498 21.968v6.027L24 17.616l-7.502 4.352z" fill="white" fillOpacity="0.602" />
      <path d="M16.498 27.995v-6.028L9 17.616l7.498 10.38z" fill="white" />
      <path d="M16.498 20.573l7.497-4.353-7.497-3.348v7.701z" fill="white" fillOpacity="0.2" />
      <path d="M9 16.22l7.498 4.353v-7.701L9 16.22z" fill="white" fillOpacity="0.602" />
    </svg>
  ),
  SOL: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#14F195" />
      <path d="M8.5 18.5l3-3h13l-3 3h-13zm0-5l3-3h13l-3 3h-13zm13 10l3-3h-13l-3 3h13z" fill="#000" />
    </svg>
  ),
  USDT: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#26A17B" />
      <path
        d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117"
        fill="white"
      />
    </svg>
  ),
  BNB: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
      <path
        d="M16 6l-2.5 2.5L16 11l2.5-2.5L16 6zm-6 6l-2.5 2.5L10 17l2.5-2.5L10 12zm12 0l-2.5 2.5L22 17l2.5-2.5L22 12zm-6 2l-2.5 2.5L16 19l2.5-2.5L16 14zm0 7l-2.5 2.5L16 26l2.5-2.5L16 21z"
        fill="white"
      />
    </svg>
  ),
  TRX: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#FF060A" />
      <path d="M7 6l18 7-7 13L7 6zm11.5 8.5L12 11l-3 9 8.5-5.5z" fill="white" />
    </svg>
  ),
  USDC: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#2775CA" />
      <path
        d="M20 14c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2s.9 2 2 2h4c1.1 0 2 .9 2 2s-.9 2-2 2h-4c-1.1 0-2-.9-2-2"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <path d="M16 8v4m0 8v4" stroke="white" strokeWidth="2" />
    </svg>
  ),
  XRP: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#23292F" />
      <path
        d="M22.8 9h2.4l-5.6 5.6c-1.2 1.2-3.2 1.2-4.4 0L9.6 9H12l4 4c.4.4 1.2.4 1.6 0l4-4zm-13.6 14H6.8l5.6-5.6c1.2-1.2 3.2-1.2 4.4 0l5.6 5.6H20l-4-4c-.4-.4-1.2-.4-1.6 0l-4 4z"
        fill="white"
      />
    </svg>
  ),
  LTC: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#345D9D" />
      <path
        d="M13.7 18.6l-1.4.55-.7-.9 1.4-.56 1.9-6.85h3l-1.5 5.4 1.4-.55.4 1-1.42.55-.55 2h6.7L21.3 22H10l.9-3.2-1.4.55-.4-1 1.4-.55z"
        fill="white"
      />
    </svg>
  ),
  DOGE: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#C2A633" />
      <path
        d="M12 9h4.8c3.6 0 6 2.6 6 7s-2.4 7-6 7H12v-5H9.8v-2.4H12v-1.2H9.8V12H12V9zm2.6 2.6v9.8h2c2.2 0 3.6-1.8 3.6-4.9s-1.4-4.9-3.6-4.9h-2z"
        fill="white"
      />
    </svg>
  ),
  ADA: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#0033AD" />
      <g fill="white">
        <circle cx="16" cy="9" r="1.6" />
        <circle cx="16" cy="23" r="1.6" />
        <circle cx="10.5" cy="12" r="1.6" />
        <circle cx="21.5" cy="12" r="1.6" />
        <circle cx="10.5" cy="20" r="1.6" />
        <circle cx="21.5" cy="20" r="1.6" />
        <circle cx="7" cy="16" r="1.6" />
        <circle cx="25" cy="16" r="1.6" />
        <circle cx="16" cy="16" r="2.1" />
      </g>
    </svg>
  ),
  AVAX: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#E84142" />
      <path d="M19.5 10h-2.9l-5.2 12h3l1.1-2.7h5.3l1 2.7h3l-5.3-12zm-3.1 6.9l1.7-4.3 1.6 4.3h-3.3z" fill="white" />
    </svg>
  ),
  MATIC: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#8247E5" />
      <path
        d="M20.5 13.2l-3-1.7a1 1 0 0 0-1 0l-3 1.7a1 1 0 0 0-.5.87v3.46a1 1 0 0 0 .5.87l3 1.7a1 1 0 0 0 1 0l3-1.7a1 1 0 0 0 .5-.87v-1.16l-1.5.87v.3l-2 1.13-2-1.13v-2.27l2-1.13 2 1.13v-1.87z"
        fill="white"
      />
    </svg>
  ),
  DOT: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#E6007A" />
      <ellipse cx="16" cy="7.5" rx="3.2" ry="2.4" fill="white" />
      <ellipse cx="16" cy="24.5" rx="3.2" ry="2.4" fill="white" />
      <ellipse cx="7" cy="16" rx="2.4" ry="3.2" fill="white" />
      <ellipse cx="25" cy="16" rx="2.4" ry="3.2" fill="white" />
    </svg>
  ),
  ATOM: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#2E3148" />
      <circle cx="16" cy="16" r="2" fill="white" />
      <ellipse cx="16" cy="16" rx="9" ry="3.4" stroke="white" strokeWidth="1.3" />
      <ellipse cx="16" cy="16" rx="9" ry="3.4" stroke="white" strokeWidth="1.3" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="9" ry="3.4" stroke="white" strokeWidth="1.3" transform="rotate(120 16 16)" />
    </svg>
  ),
  DAI: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#F5AC37" />
      <path
        d="M11 9h5.6c4 0 6.9 2.7 6.9 7s-2.9 7-6.9 7H11v-4.3H9.3v-1.6H11v-2.2H9.3v-1.6H11V9zm2.6 2.4v3.1h4.7v1.6h-4.7v3.1h4.7v1.6h-4.7v.1h3c2.6 0 4.3-1.8 4.3-4.7s-1.7-4.7-4.3-4.7h-3z"
        fill="white"
      />
    </svg>
  ),
  LINK: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#2A5ADA" />
      <path
        d="M16 6.5l3.6 2.1v4.2L23.2 15v6l-3.6 2.2v4.2L16 29.5l-3.6-2.1v-4.2L8.8 21v-6l3.6-2.2V8.6L16 6.5zm0 3.5l-2.4 1.4v2.8l2.4-1.4 2.4 1.4v-2.8L16 10zm-5.2 6l-.8.5v2.9l.8.5v-3.9zm10.4 0v3.9l.8-.5v-2.9l-.8-.5zM13.6 21.5v2.8L16 25.7l2.4-1.4v-2.8L16 22.9l-2.4-1.4z"
        fill="white"
      />
    </svg>
  ),
  TON: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#0088CC" />
      <path d="M10 10h12l-6 13-6-13zm2.3 2l3.7 8 3.7-8h-7.4z" fill="white" />
    </svg>
  ),
  GENERIC: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#9CA3AF" />
      <circle cx="16" cy="16" r="9" stroke="white" strokeWidth="2" fill="none" />
      <text x="16" y="20.5" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">$</text>
    </svg>
  ),
};

export const getCryptoIcon = (currency: string): React.ReactNode => {
  if (currency.includes("USDT")) return CryptoIcons.USDT;
  if (currency.includes("USDC")) return CryptoIcons.USDC;
  // Match the base symbol (e.g. "BTC" out of "BTC (Bitcoin Network)") before
  // falling back — a currency this doesn't recognise gets a neutral coin
  // glyph, never another coin's logo (that's what caused USDC to render as
  // Bitcoin previously: every unmapped key silently fell back to BTC).
  return CryptoIcons[currency] || CryptoIcons.GENERIC;
};

export const getNetworkName = (currency: string): string => {
  if (currency === "BTC") return "Bitcoin Network";
  if (currency === "ETH") return "ERC20 Network";
  if (currency === "SOL") return "Solana Network";
  if (currency === "USDT ERC20") return "ERC20 Network";
  if (currency === "USDT TRC20") return "TRC20 Network";
  if (currency === "USDT SOL") return "Solana Network";
  if (currency === "USDT BEP20") return "BEP20 / BSC Network";
  if (currency === "BNB") return "BSC Network";
  if (currency === "TRX") return "Tron Network";
  if (currency === "USDC") return "BASE Network";
  if (currency === "USDC ERC20") return "ERC20 Network";
  if (currency === "USDC SOL") return "Solana Network";
  if (currency === "USDC TRC20") return "TRC20 Network";
  if (currency === "XRP") return "XRP Ledger";
  if (currency === "LTC") return "Litecoin Network";
  if (currency === "DOGE") return "Dogecoin Network";
  if (currency === "ADA") return "Cardano Network";
  if (currency === "AVAX") return "Avalanche C-Chain";
  if (currency === "MATIC") return "Polygon Network";
  if (currency === "DOT") return "Polkadot Network";
  if (currency === "ATOM") return "Cosmos Network";
  if (currency === "DAI") return "ERC20 Network";
  if (currency === "LINK") return "ERC20 Network";
  if (currency === "TON") return "TON Network";
  return currency;
};
