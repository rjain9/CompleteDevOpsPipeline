var mongoose = require('mongoose');

mongoose.connect("mongodb://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_IP + ":27017/site?authSource=admin");

const Schema = mongoose.Schema;
ObjectId=Schema.Types.ObjectId;

const studySchema = new mongoose.Schema({
     _id: ObjectId,
    name: {
        type: String,
        default: 'Study XYZ'
    },
    description: {
        type: String,
        default: 'foo bar'
    },
    studyKind: String,
    researcherName: {
        type: String,
        default: 'Mr XYZ'
    },
    contact: {
        type: String,
        default: 'a@b.com'
    },
    awards: {
        type: [],
        default: [{
            "kind": "Amazon Gift Card",
            "description": "amazing",
            "amount": "1"
        }, {
            "kind": "Amazon Gift Card",
            "description": "123",
            "amount": "0"
        }]
    },
    awardOptions: {
        type: [],
        default: ["Amazon Gift Card", "Github Swag", "BrowserStack", "Windows Surface RT", "iPad Mini", "Other", "None"]
    },
    status: {
        type: String,
        default: 'open'
    },
    goal: {
        type: Number,
        default: 100
    },
    invitecode: String,
    markdown: {
        type: String,
        default: '\n{NumberQuestions:true}\n-----------\nStart with header for global options:\n\n    {NumberQuestions:true}\n    -----------\n\n### Multiple Choice Question (Check all that apply)\n\nA *description* for question.  \nQuestions are created with headers (level 3) `### Multiple Choice Question (Check all that apply)`.\n\n* Choice A\n* Choice B\n* Choice C\n\n### Single Choice Question\n\nMarkdown is great for including questions about code snippets:\n```\n$(document).ready( function()\n{\n    ko.applyBindings(new TaskViewModel());\n\tvar converter = new Markdown.Converter();\n\tdocument.write(converter.makeHtml(\"**I am bold**\"));\n});\n```\n\n1. Choice\n2. Choice\n3. Choice\n\n### Ranking/Rating Table\n\nThe first column has the description.  [Use github flavored markdown for table formatting](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#wiki-tables).\n\n|                       | Do not Want | Sometimes | Always |\n| --------------------- | ----------- | --------- | ------ | \n| Search terms used in IDE\t                      |  |  |  |\n| Code that did not work out and was deleted.     |  |  |  |\n| Time spent on particular edits\t              |  |  |  |\n| Code and files viewed\t                          |  |  |  |\n\n### Multichoice table\n\nYou can leave the other columns blank, or `[]` if multi choice.\n\n|                 | Read  | Write  |\n| ----------------| ----- | ------ |\n| Blog posts \t  |   []  |  []    |\n| Stack Overflow  |   []  |  []    |\n| Twitter         |   []  |  []    |\n| Github          |   []  |  []    |\n\n### Text multiple line answer\nPlease go into **great** detail, with `> {rows:5}`\n\n&gt; {rows:5}\n\n### Text single line answer\n\nYou can enter in `> {rows:1}` or `> {}`.\n\n&gt; {}\n\n-----------------------\n\n#### Other information\n\nYou can use [json5](https://github.com/aseemk/json5).  _i.e._ `{rows:5}` without quotes `{\"rows\":5}`.\n\nThe recommended method of creating surveys is to edit it in a markdown editor, and then paste it here when you are done.\nThis makes it easier to save and reuse.\n\nThis is a *beta* product, so please give feedback about feature design and requests!\t\n\t'
    },
    token: String,
    adminLink: String,
    publicLink: String
});


const MyModel = mongoose.model('Study', studySchema);
MyModel.remove({});

instance = new MyModel({
    _id: mongoose.Types.ObjectId("5aaff0a4857f41071758ec85"),
    studyKind: 'survey',
    invitecode: 'RESEARCH',
    token: "t1",
    adminLink: "/studies/admin/?token=t1",
    publicLink: "/studies/?id=5aaff0a4857f41071758ec85"
});

instance.save(function (err) {
    // if (err) return handleError(err);
    // saved!
    // mongoose.disconnect()
});

instance = new MyModel({
    _id: mongoose.Types.ObjectId("5aaff0a4857f41071758ec84"),
    studyKind: 'dataStudy',
    invitecode: 'RESEARCH',
    token: "t2",
    adminLink: "/studies/admin/?token=t2",
    publicLink: "/studies/?id=5aaff0a4857f41071758ec84"
});

instance.save(function (err) {
    // if (err) return handleError(err);
    // saved!
    mongoose.disconnect()
});

var p11 = {
    "markdown": "\n{NumberQuestions:true}\n-----------\nStart with header for global options:\n\n    {NumberQuestions:true}\n    -----------\n\n### Multiple Choice Question (Check all that apply)\n\nA *description* for question.  \nQuestions are created with headers (level 3) `### Multiple Choice Question (Check all that apply)`.\n\n* Choice A\n* Choice B\n* Choice C\n\n### Single Choice Question\n\nMarkdown is great for including questions about code snippets:\n```\n$(document).ready( function()\n{\n    ko.applyBindings(new TaskViewModel());\n\tvar converter = new Markdown.Converter();\n\tdocument.write(converter.makeHtml(\"**I am bold**\"));\n});\n```\n\n1. Choice\n2. Choice\n3. Choice\n\n### Ranking/Rating Table\n\nThe first column has the description.  [Use github flavored markdown for table formatting](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#wiki-tables).\n\n|                       | Do not Want | Sometimes | Always |\n| --------------------- | ----------- | --------- | ------ | \n| Search terms used in IDE\t                      |  |  |  |\n| Code that did not work out and was deleted.     |  |  |  |\n| Time spent on particular edits\t              |  |  |  |\n| Code and files viewed\t                          |  |  |  |\n\n### Multichoice table\n\nYou can leave the other columns blank, or `[]` if multi choice.\n\n|                 | Read  | Write  |\n| ----------------| ----- | ------ |\n| Blog posts \t  |   []  |  []    |\n| Stack Overflow  |   []  |  []    |\n| Twitter         |   []  |  []    |\n| Github          |   []  |  []    |\n\n### Text multiple line answer\nPlease go into **great** detail, with `> {rows:5}`\n\n&gt; {rows:5}\n\n### Text single line answer\n\nYou can enter in `> {rows:1}` or `> {}`.\n\n&gt; {}\n\n-----------------------\n\n#### Other information\n\nYou can use [json5](https://github.com/aseemk/json5).  _i.e._ `{rows:5}` without quotes `{\"rows\":5}`.\n\nThe recommended method of creating surveys is to edit it in a markdown editor, and then paste it here when you are done.\nThis makes it easier to save and reuse.\n\nThis is a *beta* product, so please give feedback about feature design and requests!\t\n\t",
    "name": "Study XYZ",
    "researcherName": "Mr XYZ",
    "contact": "a@b.com",
    "invitecode": "RESEARCH",
    "awards": [{
        "kind": "Amazon Gift Card",
        "description": "amazing",
        "amount": "1"
    }, {
        "kind": "Amazon Gift Card",
        "description": "123",
        "amount": "0"
    }],
    "description": "foo bar",
    "studyKind": "survey"
}
var p12 = {
    "markdown": "\n{NumberQuestions:true}\n-----------\nStart with header for global options:\n\n    {NumberQuestions:true}\n    -----------\n\n### Multiple Choice Question (Check all that apply)\n\nA *description* for question.  \nQuestions are created with headers (level 3) `### Multiple Choice Question (Check all that apply)`.\n\n* Choice A\n* Choice B\n* Choice C\n\n### Single Choice Question\n\nMarkdown is great for including questions about code snippets:\n```\n$(document).ready( function()\n{\n    ko.applyBindings(new TaskViewModel());\n\tvar converter = new Markdown.Converter();\n\tdocument.write(converter.makeHtml(\"**I am bold**\"));\n});\n```\n\n1. Choice\n2. Choice\n3. Choice\n\n### Ranking/Rating Table\n\nThe first column has the description.  [Use github flavored markdown for table formatting](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#wiki-tables).\n\n|                       | Do not Want | Sometimes | Always |\n| --------------------- | ----------- | --------- | ------ | \n| Search terms used in IDE\t                      |  |  |  |\n| Code that did not work out and was deleted.     |  |  |  |\n| Time spent on particular edits\t              |  |  |  |\n| Code and files viewed\t                          |  |  |  |\n\n### Multichoice table\n\nYou can leave the other columns blank, or `[]` if multi choice.\n\n|                 | Read  | Write  |\n| ----------------| ----- | ------ |\n| Blog posts \t  |   []  |  []    |\n| Stack Overflow  |   []  |  []    |\n| Twitter         |   []  |  []    |\n| Github          |   []  |  []    |\n\n### Text multiple line answer\nPlease go into **great** detail, with `> {rows:5}`\n\n&gt; {rows:5}\n\n### Text single line answer\n\nYou can enter in `> {rows:1}` or `> {}`.\n\n&gt; {}\n\n-----------------------\n\n#### Other information\n\nYou can use [json5](https://github.com/aseemk/json5).  _i.e._ `{rows:5}` without quotes `{\"rows\":5}`.\n\nThe recommended method of creating surveys is to edit it in a markdown editor, and then paste it here when you are done.\nThis makes it easier to save and reuse.\n\nThis is a *beta* product, so please give feedback about feature design and requests!\t\n\t",
    "name": "Study XYZ",
    "researcherName": "Mr XYZ",
    "contact": "a@b.com",
    "invitecode": "RESEARCH",
    "goal": "100",
    "awards": [{
        "kind": "Amazon Gift Card",
        "description": "amazing",
        "amount": "1"
    }, {
        "kind": "Amazon Gift Card",
        "description": "123",
        "amount": "0"
    }],
    "description": "foo bar",
    "studyKind": "dataStudy"
}
var p13 = {
    "markdown": "\n{NumberQuestions:true}\n-----------\nStart with header for global options:\n\n    {NumberQuestions:true}\n    -----------\n\n### Multiple Choice Question (Check all that apply)\n\nA *description* for question.  \nQuestions are created with headers (level 3) `### Multiple Choice Question (Check all that apply)`.\n\n* Choice A\n* Choice B\n* Choice C\n\n### Single Choice Question\n\nMarkdown is great for including questions about code snippets:\n```\n$(document).ready( function()\n{\n    ko.applyBindings(new TaskViewModel());\n\tvar converter = new Markdown.Converter();\n\tdocument.write(converter.makeHtml(\"**I am bold**\"));\n});\n```\n\n1. Choice\n2. Choice\n3. Choice\n\n### Ranking/Rating Table\n\nThe first column has the description.  [Use github flavored markdown for table formatting](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#wiki-tables).\n\n|                       | Do not Want | Sometimes | Always |\n| --------------------- | ----------- | --------- | ------ | \n| Search terms used in IDE\t                      |  |  |  |\n| Code that did not work out and was deleted.     |  |  |  |\n| Time spent on particular edits\t              |  |  |  |\n| Code and files viewed\t                          |  |  |  |\n\n### Multichoice table\n\nYou can leave the other columns blank, or `[]` if multi choice.\n\n|                 | Read  | Write  |\n| ----------------| ----- | ------ |\n| Blog posts \t  |   []  |  []    |\n| Stack Overflow  |   []  |  []    |\n| Twitter         |   []  |  []    |\n| Github          |   []  |  []    |\n\n### Text multiple line answer\nPlease go into **great** detail, with `> {rows:5}`\n\n&gt; {rows:5}\n\n### Text single line answer\n\nYou can enter in `> {rows:1}` or `> {}`.\n\n&gt; {}\n\n-----------------------\n\n#### Other information\n\nYou can use [json5](https://github.com/aseemk/json5).  _i.e._ `{rows:5}` without quotes `{\"rows\":5}`.\n\nThe recommended method of creating surveys is to edit it in a markdown editor, and then paste it here when you are done.\nThis makes it easier to save and reuse.\n\nThis is a *beta* product, so please give feedback about feature design and requests!\t\n\t",
    "name": "Study XYZ",
    "researcherName": "Mr XYZ",
    "contact": "a@b.com",
    "invitecode": "NEQ - RESEARCH",
    "goal": "100",
    "awards": [{
        "kind": "Amazon Gift Card",
        "description": "amazing",
        "amount": "1"
    }, {
        "kind": "Amazon Gift Card",
        "description": "123",
        "amount": "0"
    }],
    "description": "foo bar",
    "studyKind": "survey"
}

var p1 = [p11,p12,p13];

var p21 = {
    "answers": "[{\"question\":1,\"kind\":\"multichoice\",\"answer\":[\"0\"]},{\"question\":2,\"kind\":\"singlechoice\",\"answer\":\"1\"},{\"question\":3,\"kind\":\"singlechoicetable\",\"answer\":{\"3_0\":\"1\",\"3_1\":\"2\",\"3_2\":\"3\",\"3_3\":\"1\"}},{\"question\":4,\"kind\":\"multichoicetable\",\"answer\":{\"4_0\":[\"2\"],\"4_1\":[\"1\"],\"4_2\":[\"2\"],\"4_3\":[\"1\"]}}]",
    "fingerprint": "2481770089",
    "email": "a@b.com",
    "contact": "true",
    "studyId": "5aaff0a4857f41071758ec84"
}
var p22 = {
    "answers": "[{\"question\":1,\"kind\":\"multichoice\",\"answer\":[\"0\"]},{\"question\":2,\"kind\":\"singlechoice\",\"answer\":\"1\"},{\"question\":3,\"kind\":\"singlechoicetable\",\"answer\":{\"3_0\":\"1\",\"3_1\":\"2\",\"3_2\":\"3\",\"3_3\":\"1\"}},{\"question\":4,\"kind\":\"multichoicetable\",\"answer\":{\"4_0\":[\"2\"],\"4_1\":[\"1\"],\"4_2\":[\"2\"],\"4_3\":[\"1\"]}}]",
    "fingerprint": "2481770090",
    "email": "a@b.com",
    "contact": "true",
    "studyId": "5aaff0a4857f41071758ec85"
}

var p2 = [p21,p22];

var p3 = {
    "token": "t1"
}

var arr = ['AMZN','SURFACE','IPADMINI','GITHUB','BROWSERSTACK','NEQ'];
var p4 = [];

for(i in arr){
    p4.push({
        "email": "a@b.com",
        "kind": arr[i]
    });
}
console.log(JSON.stringify(p4));

ids = ["5aaff0a4857f41071758ec85","5aaff0a4857f41071758ec84"]
tokens = ["t1","t2"]

module.exports.ids = ids;
module.exports.tokens = tokens;
module.exports.p1 = p1;
module.exports.p2 = p2;
module.exports.p3 = p3;
module.exports.p4 = p4;