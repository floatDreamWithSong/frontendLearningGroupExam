/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_REPORTE_URL: string;
    readonly VITE_USER_NAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}