(function() {
    const React = bunny.metro.findByProps("createElement", "useState");
    const { View, Image } = bunny.metro.findByProps("StyleSheet");
    const { after } = bunny.api.patcher;
    const { getCurrentTheme } = bunny.themes;

    const getBgUrl = () => {
        try {
            return getCurrentTheme()?.data?.background?.url ?? null;
        } catch(e) {
            return null;
        }
    };

    const getBgAlpha = () => {
        try {
            return getCurrentTheme()?.data?.background?.alpha ?? 0.5;
        } catch(e) {
            return 0.5;
        }
    };

    const ChannelScreen = bunny.metro.findByDisplayName("ChannelScreen")
        || bunny.metro.findByDisplayName("Chat")
        || bunny.metro.findByProps("renderChatInput", "renderMessages");

    let unpatch = null;

    return {
        onLoad() {
            if (!ChannelScreen) return;

            const target = ChannelScreen.default ?? ChannelScreen;

            unpatch = after("render", target, (_, ret) => {
                const url = getBgUrl();
                if (!url || !ret) return;

                return React.createElement(
                    View,
                    { style: { flex: 1 } },
                    React.createElement(Image, {
                        source: { uri: url },
                        style: {
                            position: "absolute",
                            top: 0, left: 0,
                            right: 0, bottom: 0,
                            width: "100%",
                            height: "100%",
                            opacity: getBgAlpha(),
                        },
                        resizeMode: "cover"
                    }),
                    ret
                );
            });
        },
        onUnload() {
            unpatch?.();
        }
    };
})();
