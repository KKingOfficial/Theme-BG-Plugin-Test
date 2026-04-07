(function() {
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

            var results = candidates.map(function(p) {
                return p + "=" + (findByProps(p) ? "y" : "n");
            }).join("\n");

            alert(results);
        },
        onUnload: function() {}
    };
})();
