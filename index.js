(function() {
    var after = vendetta.patcher.after;
    var findByName = vendetta.metro.findByName;
    var React = vendetta.metro.common.React;
    var RN = vendetta.metro.common.ReactNative;

    function getBg() {
        try {
            var themes = vendetta.themes;
            var selected = Object.values(themes).find(function(t) { return t.selected; });
            if (!selected) return null;
            var bg = selected.data && selected.data.background;
            if (!bg || !bg.url) return null;
            return { url: bg.url, opacity: bg.alpha != null ? bg.alpha : 0.5 };
        } catch(e) {
            return null;
        }
    }

    var unpatch = null;

    return {
        onLoad: function() {
            var m = findByName("MessagesConnected", false);
            var target = m && m.render ? m.render : m;
            if (!target) return;

            unpatch = after("render", target, function(args, ret) {
                var bg = getBg();
                if (!bg || !ret) return;

                return React.createElement(
                    RN.View,
                    { style: { flex: 1 } },
                    React.createElement(RN.Image, {
                        source: { uri: bg.url },
                        style: {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: "100%",
                            height: "100%",
                            opacity: bg.opacity
                        },
                        resizeMode: "cover"
                    }),
                    ret
                );
            });
        },
        onUnload: function() {
            if (unpatch) { unpatch(); unpatch = null; }
        }
    };
})();
