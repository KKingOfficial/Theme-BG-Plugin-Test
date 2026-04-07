(function() {
    var showToast = vendetta.ui.toasts.showToast;
    var findByProps = vendetta.metro.findByProps;

    return {
        onLoad: function() {
            var candidates = [
                "stickyVisiblity",
                "jumpToChatText",
                "loadCachedMessages",
                "renderLatestMessages",
                "displayLatestMessages",
                "firstRenderAfterReadyPayload"
            ];

            var results = [];
            candidates.forEach(function(prop) {
                var m = findByProps(prop);
                if (m) results.push(prop + "=" + typeof m);
            });

            showToast(results.length ? results.join(" ") : "all null");
        },
        onUnload: function() {}
    };
})();
