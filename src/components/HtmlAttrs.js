'use client';
import { useEffect } from 'react';

export default function HtmlAttrs({ lang, dir }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);
  return null;
}
