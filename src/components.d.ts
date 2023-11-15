/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    /**
     * A wrapper around any HTML which will capture clicks and execute a follow action instead.
     */
    interface MastodonFollow {
        /**
          * The account to follow in the form `user@example.com`
         */
        "account": string;
    }
    /**
     * A dialog widget to let a user pick their Mastodon instance.
     */
    interface MastodonInstancepicker {
        /**
          * currently unused
         */
        "account": string;
        /**
          * Close the dialog without picking an instance.
         */
        "close": (event: MouseEvent) => Promise<void>;
        /**
          * Open the dialog and let the user pick an instance.
         */
        "pickInstance": () => Promise<string>;
    }
    /**
     * A wrapper around any HTML which will share a page on the selected instance.
     */
    interface MastodonShare {
        /**
          * unused
         */
        "account": string;
        /**
          * The text to share. Defaults to the current page's title.
         */
        "text": string;
        /**
          * The URL to share. Defaults to the current page.
         */
        "url": string;
    }
    /**
     * A widget to display the timeline of a Mastodon account
     * This makes use of the RSS feed of the account.
     */
    interface MastodonTimeline {
        /**
          * The account for which the timeline should be shown in the form `user@example.com`
         */
        "account": string;
        /**
          * The number of toots to display
         */
        "limit": number;
    }
    /**
     * A widget to display a Mastodon account and its timeline.
     */
    interface MastodonWidget {
        /**
          * The account to display in the form `user@example.com`
         */
        "account": string;
        /**
          * The number of toots to display. `0` for disabling the timeline
         */
        "limit": number;
    }
}
declare global {
    /**
     * A wrapper around any HTML which will capture clicks and execute a follow action instead.
     */
    interface HTMLMastodonFollowElement extends Components.MastodonFollow, HTMLStencilElement {
    }
    var HTMLMastodonFollowElement: {
        prototype: HTMLMastodonFollowElement;
        new (): HTMLMastodonFollowElement;
    };
    /**
     * A dialog widget to let a user pick their Mastodon instance.
     */
    interface HTMLMastodonInstancepickerElement extends Components.MastodonInstancepicker, HTMLStencilElement {
    }
    var HTMLMastodonInstancepickerElement: {
        prototype: HTMLMastodonInstancepickerElement;
        new (): HTMLMastodonInstancepickerElement;
    };
    /**
     * A wrapper around any HTML which will share a page on the selected instance.
     */
    interface HTMLMastodonShareElement extends Components.MastodonShare, HTMLStencilElement {
    }
    var HTMLMastodonShareElement: {
        prototype: HTMLMastodonShareElement;
        new (): HTMLMastodonShareElement;
    };
    /**
     * A widget to display the timeline of a Mastodon account
     * This makes use of the RSS feed of the account.
     */
    interface HTMLMastodonTimelineElement extends Components.MastodonTimeline, HTMLStencilElement {
    }
    var HTMLMastodonTimelineElement: {
        prototype: HTMLMastodonTimelineElement;
        new (): HTMLMastodonTimelineElement;
    };
    /**
     * A widget to display a Mastodon account and its timeline.
     */
    interface HTMLMastodonWidgetElement extends Components.MastodonWidget, HTMLStencilElement {
    }
    var HTMLMastodonWidgetElement: {
        prototype: HTMLMastodonWidgetElement;
        new (): HTMLMastodonWidgetElement;
    };
    interface HTMLElementTagNameMap {
        "mastodon-follow": HTMLMastodonFollowElement;
        "mastodon-instancepicker": HTMLMastodonInstancepickerElement;
        "mastodon-share": HTMLMastodonShareElement;
        "mastodon-timeline": HTMLMastodonTimelineElement;
        "mastodon-widget": HTMLMastodonWidgetElement;
    }
}
declare namespace LocalJSX {
    /**
     * A wrapper around any HTML which will capture clicks and execute a follow action instead.
     */
    interface MastodonFollow {
        /**
          * The account to follow in the form `user@example.com`
         */
        "account"?: string;
    }
    /**
     * A dialog widget to let a user pick their Mastodon instance.
     */
    interface MastodonInstancepicker {
        /**
          * currently unused
         */
        "account"?: string;
    }
    /**
     * A wrapper around any HTML which will share a page on the selected instance.
     */
    interface MastodonShare {
        /**
          * unused
         */
        "account"?: string;
        /**
          * The text to share. Defaults to the current page's title.
         */
        "text"?: string;
        /**
          * The URL to share. Defaults to the current page.
         */
        "url"?: string;
    }
    /**
     * A widget to display the timeline of a Mastodon account
     * This makes use of the RSS feed of the account.
     */
    interface MastodonTimeline {
        /**
          * The account for which the timeline should be shown in the form `user@example.com`
         */
        "account"?: string;
        /**
          * The number of toots to display
         */
        "limit"?: number;
    }
    /**
     * A widget to display a Mastodon account and its timeline.
     */
    interface MastodonWidget {
        /**
          * The account to display in the form `user@example.com`
         */
        "account"?: string;
        /**
          * The number of toots to display. `0` for disabling the timeline
         */
        "limit"?: number;
    }
    interface IntrinsicElements {
        "mastodon-follow": MastodonFollow;
        "mastodon-instancepicker": MastodonInstancepicker;
        "mastodon-share": MastodonShare;
        "mastodon-timeline": MastodonTimeline;
        "mastodon-widget": MastodonWidget;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            /**
             * A wrapper around any HTML which will capture clicks and execute a follow action instead.
             */
            "mastodon-follow": LocalJSX.MastodonFollow & JSXBase.HTMLAttributes<HTMLMastodonFollowElement>;
            /**
             * A dialog widget to let a user pick their Mastodon instance.
             */
            "mastodon-instancepicker": LocalJSX.MastodonInstancepicker & JSXBase.HTMLAttributes<HTMLMastodonInstancepickerElement>;
            /**
             * A wrapper around any HTML which will share a page on the selected instance.
             */
            "mastodon-share": LocalJSX.MastodonShare & JSXBase.HTMLAttributes<HTMLMastodonShareElement>;
            /**
             * A widget to display the timeline of a Mastodon account
             * This makes use of the RSS feed of the account.
             */
            "mastodon-timeline": LocalJSX.MastodonTimeline & JSXBase.HTMLAttributes<HTMLMastodonTimelineElement>;
            /**
             * A widget to display a Mastodon account and its timeline.
             */
            "mastodon-widget": LocalJSX.MastodonWidget & JSXBase.HTMLAttributes<HTMLMastodonWidgetElement>;
        }
    }
}
