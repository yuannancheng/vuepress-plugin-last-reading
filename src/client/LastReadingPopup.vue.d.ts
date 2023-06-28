import type { LocaleConfig } from '@vuepress/shared';
export type I18n = LocaleConfig<PopupConfig>;
export interface LastReadingPluginOptions {
    popupCountdown: number;
    storageKeyName: string;
    smooth: boolean;
    popupConfig: PopupConfig | I18n;
}
export interface PopupConfig {
    message: string;
    goto: string;
    close: string;
}
export interface LastReading {
    path?: string;
    title?: string;
    scrollTop?: number;
    timestamp?: number;
}
declare const _default: import("vue").DefineComponent<{
    popupCountdown: {
        type: import("vue").PropType<number>;
        required: true;
    };
    storageKeyName: {
        type: import("vue").PropType<string>;
        required: true;
    };
    smooth: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    popupConfig: {
        type: import("vue").PropType<PopupConfig | I18n>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    popupCountdown: {
        type: import("vue").PropType<number>;
        required: true;
    };
    storageKeyName: {
        type: import("vue").PropType<string>;
        required: true;
    };
    smooth: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    popupConfig: {
        type: import("vue").PropType<PopupConfig | I18n>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
