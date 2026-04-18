declare module '*.svg' {
  const content: string;
  export default content;
}

interface ImportMeta {
  env?: {
    VITE_LIT_VERSION?: string;
  };
}
