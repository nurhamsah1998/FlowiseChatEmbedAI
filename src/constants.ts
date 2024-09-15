import type { BubbleProps } from './features/bubble';

export const defaultBotProps: BubbleProps = {
  chatflowid: '',
  apiHost: undefined,
  token: undefined,
  /// Watermark fixed is from DB and watermark is from client (depends on isCustomWatermark)
  watermark: undefined,
  watermarkPath: '#',
  onRequest: undefined,
  chatflowConfig: undefined,
  theme: undefined,
  observersConfig: undefined,
};
