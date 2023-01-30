# Get started

Clone this repository.
Open it in VScode and run

```npm i```

from the terminal.
Start working by editing the ./src/pages/index.jsx file.

# Info:
The following packages have already been added to package.json:
```
retext, retext-keywords, retext-pos
```
Example code for using the keyword extractor:
```
import { retext } from "retext";
import retextPos from "retext-pos";
import retextKeywords from "retext-keywords";
import { toString } from "nlcst-to-string";

let keywords = [];
let v1 = await retext()
  .use(retextPos)
  .use(retextKeywords)
  .process(toAdd.text);

v1.data.keywords.forEach((keyword) => {
  keywords.push(toString(keyword.matches[0].node));
});
```

# Task

Build a keyword extracting tool. Has to be built using reactjs function components.

In index.jsx, inside the Home function component, we will add:

An input field for the paragraph we want to analyse.
A "Save" button to save the paragraph and extract the keywords from it.

When user saves a paragraph, create an object {text: *the text inside the input*, keywords: *the keywords to be extracted*, timestamp: *current timestamp, looks like this: 1671402915492*}.

Extract the keywords from our text, by using the code provided earlier.

Save the object in an array, and save that array to localstorage.
Tip: Use useEffect() to trigger every time we change our data, to save it in localstorage.

When user loads the page, load the paragraphs and their keywords from localstorage.
Tip: Use useEffect() with an empty array for dependencies;

Make a new "Posts" Component where we will display all the paragraphs and their respective keywords.

