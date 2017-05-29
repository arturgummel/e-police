$(document).ready(function() {
    $('#query_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            personal_code: {
                validators: {
                    stringLength: {
                        min: 11,
                        max: 11,
                        message: 'Isikukoodi pikkus peab olema 11'
                    },
                    notEmpty: {
                        message: 'Palun sisesta oma isikukood'
                    }
                }
            },
            first_name: {
                validators: {
                    stringLength: {
                        min: 2,
                        message: 'Palun sisesta oma eesnimi'
                    },
                    notEmpty: {
                        message: 'Palun sisesta oma eesnimi'
                    }
                }
            },
            last_name: {
                validators: {
                    stringLength: {
                        min: 2,
                        message: 'Palun sisesta oma perekonnanimi'
                    },
                    notEmpty: {
                        message: 'Palun sisesta oma perekonnanimi'
                    }
                }
            },
            birthday: {
                validators: {
                    date: {
                        format: 'DD-MM-YYYY',
                        message: 'Palun sisesta korrektne sünniaeg'
                    },
                    notEmpty: {
                        message: 'Palun sisesta oma sünniaeg'
                    }
                }
            },
            address: {
                validators: {
                    stringLength: {
                        min: 8,
                        message: 'Palun sisesta oma aadress'
                    },
                    notEmpty: {
                        message: 'Palun sisesta oma aadress'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Palun sisesta oma e-post'
                    },
                    emailAddress: {
                        message: 'Palun sisesta korrektne e-post'
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow")
            $('#query_form').data('bootstrapValidator').resetForm();
            e.preventDefault();
            $("input").prop('disabled', true);
            var $form = $(e.target);
            $("#showData").show();
            var bv = $form.data('bootstrapValidator');
            var formData = {};
            $form.find("input[name]").each(function (index, node) {
                formData[node.name] = node.value;
            });
            $.post("addAppForm", formData, function(data) {
                $("#resultTable tbody").empty();
                var d = new Date(data[data.length-1].birthday);
                var myBday = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
                $('#resultTable tbody').append(
                    '<th>'+data[data.length-1].personalCode+'</th>' +
                    '<th>'+data[data.length-1].firstName+'</th>' +
                    '<th>'+data[data.length-1].lastName+'</th>' +
                    '<th>'+myBday+'</th>' +
                    '<th>'+data[data.length-1].address+'</th>' +
                    '<th>'+data[data.length-1].email+'</th></tr>');
            });
        });
    $( "#datepicker" ).datepicker({ dateFormat: 'dd-mm-yy',onSelect: function(){
        $('#query_form').bootstrapValidator('revalidateField', 'birthday');
    } });
    $("#showData").click(function(){
        $("#resultTable").toggle();
    });
});
