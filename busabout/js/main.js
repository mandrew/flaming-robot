// uses api data from https://github.com/reedwade/metlink-api-maybe (thanks)
(function() {
    var holder = $('.js-list-items')
        itemsWarning = $('.no-items')
        apiUrl = "https://www.metlink.org.nz/api/v1/StopDepartures/";

    function getData(className,stopID) {
        var dataUrl = apiUrl + stopID; // add stopID for current stop info

        $.ajax({
            url: dataUrl,
            type: "GET",
            crossDomain: true,
            dataType: "json"
        })
            .done(function(data) {
                var dataFeed = [ data ]
                    elements = $();
                if(dataFeed.length) {
                    $('.no-items').remove();
                }

                var stopHolder = $('<div>', {
                    'id': className,
                    'class': 'stop-holder'
                });
                $.each( dataFeed, function(i,e){
                    var feedModified = e["LastModified"]
                        feedStop = e["Stop"]
                        stopName = feedStop["Name"]
                        feedServices = e["Services"]
                        sms = e["Stop"]["Sms"]
                        feedList = $('<table>', {
                            'class': 'feed-items ' + sms,
                            'aria-label': stopName,
                        });
                        feedListHeader = $('<thead>', {
                            'html': "<tr><th>Service ID</th><th>Name</th><th>Time</th><th>Feature</th></tr>",
                        });
                        feedListBody = $('<tbody>');

                    holder.append(stopHolder);

                    if(feedModified) {
                        // add heading and last updated time
                        stopHolder.append(
                            $('<a>', {
                                'class': 'feed-stop-number',
                                'href': 'https://metlink.org.nz/stop/' + sms,
                                'html': "<span class='feed-title'>Stop</span> <span class='feed-sms'>" + sms + "</span>",
                            }),
                            $('<h4>', {
                                'class': 'feed-heading',
                                'html': "<a href='https://metlink.org.nz/stop/" + sms + "'>" + e["Stop"]["Name"] + "</a>",
                            }),
                            $('<p>', {
                                'class': 'feed-modified',
                                'html': "<small>Last updated " + moment(feedModified).format('LT') + " / <a class='refresh-link' href='" + window.location.href + "'>Refresh</a></small>",
                            })
                        )
                    }

                    // build list of current services
                    if(feedServices) {
                        $.each( feedServices, function(i,e){
                            var serviceRef = e["VehicleRef"]
                                serviceID = e["ServiceID"]
                                serviceTime = e["IsRealtime"]
                                serviceFeature = e["VehicleFeature"]
                                serviceEstimated = e["AimedArrival"]
                                serviceEstDepart = e["DisplayDeparture"]
                                serviceName = e["DestinationStopName"]
                                serviceStatus = e["DepartureStatus"]
                                serviceSeconds = e["DisplayDepartureSeconds"]
                                time = null;

                            if(serviceTime) {
                                // change service time to a readable time # ago if realtime
                                if(serviceEstimated) {
                                    time = moment(serviceEstimated).fromNow();
                                } else {
                                    time = moment(serviceEstDepart).fromNow();
                                }
                            } else {
                                if(serviceEstimated) {
                                    // change service estimated time to #:## pm/am if not realtime
                                    time = moment(serviceEstimated).format('LT');
                                } else {
                                    time = moment(serviceEstDepart).format('LT');
                                }
                            }

                            // add icon to show service has low floor
                            var feature = "";
                            if(serviceFeature) {
                                var feature = "<i class='fa fa-wheelchair-alt' aria-hidden='true' title='This service has low floors'></i><span class='sr-only'>This service has low floors</span>";
                            }

                            // if status message, fix formatting and add service info to table
                            if(serviceStatus) {
                                if(serviceStatus === 'onTime') {
                                    serviceStatus = "on time";
                                }
                                feedListBody.append(
                                    $('<tr>', {
                                        'class': 'service',
                                        'html': "<td>" + serviceID + "</td><td>" + serviceName + " <small class='service-status'>" + serviceStatus + "</small></td><td>" + time + "</td><td>" + feature + "</td>",
                                    })
                                )
                            } else {
                                feedListBody.append(
                                    $('<tr>', {
                                        'class': 'service',
                                        'html': "<td>" + serviceID + "</td><td>" + serviceName + "</td><td>" + time + "</td><td>" + feature + "</td>",
                                    })
                                )
                            }
                            return i<2; // show only 3 items
                        });
                    }
                    elements = elements.add(feedListBody);
                });
                // construct table
                feedList.append(feedListHeader);
                feedList.append(elements);
                // add table to holder
                stopHolder.append(feedList);
            })
            .fail(function() {
                // if error show message
                itemsWarning.append(
                    $('<span>', {
                        'class': 'error',
                        'html': "Unable to show current list of stops (Feed error)",
                    })
                )
            });
    }
    // add entries for each link to stop api url to appear on page (ordered by name)
    getData('botanics','4313');
    getData('glenmore','4319');
    getData('north-military','4924');
    getData('wilton','4136');
}());
