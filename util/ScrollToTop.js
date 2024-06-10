'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const { pathname } = usePathname();

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 5);
  }, [pathname]);

  return null;
}
