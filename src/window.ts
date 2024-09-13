import axios from 'axios';
import { observersConfigType } from './components/Bot';
import { BubbleTheme } from './features/bubble/types';

/* eslint-disable solid/reactivity */
type BotProps = {
  chatflowid: string;
  token?: string;
  apiHost?: string;
  onRequest?: (request: RequestInit) => Promise<void>;
  chatflowConfig?: Record<string, unknown>;
  observersConfig?: observersConfigType;
  theme?: BubbleTheme;
};

let elementUsed: Element | undefined;

export const initFull = async (props: BotProps & { id?: string }) => {
  destroy();
  const fullElement = props.id ? document.getElementById(props.id) : document.querySelector('hegira-fullchatbot');
  if (!fullElement) throw new Error('<hegira-fullchatbot> element not found.');
  // const res = await axios.get(
  //   'https://portal.hegira.co.id/api/webhook/whatsapp/e934b66c-4d50-48cb-a206-c0d96e6da59f/fcd23c39-b298-4d7a-8f4c-8de6443dee64',
  // );
  // if (res?.data !== 'OK') {
  //   alert(`${props.token}`);
  // } else {
  // }
  Object.assign(fullElement, props);
  elementUsed = fullElement;
};

export const init = (props: BotProps) => {
  destroy();
  const element = document.createElement('hegira-chatbot');
  Object.assign(element, props);
  document.body.appendChild(element);
  elementUsed = element;
};

export const destroy = () => {
  elementUsed?.remove();
};

type Chatbot = {
  initFull: typeof initFull;
  init: typeof init;
  destroy: typeof destroy;
};

declare const window:
  | {
      Chatbot: Chatbot | undefined;
    }
  | undefined;

export const parseChatbot = () => ({
  initFull,
  init,
  destroy,
});

export const injectChatbotInWindow = (bot: Chatbot) => {
  if (typeof window === 'undefined') return;
  window.Chatbot = { ...bot };
};
