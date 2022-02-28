/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_WEATHER: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}