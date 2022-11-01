export default interface Contact {
  type: string;
  content: string;
  title: string;
  isPreferred: boolean;
}

export interface ContactToSend {
  type?: string | null;
  content?: string | null;
  title?: string | null;
  isPreferred?: boolean | null;
}
