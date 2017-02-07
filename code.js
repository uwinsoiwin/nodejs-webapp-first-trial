var xmlhttp = "";
var integer_numbers = ("0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9").split(",");
var integer_chars = ("48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105").split(",");
if (typeof String.prototype.trim !== "function") {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "");
    };
}
if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function (elt /*, from*/)
    {
        var len = this.length;

        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);

        if (from < 0)
            from += len;

        for (; from < len; from++)
        {
            if (from in this &&
                    this[from] === elt)
                return from;
        }
        return -1;
    };
}
String.prototype.replaceAll = function (f, r) {
    return this.split(f).join(r);
};
function GetXMLHttpRequestObject() {
    var xmlhttpRequest;
    try {
        xmlhttpRequest = new XMLHttpRequest();
        return xmlhttpRequest;
    } catch (e) {

        try {
            xmlhttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            return xmlhttpRequest;
        } catch (e) {
            try {
                xmlhttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                return xmlhttpRequest;
            } catch (e) {
                alert("Your browser does not support Ajax HTTP");
                return false;
            }
        }
    }
}
function integer_entry(ctrl, event) {
    var charCode = event.which || event.keyCode;
    if ((charCode !== 13) && (charCode !== 8) && (charCode !== 46) && (charCode !== 39)) {
        var ccs = charCode.toString();
        var i = integer_chars.indexOf(ccs);
        if (i > -1) {
            return integer_numbers[i];
        } else {
            event.preventDefault();
        }
    }
}
function move_to_pass(ctrl, event) {
    var charCode = event.which || event.keyCode;
    var myid = ctrl.value;
    var myidlen = myid.length;

    if ((charCode === 13) && (myidlen > 3)) {
        document.getElementById("password").focus();
    }
    else {
        ctrl.focus();
    }
}
function move_to_sbubmit(ctrl, event) {
    var charCode = event.which || event.keyCode;
    if (charCode === 13) {
        document.getElementById("submit").focus();
    }
    else {
        ctrl.focus();
    }
}
function post_values() {
    xmlhttp = GetXMLHttpRequestObject();
    var url = "login.html";
    url = url + "?parampkvalue=" + document.getElementById("user_id").value + ":" + document.getElementById("password").value;
    xmlhttp.onreadystatechange = get_YesOrNo;
    xmlhttp.open("POST", url, true);
    xmlhttp.send(null);
}
function get_YesOrNo() {
    if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
            var pking = xmlhttp.responseText;
            if (pking==="1"){window.location.href=("index.html");}
            else {alert("Employee Not Present");}
        }
    }
}
