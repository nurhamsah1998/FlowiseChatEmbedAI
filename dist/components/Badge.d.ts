import { FooterTheme } from '@/features/bubble/types';
type Props = {
    footer?: FooterTheme;
    fixedWatermark?: string;
    fixedWatermarkPath?: string;
    botContainer: HTMLDivElement | undefined;
    poweredByTextColor?: string;
    isCustomWatermark?: boolean;
    isLoadingGetEnvironment?: boolean;
    isValidToken?: boolean;
    watermark?: string;
    watermarkPath?: string;
    badgeBackgroundColor?: string;
};
export declare const Badge: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=Badge.d.ts.map