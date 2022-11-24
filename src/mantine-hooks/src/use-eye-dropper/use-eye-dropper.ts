import { useCallback, useState } from 'react';
import { useIsomorphicEffect } from '../use-isomorphic-effect/use-isomorphic-effect';

interface EyeDropperOpenOptions {
  /** AbortSignal to cancel */
  signal?: AbortSignal;
}

export interface EyeDropperOpenReturnType {
  sRGBHex: string;
}

export function useEyeDropper() {
  const [supported, setSupported] = useState(false);

  useIsomorphicEffect(() => {
    setSupported(typeof window !== 'undefined' && 'EyeDropper' in window);
  }, []);

  const open = useCallback(
    (options: EyeDropperOpenOptions = {}): Promise<EyeDropperOpenReturnType> => {
      if (supported) {
        const eyeDropper = new (window as any).EyeDropper();
        return eyeDropper.open(options);
      }

      return undefined;
    },
    [supported]
  );

  return { supported, open };
}