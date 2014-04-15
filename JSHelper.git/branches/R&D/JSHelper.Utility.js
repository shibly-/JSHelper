JSHelper = window.JSHelper || {};
JSHelper.Utility = {    
    Regex: {
        url: /\b((https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/img,
        email: /\b([A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4})\b/img,
        emailOnly: /^([A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4})$/img
    },    
    QueryStringParams: function() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },    
	IsQueryStringExist: function(returnurl) {
        var url = returnurl;
        if (url.indexOf('?') != -1)
            return true;
        else if (url.indexOf('&') != -1)
            return true;
        return false;
    },    
    IsString: function(o) {
        return typeof o === "string";
    }
};

/** String prototypes */
$.extend(String, {
    truncate: function(str, maxlen, indicator) {
        maxlen = maxlen || 22;
        indicator = indicator || '&hellip;';

        if (str.length <= maxlen)
            return str;

        var newStr = str.substr(0, maxlen);
        if (!$.trim(str.substr(maxlen, 1)))
            return newStr + indicator;

        return newStr.substr(0, newStr.lastIndexOf(" ")) + indicator;
    },
    wordBreak: function(str, maxlen, brk) {
        maxlen = maxlen || 16;        
        return str.replace(new RegExp('([^\\s]{' + maxlen + '})', 'img'), "$1" + (brk || ' '));
    }
});

$.extend(String.prototype, {
    format: function(format, removeDuplicate) {
        var a = this;
        for (var e in format) {
            var b = new RegExp("\\$\\{" + e + "\\}", "g");
            a = a.replace(b, format[e]);
        }
        if (!removeDuplicate) {
            a = a.replace(/\${([^\}\s]+)}/g, "");
        }
        return a;
    },
    format2: function() {
        var a = this;
        for (var d = 0; d < arguments.length; d++) {
            var b = new RegExp("\\$\\{" + d + "\\}", "g");
            a = a.replace(b, arguments[d]);
        }
        return a;
    },

    formatAsHtml: function(parameters) {
        return String.wordBreak(this).escapeHTML().replace(/\r?\n/gmi, '<br/>');
    },

    endsWith: function(a) {
        a = this.lastIndexOf(a);
        return (a != -1) && (a + a.length == this.length);
    },

    escapeHTML: function() {
        return this.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },
    isEmail: function() {
        return this.match(Page.Util.regex.emailOnly);
    },
    trim: function() {
        return $.trim(this);
    },
    isEqual: function(str, caseSensitive) {
        return caseSensitive ? this == str : this.toUpperCase() == str.toUpperCase();
    },
    escapeHtmlCodes: function() {
        return this.replaceAll("&quot;", "\"", true)
                   .replaceAll("&amp;", "&", true)
                   .replaceAll("&lt;", "<", true)
                   .replaceAll("&gt;", ">", true)
                   .replaceAll("&nbsp;", " ", true)
                   .replaceAll("&acute;", "´", true);
    },
    replaceAll: function(token, newToken, ignoreCase) {
        var _token;
        var str = this + "";
        var i = -1;

        if (typeof token === "string") {
            if (ignoreCase) {
                _token = token.toLowerCase();
                while ((
                    i = str.toLowerCase().indexOf(
                        token, i >= 0 ? i + newToken.length : 0
                    )) !== -1
                ) {
                    str = str.substring(0, i) +
                    newToken +
                    str.substring(i + token.length);
                }
            } else {
                return this.split(token).join(newToken);
            }
        }
        return str;
    }
});

RegExp.esc = function(text) {
    if (!arguments.callee.sRE) {
        var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
        arguments.callee.sRE = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
    }
    return text.replace(arguments.callee.sRE, '\\$1');
};

$.extend(Date, {
    second: function(sec) {
        return sec * 1000;
    },
    minute: function(min) {
        return min * Date.second(60);
    },
    hour: function(hr) {
        return hr * Date.minute(60);
    },
    day: function(d) {
        return d * Date.hour(24);
    },
    week: function(w) {
        return w * Date.day(7);
    },
    month: function(m) {
        return m * Date.day(30);
    }
});