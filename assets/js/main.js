$(document).ready(function () {
        AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                mirror: false
        });

        const onscroll = (el, listener) => {
                el.addEventListener('scroll', listener)
        }

        // Header fixed top on scroll
        let selectHeader = document.getElementById('header');
        console.log(selectHeader);
        if (selectHeader) {
                let headerOffset = selectHeader.offsetTop
                let nextElement = selectHeader.nextElementSibling
                const headerFixed = () => {
                        if ((headerOffset - window.scrollY) <= 0) {
                                selectHeader.classList.add('fixed-top')
                                nextElement.classList.add('scrolled-offset')
                        } else {
                                selectHeader.classList.remove('fixed-top')
                                nextElement.classList.remove('scrolled-offset')
                        }
                }
                window.addEventListener('load', headerFixed)
                onscroll(document, headerFixed)
        }

        $("#submitbtn").click(function (e) {
                
                let inputval = $("#input").val();
                console.log(inputval);
                e.preventDefault();
                $.ajax({
                        url: "/",
                        type: "POST",
                        data: {
                                'query': inputval
                        },
                        success: function (data) {
                                if($("#exectime").length==1){
                                        $('#exectime').text(`Query executed in ${data['exectime']} milliseconds`)
                                }else{
                                        $("#submitbtn").after(
                                                `<p id=\"exectime\">Query executed in ${data['exectime']} milliseconds</p>`
                                        );
                                }
                                if (data['response'].length == 0) {
                                        var tr = `<tr class="datarow">`;
                                        var td = `<td colspan="6" style="text-align:center;">No Match Found</td>`;
                                        var trclose = "</tr>";

                                        $("#searchtablebody").append(tr + td + trclose);

                                } else {
                                        console.log($('.datarow').length)
                                        if($('.datarow').length!=0){
                                                $('.datarow').remove();
                                        }
                                        console.log(data,data['response'].length)
                                        data['response'].forEach(item => {
                                                var tr = `<tr class="datarow">`;
                                                var td1 = `<td>${item['PersonID']}</td>`;
                                                var td2 = `<td>${item['PersonName']}</td>`;
                                                var td3 = `<td>${item['PersonPhoneNumber']}</td>`;
                                                var trclose = "</tr>";

                                                $("#searchtablebody").append(tr + td1 + td2 + td3 + trclose);
                                        });


                                }
                        },
                        error: function (data) {
                                alert(data);
                        }
                });
        })


        // $("#login-submit").click(function(e){
        //         var email = $("#login-email").val();
        //         var password = $("#login-password").val();
        //         console.log(email, password);
        //         $.ajax({
        //                 url:'/login',
        //                 type:'GET',
        //                 data:{
        //                         'email':email,
        //                         'password':password
        //                 },
        //                 success:function(data){
        //                         console.log(data);
        //                 }
        //         });
        //         e.preventDefault();
        // });

});