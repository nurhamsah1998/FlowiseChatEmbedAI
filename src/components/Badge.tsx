import { FooterTheme } from '@/features/bubble/types';
import { Show, onCleanup, onMount } from 'solid-js';

type Props = {
  footer?: FooterTheme;
  /// fixedWatermark from admin if client dont have permission to custom fixedWatermark
  fixedWatermark?: string;
  fixedWatermarkPath?: string;
  botContainer: HTMLDivElement | undefined;
  poweredByTextColor?: string;
  isCustomWatermark?: boolean;
  isLoadingGetEnvironment?: boolean;
  isValidToken?: boolean;
  /// watermark from client
  watermark?: string;
  watermarkPath?: string;
  badgeBackgroundColor?: string;
};

const defaultTextColor = '#303235';

export const Badge = (props: Props) => {
  let liteBadge: HTMLAnchorElement | undefined;
  let observer: MutationObserver | undefined;

  const appendBadgeIfNecessary = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((removedNode) => {
        if ('id' in removedNode && liteBadge && removedNode.id == 'lite-badge') {
          console.log("Sorry, you can't remove the brand 😅");
          props.botContainer?.append(liteBadge);
        }
      });
    });
  };

  onMount(() => {
    if (!document || !props.botContainer) return;
    observer = new MutationObserver(appendBadgeIfNecessary);
    observer.observe(props.botContainer, {
      subtree: false,
      childList: true,
    });
  });

  onCleanup(() => {
    if (observer) observer.disconnect();
  });
  return (
    <>
      <Show when={props.footer?.showFooter === undefined || props.footer?.showFooter === null || props.footer?.showFooter === true}>
        {props.isLoadingGetEnvironment ? (
          <span class="w-full text-center px-[10px] pt-[6px] pb-[10px] m-auto text-[13px] text-red-600 font-semibold"> </span>
        ) : props.isValidToken ? (
          <span
            class="w-full text-center px-[10px] pt-[6px] pb-[10px] m-auto text-[13px]"
            style={{
              color: props.footer?.textColor ?? props.poweredByTextColor ?? defaultTextColor,
              'background-color': props.badgeBackgroundColor ?? '#ffffff',
            }}
          >
            Powered by{' '}
            {props?.fixedWatermark && (
              <a
                ref={liteBadge}
                href={props.isCustomWatermark ? props.watermarkPath || '#' : props.fixedWatermarkPath}
                target="_blank"
                rel="noopener noreferrer"
                class="lite-badge"
                id="lite-badge"
                style={{ 'font-weight': 'bold', color: props.footer?.textColor ?? props.poweredByTextColor ?? defaultTextColor }}
              >
                {props.isCustomWatermark ? props.watermark || 'Hegira.' : props.fixedWatermark}
              </a>
            )}
          </span>
        ) : (
          <span class="w-full text-center px-[10px] pt-[6px] pb-[10px] m-auto text-[13px] text-red-600 font-semibold">Invalid Token Detected !</span>
        )}
      </Show>
      <Show when={props.footer?.showFooter === false}>
        <span
          class="w-full text-center px-[10px] pt-[6px] pb-[10px] m-auto text-[13px]"
          style={{
            color: props.footer?.textColor ?? props.poweredByTextColor ?? defaultTextColor,
            'background-color': props.badgeBackgroundColor ?? '#ffffff',
          }}
        />
      </Show>
    </>
  );
};
