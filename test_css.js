const cssText = "body { content: '</style>'; }";
console.log(cssText.replace(/<\/(style)/gi, '<\\/$1'));
