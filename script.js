$(function () {
    var PUBLISH_SYNC_PATH = '/publish/sync',
        PUBLISH_ASYNC_PATH = '/publish/async',
        PUBLISH_ASYNC2_PATH = '/publish/async2',
        SUBSCRIPTION_ADD_PATH = '/subscription/add',
        SUBSCRIPTION_REMOVE_PATH = '/subscription/remove',
        SUBSCRIPTION_LIST_PATH = '/subscription/list',
        APP_KEY_PATH = '/app_key',
        currentKey,
        apiUrl;

    var pubnub = new PubNub({
        subscribeKey: "sub-c-33f55052-190b-11e6-bfbc-02ee2ddab7fe",
        publishKey: "pub-c-739aa0fc-3ed5-472b-af26-aca1b333ec52"
    });

    pubnub.addListener({
        status: function (statusEvent) {
            status(JSON.stringify(statusEvent))
        },
        presence: function (presenceEvent) {
            presence(JSON.stringify(presenceEvent))
        },
        message: function (message) {
            status(message)
        }
    });

    function connectEndpoint() {
        $.get(apiUrl + APP_KEY_PATH)
            .done(function(msg) {
                pubnub.unsubscribe({channels: ['status-' + currentKey]});
                currentKey = msg.app_key;
                output("New key: " + JSON.stringify(msg.app_key));
                pubnub.subscribe({
                    channels: ['status-' + currentKey]
                });
            })
            .fail(function(e) {
                output("Error: " + JSON.stringify(e))
            })
    }

    $("#add-channel-button").on('click', function (e) {
        e.preventDefault();

        var val = $("#add-channel-input").val();

        $.get(apiUrl + SUBSCRIPTION_ADD_PATH, {channel: val})
            .done(function(msg) {
                output(JSON.stringify(msg))
            })
            .fail(function(e) {
                output("Error: " + JSON.stringify(e))
            })
    });

    $("#remove-channel-button").on('click', function (e) {
        e.preventDefault();

        var val = $("#remove-channel-input").val();

        $.get(apiUrl + SUBSCRIPTION_REMOVE_PATH, {channel: val})
            .done(function(msg) {
                output(JSON.stringify(msg))
            })
            .fail(function(e) {
                output("Error: " + JSON.stringify(e))
            })
    });

    $("#list-channels-button").on('click', function (e) {
        e.preventDefault();

        $.get(apiUrl + SUBSCRIPTION_LIST_PATH)
            .done(function(msg) {
                output(JSON.stringify(msg))
            })
            .fail(function(e) {
                output("Error: " + JSON.stringify(e))
            })
    });

    $("#publish-sync-button").on('click', function (e) {
        e.preventDefault();

        $.get(apiUrl + PUBLISH_SYNC_PATH)
            .done(function(msg) {
                output(JSON.stringify(msg))
            })
            .fail(function(e) {
                output("Error: " + JSON.stringify(e))
            })
    });

    $("#publish-async-button").on('click', function (e) {
        e.preventDefault();

        $.get(apiUrl + PUBLISH_ASYNC_PATH)
            .done(function(msg) {
                output(JSON.stringify(msg))
            })
            .fail(function(e) {
                output("Error: " + JSON.stringify(e))
            })
    });

    $("#publish_async2-button").on('click', function (e) {
        e.preventDefault();

        $.get(apiUrl + PUBLISH_ASYNC2_PATH)
            .done(function(msg) {
                output(JSON.stringify(msg))
            })
            .fail(function(e) {
                output("Error: " + JSON.stringify(e))
            })
    });

    $("#api-url").change(function () {
        var val = $("#api-url option:selected").val();

        if (val !== 'custom') {
            apiUrl = val;
        } else {
            apiUrl = $("custom-api-url").val()
        }
        connectEndpoint();
    }).change();

    $("#clear-output").on('click', function (e) {
        $("#output").val('');
    });

    $("#clear-status").on('click', function (e) {
        $("#status").val('');
    });

    $("#clear-presence").on('click', function (e) {
        $("#presence").val('');
    });

    function output(val) {
        var field = $("#output"),
            current = field.val();

        var updated = val + '\n' + current;

        field.val(updated);
    }

    function status(val) {
        var field = $("#status"),
            current = field.val();

        var updated = val + '\n' + current;

        field.val(updated);
    }

    function presence(val) {
        var field = $("#presence"),
            current = field.val();

        var updated = val + '\n' + current;

        field.val(updated);
    }
});
