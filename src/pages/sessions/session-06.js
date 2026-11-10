import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session06() {
  return (
    <Layout
      title="Session 06 — Working with JSON"
      description="Parse, stringify, and manipulate JSON in JavaScript and other languages"
    >
      <CustomLayout>
        <article className="session-content">
          <style>{`
            article code:not(pre code) {
              background-color: #f4f4f4;
              color: #d10057;
              padding: 2px 6px;
              border-radius: 4px;
              font-family: Consolas, Monaco, monospace;
              font-size: 0.9em;
            }
          `}</style>

          <h1>Session 06 — Working with JSON</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Learn how to parse JSON strings into native data structures, convert objects back to JSON, and work with JSON in everyday programming tasks.</p>
          <p><strong>Based on:</strong> Official Book – Session 6</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Parse a JSON string into a native object or array</li>
            <li>Convert a native object or array into a JSON string</li>
            <li>Access and modify values inside parsed JSON</li>
            <li>Handle common errors when working with JSON</li>
            <li>Use JSON with the Fetch API and simple web requests</li>
          </ul>

          <hr />

          <h2>1. Session Overview</h2>
          <p>
            Knowing the syntax of JSON is only the first step. In real applications we constantly
            convert between JSON text (what travels over the network or is stored in files)
            and the native data structures of our programming language.
            This session focuses on those conversions and on everyday manipulation of JSON data,
            primarily using JavaScript because it is the language most tightly integrated with JSON.
          </p>

          <hr />

          <h2>2. Parsing JSON — <code>JSON.parse()</code></h2>
          <p>
            <code>JSON.parse()</code> takes a JSON-formatted string and returns the corresponding
            JavaScript value (object, array, string, number, boolean, or null).
          </p>

          <CodeBlock
            language="javascript"
            code={`const jsonString = '{"title":"The Great Gatsby","year":1925,"price":10.99}';

const book = JSON.parse(jsonString);

console.log(book.title);   // The Great Gatsby
console.log(book.year);    // 1925
console.log(typeof book);  // object`}
          />

          <h3>2.1 Parsing an Array</h3>
          <CodeBlock
            language="javascript"
            code={`const jsonArray = '[{"id":1,"name":"Ali"},{"id":2,"name":"Sara"}]';

const students = JSON.parse(jsonArray);

console.log(students[0].name);  // Ali
console.log(students.length);   // 2`}
          />

          <hr />

          <h2>3. Converting to JSON — <code>JSON.stringify()</code></h2>
          <p>
            <code>JSON.stringify()</code> does the opposite: it takes a JavaScript value and
            returns its JSON string representation.
          </p>

          <CodeBlock
            language="javascript"
            code={`const book = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  year: 1925,
  price: 10.99
};

const jsonString = JSON.stringify(book);
console.log(jsonString);
// {"title":"The Great Gatsby","author":"F. Scott Fitzgerald","year":1925,"price":10.99}`}
          />

          <h3>3.1 Pretty-Printing</h3>
          <p>You can make the output more readable by supplying a space argument:</p>
          <CodeBlock
            language="javascript"
            code={`const pretty = JSON.stringify(book, null, 2);
console.log(pretty);
/*
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925,
  "price": 10.99
}
*/`}
          />

          <h3>3.2 The Replacer Parameter</h3>
          <p>The second argument can be an array of allowed keys or a replacer function:</p>
          <CodeBlock
            language="javascript"
            code={`// Only include specific properties
const limited = JSON.stringify(book, ["title", "year"]);
console.log(limited);
// {"title":"The Great Gatsby","year":1925}`}
          />

          <hr />

          <h2>4. Accessing and Modifying Data</h2>
          <p>Once JSON has been parsed, you work with ordinary JavaScript objects and arrays.</p>

          <CodeBlock
            language="javascript"
            code={`const data = JSON.parse(`{
  "bookstore": [
    { "id": "B01", "title": "The Great Gatsby", "price": 10.99 },
    { "id": "B02", "title": "To Kill a Mockingbird", "price": 12.99 }
  ]
}`);

// Read
console.log(data.bookstore[0].title);

// Modify
data.bookstore[0].price = 9.99;

// Add a new book
data.bookstore.push({
  id: "B03",
  title: "The Elements of Style",
  price: 9.99
});

// Convert back to JSON
const updatedJson = JSON.stringify(data, null, 2);`}
          />

          <hr />

          <h2>5. Handling Errors</h2>
          <p>
            <code>JSON.parse()</code> throws a <code>SyntaxError</code> if the string is not valid JSON.
            Always wrap parsing in a try/catch block when the source is untrusted.
          </p>

          <CodeBlock
            language="javascript"
            code={`function safeParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Invalid JSON:", error.message);
    return null;
  }
}

const result = safeParse('{ name: "Ali" }');  // missing quotes around key
// logs: Invalid JSON: Unexpected token n in JSON at position 2
console.log(result);  // null`}
          />

          <hr />

          <h2>6. Working with JSON and the Fetch API</h2>
          <p>
            In modern browsers and Node.js the Fetch API makes it easy to retrieve JSON from a server.
          </p>

          <CodeBlock
            language="javascript"
            code={`async function loadBooks() {
  try {
    const response = await fetch("https://api.example.com/books");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const books = await response.json();  // automatically parses JSON
    console.log(books);
  } catch (error) {
    console.error("Failed to load books:", error);
  }
}

loadBooks();`}
          />

          <p>
            Note that <code>response.json()</code> is a convenience method that both reads the body
            and calls <code>JSON.parse()</code> for you.
          </p>

          <hr />

          <h2>7. JSON in Other Languages (Quick Look)</h2>

          <h3>7.1 C# / .NET</h3>
          <CodeBlock
            language="javascript"
            code={`// Using System.Text.Json
string json = "{\"title\":\"The Great Gatsby\",\"year\":1925}";
var book = JsonSerializer.Deserialize<Book>(json);
string output = JsonSerializer.Serialize(book);`}
          />

          <h3>7.2 Python</h3>
          <CodeBlock
            language="javascript"
            code={`import json

data = json.loads('{"title": "The Great Gatsby", "year": 1925}')
print(data["title"])

json_string = json.dumps(data, indent=2)`}
          />

          <h3>7.3 Java</h3>
          <p>Popular libraries include Jackson, Gson, and org.json.</p>

          <hr />

          <h2>8. Common Pitfalls</h2>
          <ul>
            <li>Forgetting that <code>JSON.parse</code> expects a <em>string</em>, not an already-parsed object</li>
            <li>Trying to stringify functions, undefined, or circular references (they are omitted or cause errors)</li>
            <li>Assuming the order of keys in an object is significant (it is not guaranteed in older engines)</li>
            <li>Not handling network or parse errors when fetching remote JSON</li>
          </ul>

          <hr />

          <h2>Summary</h2>
          <ul>
            <li><code>JSON.parse()</code> converts a JSON string into a native JavaScript value.</li>
            <li><code>JSON.stringify()</code> converts a native value into a JSON string.</li>
            <li>Always use try/catch around <code>JSON.parse</code> when the input may be invalid.</li>
            <li>The Fetch API’s <code>response.json()</code> method parses the response body for you.</li>
            <li>Similar parse/stringify functions exist in virtually every modern language.</li>
          </ul>

          <hr />

          <h2>Test Your Knowledge</h2>
          <ol>
            <li>What does <code>JSON.parse()</code> return if the input is an array of objects?</li>
            <li>How can you produce indented (pretty-printed) JSON with <code>JSON.stringify</code>?</li>
            <li>What happens if you call <code>JSON.parse</code> on a string that is not valid JSON?</li>
            <li>Write a short code snippet that converts a JavaScript object into a JSON string and then back into an object.</li>
            <li>How does <code>response.json()</code> differ from manually calling <code>JSON.parse</code> on the response text?</li>
            <li>True or False: <code>JSON.stringify</code> will include function properties of an object.</li>
            <li>Why should you use try/catch when parsing JSON that comes from an external source?</li>
          </ol>

          <p><em>(Answers will be discussed in class.)</em></p>

          <hr />

          <h2>Try It Yourself</h2>

          <h3>Exercise 1 – Round-Trip Conversion</h3>
          <p>
            Create a JavaScript object that represents a student (id, name, courses array).
            Convert it to a JSON string, log the string, then parse it back and log one of the properties
            to prove the round-trip worked.
          </p>

          <h3>Exercise 2 – Safe Parsing</h3>
          <p>
            Write a function <code>safeParse(jsonString)</code> that returns the parsed value or
            <code>null</code> if parsing fails. Test it with both valid and invalid JSON.
          </p>

          <h3>Exercise 3 – Fetch Practice (if network is available)</h3>
          <p>
            Use the Fetch API to retrieve JSON from a public endpoint (for example
            <code>https://jsonplaceholder.typicode.com/posts/1</code>) and display the title
            in the console or on a web page.
          </p>

          <p>
            <strong>Next Session:</strong> Advanced JSON Features
          </p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
