(function() {
    var after = vendetta.patcher.after;
    var findByProps = vendetta.metro.findByProps;
    var React = vendetta.metro.common.React;
    var RN = vendetta.metro.common.ReactNative;

    function getBg() {
        try {
            var selected = Object.values(vendetta.themes).find(function(t) { return t.selected; });
            if (!selected) return null;
            var bg = selected.data && selected.data.background;
            if (!bg || !bg.url) return null;
            return { url: bg.url, opacity: bg.alpha != null ? bg.alpha : 0.5 };
        } catch(e) { return null; }
    }

    var unpatches = [];

    return {
        onLoad: function() {
            var chatModule = findByProps("ChatViewWrapper", "useChatLayout");
            var target = chatModule && (chatModule.ChatViewWrapper || chatModule.default);

            if (!target) {
                chatModule = findByProps("ChatViewWrapperBase");
                target = chatModule && (chatModule.ChatViewWrapperBase || chatModule.default);
            }

            if (!target) return;

            var renderFn = target.render || target;

            unpatches.push(after("render", renderFn, function(args, ret) {
                var bg = getBg();
                if (!bg || !ret) return;

                return React.createElement(
                    RN.View,
                    { style: { flex: 1 } },
                    React.createElement(RN.Image, {
                        source: { uri: bg.url },
                        style: {
                            position: "absolute",
                            top: 0, left: 0,
                            right: 0, bottom: 0,
                            width: "100%",
                            height: "100%",
                            opacity: bg.opacity
                        },
                        resizeMode: "cover"
                    }),
                    ret
                );
            }));
        },
        onUnload: function() {
            unpatches.forEach(function(u) { u(); });
        }
    };
})();
