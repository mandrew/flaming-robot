(function() {
    var holder = $('.js-list-items')
        elements = $();

    if(data.length) {
        // removes spaces out of title - used with images
        function createUrl(title) {
            return title.replace(/ /g,"-").toLowerCase();
        }

        // if data has items then remove no-items message
        $('.no-items').remove();

        $.each( data, function(i,e){
            var listItem = $('<li>', {'class': 'course-item'})
                courseContent = $('<div>', {'class': 'course-content'})
                courseName = e["name"]
                courseTopic = e["topic"]
                courseDescription = e["description"]
                courseProgress = e["progress"]
                courseEdit = e["editable"]
                courseDelete = e["deletable"]
                courseUrl = createUrl(courseName);

            if(courseName) {
                // this relies on having a file that exists in /img with the correct name
                listItem.append(
                    $('<div>', {
                        'class': 'course-image',
                        'html': '<img src="img/' + courseUrl + '.jpg">'
                    })
                )
            }
            listItem.append(
                $('<p>', {
                    'class': 'course-topic',
                    'html': courseTopic
                })
            )
            listItem.append(courseContent)
            courseContent.append(
                $('<h3>', {
                    'class': 'course-name',
                    'html': courseName
                }),
                $('<p>', {
                    'class': 'course-description',
                    'html': courseDescription
                })
            )
            if(courseProgress == 100) {
                listItem.append(
                    $('<div>', {
                        'class': 'course-progress-meter',
                        'html': '<div class="meter"><span style="width:'+ courseProgress +'%"><span class="course-progress-percent">' + courseProgress + '%</span></span></div><p class="course-progress-message">Congratulations you have finished this course</p>'
                    })
                )
            } else {
                if(courseProgress == 0) {
                    courseContent.append(
                        $('<p>', {
                            'class': 'course-progress-button',
                            'html': '<a class="btn">Start learning now!</a>'
                        })
                    )
                } else {
                    listItem.append(
                        $('<div>', {
                            'class': 'course-progress-meter',
                            'html': '<div class="js-meter-animate meter"><span style="width:'+ courseProgress +'%"><span class="course-progress-percent">' + courseProgress + '%</span></span></div><p class="course-progress-message visuallyhidden">Course progress is: ' + courseProgress + '%</p>'
                        })
                    )
                }
            }
            if(courseEdit || courseDelete) {
                var adminBlock = $('<div>', {
                    'class': 'course-admin hide',
                    'html': "<p>Course options</p>"
                })
                listItem.append(adminBlock)

                if(courseEdit) {
                    adminBlock.append(
                        $('<button/>', {
                            'class': 'course-edit btn',
                            'value': "Edit",
                            'html': "Edit"
                        })
                    )
                }
                if(courseDelete) {
                    adminBlock.append(
                        $('<button/>', {
                            'class': 'course-delete btn red',
                            'value': 'Delete',
                            'html': "Delete"
                        })
                    )
                }
            }
            listItem.append(
                $('<a>', {
                    'class': 'course-link',
                    'url': '#'
                })
            )

            elements = elements.add(listItem)
        });
        holder.append(elements);

        // animate percent bar
        $(".js-meter-animate > span").each(function() {
            $(this).data("origWidth", $(this).width())
                .width(0)
                .animate({
                    width: $(this).data("origWidth")
                }, 1200);
        });

        // show/hide admin options
        $(".js-admin").click(function() {
            $(this).toggleClass('on');
            $(".course-admin").each(function() {
                $(this).toggleClass('hide');
            })
        });

        // show/hide content
        $('li.course-item').hover(
            function(){
                $(this).addClass('hover');
            }, function(){
                $(this).removeClass('hover');
            }
        );

        // swap list/block items
        $('.js-block-courses').click(function() {
            $('.js-list-courses').removeClass('current');
            $(this).addClass('current');
            $('.js-list-items').removeClass('list')
                .addClass('block');
        });
        $('.js-list-courses').click(function() {
            $('.js-block-courses').removeClass('current');
            $(this).addClass('current');
            $('.js-list-items').removeClass('block')
                .addClass('list');
        });
    }
}());
