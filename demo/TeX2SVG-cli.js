var mjAPI = require('../lib/main.js');
var jsdom = require('jsdom').jsdom;
var fs = require('fs');

        mjAPI.config({
            MathJax: {
                //config: ["MMLorHTML.js"],
                extensions: [
                  "tex2jax.js", "mml2jax.js", "asciimath2jax.js",
//                  "../../mathjax-third-party-extensions/longdiv/unpacked/longdiv.js",
//                  "../../mathjax-third-party-extensions/counters/counters.js",
                ],
                jax: [ "input/TeX", "input/AsciiMath", "input/MathML", "output/HTML-CSS" ],
                tex2jax: { 
                  inlineMath: [ ['$','$'], ["\\(","\\)"] ],
                  displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
                  processEscapes: true,
                },
                TeX: {
                  extensions: ["AMSmath.js", "AMSsymbols.js", "extpfeil.js", "noErrors.js", "noUndefined.js"],
                  equationNumbers: {autoNumber: "AMS"}, 
                },
                "HTML-CSS": {
                    preferredFont: "Gyre-Pagella",
                },
                SVG: {
                  font: "Gyre-Pagella",
                },
                errorSettings: { 
                  message: ["[Math Error]"], 
                }    
            }
        });
        mjAPI.typeset({
                math: `
\\begin{equation}
  \\cos (2\\theta) = \\cos^2 \\theta - \\sin^2 \\theta
\\end{equation}

                `,
                format: 'TeX',
                svg: true,
                html: false,
                css: false,
        }, function (data) {
                console.log("result:", data);
                if (data.svg) {
                    fs.writeFileSync('test.svg', data.svg, "utf8");
                }
                if (data.css) {
                    data.css = data.css.replace(/https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/mathjax\/[\d.-]+\//g, '../node_modules/@gerhobbelt/mathjax/');
                    fs.writeFileSync('test.css', data.css, "utf8");
                    if (data.html) {
                        data.html = '<style>\n' + data.css + '\n</style>\n' + data.html;
                    }
                }
                if (data.html) {
                    fs.writeFileSync('test.html', data.html, "utf8");
                }
        });
