// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

require(["jquery", "jhapi", "flipclock"], function ($, JHAPI) {
    "use strict";
    
    var base_url = window.jhdata.base_url;
    var user = window.jhdata.user;
    var api = new JHAPI(base_url);
    var clock;

    $("#stop").click(function () {
        api.stop_server(user, {
            success: function () {
                $("#stop").hide().trigger("spawner:stop");
            }
        });
    });

    api.get_user(user,{
        success: function (user) {
            var diff = user.total_time;
            var autoStart = false;
            if ($("#stop").is(':visible')) {
                var currentDate = new Date(user.utc_now);
                var pastDate  = new Date(user.last_spwaner_start);
                diff += (currentDate.getTime() / 1000 - pastDate.getTime() / 1000)
                autoStart = true
            }
            clock = $('.clock').FlipClock(diff, {
                clockFace: 'DailyCounter',
                autoStart: autoStart
            });
            $("#stop").on("spawner:stop", function(){
                clock.stop()
            })
        }
    })

});
