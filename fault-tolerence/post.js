var needle = require("needle");
var os = require("os");
var headers = {
    'Content-Type': 'application/json'
};
var data = {
    "markdown": "\n{NumberQuestions:true}\n-----------\nStart with header for global options:\n\n    {NumberQuestions:true}\n    -----------\n\n### Multiple Choice Question (Check all that apply)\n\nA *description* for question.  \nQuestions are created with headers (level 3) `### Multiple ChoiceQuestion (Check all that apply)`.\n\n* Choice A\n* Choice B\n* Choice C\n\n### Single Choice Question\n\nMarkdown is great for including questions about code snippets:\n```\n$(document).ready( function()\n{\n    ko.applyBindings(new TaskViewModel());\n\tvar converter = new Markdown.Converter();\n\tdocument.write(converter.makeHtml(\"**I am bold**\"));\n});\n```\n\n1. Choice\n2. Choice\n3. Choice\n\n### Ranking/Rating Table\n\nThe first columnhas the description.  [Use github flavored markdown for table formatting](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#wiki-tables).\n\n|                       | Do not Want | Sometimes | Always |\n| --------------------- | ----------- | --------- | ------ | \n| Search terms used in IDE\t                      |  |  |  |\n| Code that did not work out and was deleted.     |  |  |  |\n| Time spent on particular edits\t      |  |  |  |\n| Code and files viewed\t                          |  |  |  |\n\n### Multichoice table\n\nYou can leave the other columns blank, or `[]` if multi choice.\n\n|                 | Read  | Write  |\n| ----------------| ----- | ------ |\n| Blog posts \t  |   []  |  []    |\n| Stack Overflow  |   []  |  []    |\n| Twitter         |   []  |  []    |\n| Github          |   []  |  []    |\n\n### Text multiple line answer\nPlease go into **great** detail, with `> {rows:5}`\n\n&gt; {rows:5}\n\n### Text single line answer\n\nYou can enter in `> {rows:1}` or `> {}`.\n\n&gt; {}\n\n-----------------------\n\n#### Other information\n\nYou can use [json5](https://github.com/aseemk/json5).  _i.e._ `{rows:5}` without quotes `{\"rows\":5}`.\n\nThe recommended method of creating surveys is to edit it in a markdown editor, and then paste it here when you are done.\nThis makes it easier to save and reuse.\n\nThis is a *beta* product, so please give feedback about feature design and requests!\t\n\t",
    "name": "study1",
    "researcherName": "Urmil123456",
    "contact": "urm7777777@gmail.com",
    "invitecode": "RESEARCH",
    "goal": "100",
    "awards": [{
        "kind": "Amazon Gift Card",
        "description": "amazing",
        "amount": "0"
    }, {
        "kind": "Amazon Gift Card",
        "description": "123",
        "amount": "0"
    }],
    "description": "desc1",
    "studyKind": "survey"
};
// setInterval(function(){
//     console.log(os.freemem());
// },100);
for (i = 0; i < 10000; i++) {
    needle.post("http://192.168.28.28:80/api/study/create", data, {
        headers: headers,
        json: true
    });
    // needle.get("http://192.168.28.28:80/api/study/load/5aedfe0eb8afba08fa279178", {
	// 		headers: headers
	// 	});
}