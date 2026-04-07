(function() {
    var showToast = vendetta.ui.toasts.showToast;
    var findByName = vendetta.metro.findByName;
    var findByProps = vendetta.metro.findByProps;

    return {
        onLoad: function() {
            var m1 = findByName("MessagesConnected", false);
            var m2 = findByName("MessagesConnected", true);
            var m3 = findByProps("HACK_fixModalInteraction");

            var themeKeys = "none";
            try {
                var t = vendetta.themes;
                themeKeys = t ? Object.keys(t).slice(0,2).join(",") : "null";
            } catch(e) { themeKeys = "err:" + e.message; }

            var bunnyThemeKeys = "none";
            try {
                var bt = bunny.themes;
                bunnyThemeKeys = bt ? Object.keys(bt).slice(0,2).join(",") : "null";
            } catch(e) { bunnyThemeKeys = "err:" + e.message; }

            showToast(
                "m1=" + (m1?"y":"n") +
                " m2=" + (m2?"y":"n") +
                " m3=" + (m3?"y":"n") +
                " vt=" + themeKeys +
                " bt=" + bunnyThemeKeys
            );
        },
        onUnload: function() {}
    };
})();
