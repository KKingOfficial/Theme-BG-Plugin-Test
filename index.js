(function() {
    var showToast = vendetta.ui.toasts.showToast;

    return {
        onLoad: function() {
            showToast("vendetta keys: " + Object.keys(vendetta).join(", "));
            showToast("metro keys: " + Object.keys(vendetta.metro).join(", "));
        },
        onUnload: function() {}
    };
})();
