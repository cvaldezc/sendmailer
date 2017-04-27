$(document).ready(function () {
    if (validsend()) {
        sendmail();
    }
    else {
        var a = document.createElement("a");
        a.setAttribute("href", "http://190.41.246.91:8000/logistica/list/key/cotizacion/");
        a.innerHTML = 'Regresar';
        document.body.appendChild(a);
    }
});
function sendmail() {
    document.form1.submit();
}
function validsend() {
    var sts = false;
    $("input,textarea").each(function () {
        var item = this;
        if (item.value == '') {
            $('h1').html(item.id + ' Se encuentra vacio!');
            //alert('No se ha ');
            sts = false;
            //console.log(sts);
            return false;
        }
        else {
            sts = true;
            //console.log(sts);
        }
    });
    return sts;
}
