declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}

declare module 'csstype' {
    export interface Properties {
        [variable: `--${string}`]: any;
    }
}
