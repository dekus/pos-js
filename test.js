var pos = require('./index');

// var testString = "Andy is gonna to St. Petersburg";
var testString = "Andy is gonna to St. Petersburg. He wants to familiar with Bill Gates";
// error when the first sentence ends by NNP and nenw sentence begins by NNP

// shorter
// var testString = "This is some sample text. This text can contain multiple sentences. It also works with urls like http://google.com/.";

var lexer = new pos.Lexer();
var tagger = new pos.Tagger();
var start = new Date().getTime();
var words = lexer.lex(testString);
var tags = tagger.tag(words);
var end = new Date().getTime();
difference = (end - start);
for (i in tags) {
  var tag = tags[i];
  // console.log(tag[0] + " / " + tag[1]);
}

var groupedTags = pos.groupTags(tags);

console.warn(groupedTags);

// console.log("Tokenized and tagged " + words.length + " words in " + difference + " milliseconds");
