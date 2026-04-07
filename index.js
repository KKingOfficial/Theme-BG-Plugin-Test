(function() {
    var showToast = vendetta.ui.toasts.showToast;
    var findByProps = vendetta.metro.findByProps;

    return {
        onLoad: function() {
            var r1 = [];
            ["stickyVisiblity","jumpToChatText","loadCachedMessages"].forEach(function(p) {
                r1.push(p.slice(0,8) + "=" + (findByProps(p) ? "y" : "n"));
            });
            showToast(r1.join(" "));

            setTimeout(function() {
                var r2 = [];
                ["renderLatestMessages","displayLatestMessages","firstRenderAfterReadyPayload"].forEach(function(p) {
                    r2.push(p.slice(0,8) + "=" + (findByProps(p) ? "y" : "n"));
                });
                showToast(r2.join(" "));
            }, 2000);
        },
        onUnload: function() {}
    };
})();
