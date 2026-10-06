import type { IconName } from '../data/catalog'

type Name = IconName | 'search' | 'truck' | 'shield' | 'chat' | 'return' | 'euro' | 'check' | 'close' | 'whatsapp' | 'mail' | 'store' | 'arrow'

const P: Record<Name, string> = {
  mouse: 'M12 3a6 6 0 0 0-6 6v6a6 6 0 0 0 12 0V9a6 6 0 0 0-6-6zM12 3v6M12 6.5v1.5',
  keyboard: 'M3 7h18v10H3zM6 10h.01M9 10h.01M12 10h.01M15 10h.01M18 10h.01M7 14h10',
  usb: 'M9 2h6v6H9zM7 8h10v9a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3zM11 4.5h.01M13 4.5h.01',
  sd: 'M7 3h7l4 4v14H7zM10 3v3M12.5 3v3M15 4.5V6',
  ssd: 'M4 6h16v12H4zM8 10h8M8 14h5M17 14h.01',
  hdd: 'M4 4h16v16H4zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 17h.01M12 10h.01',
  cable: 'M7 3v5M11 3v5M5 8h8v3a4 4 0 0 1-8 0zM9 15v2a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4V3',
  charger: 'M7 3h10v12a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3zM10 18v3M14 18v3M12.5 7 10 11h4l-2.5 4',
  hub: 'M8 3h8v18H8zM8 7H5M8 12H5M8 17H5M16 9h3M16 15h3M11 7h2',
  adapter: 'M3 9h7v6H3zM10 12h4M14 8h7v8h-7zM16.5 11h2',
  webcam: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 21h8M12 15v6',
  headset: 'M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H4zM17 15h3v5h-3zM20 20c0 1-2 2-5 2',
  router: 'M3 14h18v6H3zM7 17h.01M11 17h.01M17 14V9M7 14V9M9 6a4 4 0 0 1 6 0M6.5 3.5a8 8 0 0 1 11 0',
  wifi: 'M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01',
  switch: 'M3 8h18v8H3zM6 12h1M9 12h1M12 12h1M15 12h1M18 12h.01',
  ethernet: 'M8 4h8v7l-2 2h-4l-2-2zM10 7v2M12 7v2M14 7v2M12 13v8',
  power: 'M3 9h18v8H3zM7 13h.01M11 13h.01M15 13h.01M19 9V6a2 2 0 0 0-2-2h-3',
  monitor: 'M3 4h18v12H3zM9 20h6M12 16v4',
  laptop: 'M5 5h14v10H5zM2 19h20l-2-4H4z',
  desktop: 'M6 3h12v14H6zM9 7h6M9 10h6M12 14h.01M8 21h8M10 17v4M14 17v4',
  printer: 'M7 9V3h10v6M5 9h14a2 2 0 0 1 2 2v6h-4M7 17H3v-6a2 2 0 0 1 2-2M7 14h10v7H7z',
  stand: 'M4 6h16l-2 7H6zM8 13l-3 8M16 13l3 8M7 17h10',
  clean: 'M9 3h4v4H9zM8 7h6l1 4v10H7V11zM15 4h3M15 6l2 1',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.3-4.3',
  truck: 'M2 6h11v10H2zM13 9h4l3 3v4h-7M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  shield: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6zM9 12l2 2 4-4',
  chat: 'M4 5h16v11H8l-4 4zM8 10h8M8 13h5',
  return: 'M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3',
  euro: 'M17 6a7 7 0 1 0 0 12M4 10h9M4 14h9',
  check: 'M5 12l5 5 9-10',
  close: 'M6 6l12 12M18 6 6 18',
  whatsapp: 'M4 20l1.3-4A8 8 0 1 1 8 18.7zM9 9c0 3 3 6 6 6l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  store: 'M4 9l1-5h14l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
}

export default function Icon({ name, size = 24, className }: { name: Name; size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[name]} />
    </svg>
  )
}
