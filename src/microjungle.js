var microjungle = function(template) {
    var d = document,
        toString = {}.toString;

    function isObject(t) {
        return toString.call(t) === '[object Object]';
    };

	// they just do their job.
    function monkeys(what, who) {
        for (var i = 0, l = what.length; i < l; i++) {
            var j = what[i];
            if (j) {
                if (typeof j == 'string') {
                    who.appendChild(d.createTextNode(j));
                } else {
                    if (typeof j[0] == 'string') {
                        var el = d.createElement(j.shift()),
                            attrs = isObject(j[0]) && j.shift(),
                            k;

                        if (attrs) {
                            for(k in attrs) {
                                attrs[k] && el.setAttribute(k, attrs[k]);
                            }
                        }

                        who.appendChild(monkeys(j, el));
                    } else {
                        monkeys(j, who);
                    }                        
                }
            }
        }

        return who;
    };

    return monkeys(template, d.createDocumentFragment());
};