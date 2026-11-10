import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session05() {
  return (
    <Layout
      title="Session 05 — JSON"
      description="Define JSON, its syntax, data types, objects, arrays, and compare it with XML"
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

          <h1>Session 05 — JSON</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Understand JSON as a lightweight data-interchange format, its syntax rules, data types, and how it compares with XML.</p>
          <p><strong>Based on:</strong> Official Book – Session 5</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Define JSON and explain why it is popular</li>
            <li>Describe the basic syntax rules of JSON</li>
            <li>Identify and use the six JSON data types</li>
            <li>Create JSON objects and arrays</li>
            <li>Compare JSON with XML and know when to prefer one over the other</li>
          </ul>

          <hr />

          <h2>1. Session Overview</h2>
          <p>
            Up to this point the course has focused on XML. Modern web APIs and many applications
            have moved to a lighter alternative called <strong>JSON</strong> (JavaScript Object Notation).
            JSON is easy for humans to read and write and easy for machines to parse and generate.
            In this session we learn the fundamentals of JSON so that we can work with it confidently
            in the following sessions.
          </p>

          <hr />

          <h2>2. What is JSON?</h2>
          <p>
            <strong>JSON</strong> (JavaScript Object Notation) is a lightweight, text-based,
            language-independent data-interchange format. It was derived from JavaScript object
            literal syntax, but today it is used by virtually every modern programming language.
          </p>
          <p>Key characteristics:</p>
          <ul>
            <li>Text format (UTF-8 by convention)</li>
            <li>Human-readable and machine-parsable</li>
            <li>Language independent</li>
            <li>Built on two structures: objects (key/value pairs) and arrays (ordered lists)</li>
            <li>Much less verbose than XML for the same data</li>
          </ul>

          <hr />

          <h2>3. JSON Syntax Rules</h2>
          <ul>
            <li>Data is represented as name/value pairs</li>
            <li>Names (keys) must be strings enclosed in double quotes</li>
            <li>Values can be any of the six JSON data types</li>
            <li>Objects are enclosed in curly braces <code>{'{}'}</code></li>
            <li>Arrays are enclosed in square brackets <code>[]</code></li>
            <li>Items in objects and arrays are separated by commas</li>
            <li>Whitespace is ignored (except inside strings)</li>
            <li>No trailing commas are allowed</li>
            <li>No comments are allowed in standard JSON</li>
          </ul>

          <hr />

          <h2>4. JSON Data Types</h2>
          <p>JSON supports exactly six data types:</p>

          <h3>4.1 String</h3>
          <CodeBlock language="json" code={`"Hello, World"`} />
          <p>Always double-quoted. Special characters are escaped with a backslash.</p>

          <h3>4.2 Number</h3>
          <CodeBlock language="json" code={`42
3.14159
-17
1.5e10`} />
          <p>No distinction between integer and floating-point; no octal or hexadecimal.</p>

          <h3>4.3 Boolean</h3>
          <CodeBlock language="json" code={`true
false`} />
          <p>Lowercase only.</p>

          <h3>4.4 Null</h3>
          <CodeBlock language="json" code={`null`} />
          <p>Represents a missing or unknown value.</p>

          <h3>4.5 Object</h3>
          <CodeBlock
            language="json"
            code={`{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925,
  "price": 10.99
}`}
          />

          <h3>4.6 Array</h3>
          <CodeBlock
            language="json"
            code={`[
  "apple",
  "banana",
  "cherry"
]`} 
          />

          <hr />

          <h2>5. Objects and Arrays in Practice</h2>

          <h3>5.1 Nested Objects</h3>
          <CodeBlock
            language="json"
            code={`{
  "book": {
    "title": "The Great Gatsby",
    "author": {
      "firstName": "F. Scott",
      "lastName": "Fitzgerald"
    },
    "year": 1925
  }
}`}
          />

          <h3>5.2 Array of Objects</h3>
          <CodeBlock
            language="json"
            code={`{
  "bookstore": [
    {
      "id": "B01",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "year": 1925,
      "price": 10.99
    },
    {
      "id": "B02",
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "year": 1960,
      "price": 12.99
    }
  ]
}`}
          />

          <hr />

          <h2>6. JSON vs XML</h2>
          <p>Both formats are used for data interchange, but they have different strengths.</p>

          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>JSON</th>
                <th>XML</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Verbosity</td>
                <td>Compact</td>
                <td>More verbose (tags)</td>
              </tr>
              <tr>
                <td>Data types</td>
                <td>Native numbers, booleans, null</td>
                <td>Everything is text (schemas add types)</td>
              </tr>
              <tr>
                <td>Arrays</td>
                <td>First-class</td>
                <td>Repeated elements</td>
              </tr>
              <tr>
                <td>Comments</td>
                <td>Not allowed</td>
                <td>Supported</td>
              </tr>
              <tr>
                <td>Namespaces</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Schema / Validation</td>
                <td>JSON Schema</td>
                <td>DTD, XSD</td>
              </tr>
              <tr>
                <td>Typical use today</td>
                <td>Web APIs, configuration, NoSQL</td>
                <td>Document-centric data, legacy systems, SOAP</td>
              </tr>
            </tbody>
          </table>

          <p>
            <strong>Rule of thumb:</strong> Prefer JSON for data APIs and configuration.
            Prefer XML when you need rich document markup, namespaces, or existing XML tooling.
          </p>

          <hr />

          <h2>7. Validating JSON</h2>
          <p>
            Unlike XML, JSON does not have a built-in DTD-style validation mechanism in the language itself.
            The common way to validate structure and types is <strong>JSON Schema</strong>.
          </p>
          <p>A simple JSON Schema example:</p>
          <CodeBlock
            language="json"
            code={`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "title": { "type": "string" },
    "year": { "type": "integer", "minimum": 1000 },
    "price": { "type": "number", "minimum": 0 }
  },
  "required": ["title", "year"]
}`}
          />

          <hr />

          <h2>8. Where JSON is Used</h2>
          <ul>
            <li>REST and GraphQL APIs</li>
            <li>Configuration files (<code>package.json</code>, <code>tsconfig.json</code>, etc.)</li>
            <li>NoSQL databases (MongoDB, CouchDB, …)</li>
            <li>Browser storage (localStorage, IndexedDB)</li>
            <li>Message queues and event streams</li>
            <li>Mobile app data exchange</li>
          </ul>

          <hr />

          <h2>Summary</h2>
          <ul>
            <li>JSON is a lightweight, language-independent data-interchange format.</li>
            <li>It is built on objects (unordered key/value pairs) and arrays (ordered lists).</li>
            <li>There are six data types: string, number, boolean, null, object, array.</li>
            <li>Keys must be double-quoted strings; trailing commas and comments are not allowed.</li>
            <li>JSON is generally more compact and easier to parse than XML for pure data.</li>
            <li>JSON Schema can be used when formal validation is required.</li>
          </ul>

          <hr />

          <h2>Test Your Knowledge</h2>
          <ol>
            <li>What does JSON stand for?</li>
            <li>Name the six data types supported by JSON.</li>
            <li>Why must object keys be enclosed in double quotes?</li>
            <li>Is the following valid JSON? Explain.
              <CodeBlock language="json" code={`{ name: "Ali", age: 22 }`} />
            </li>
            <li>How would you represent a list of student names in JSON?</li>
            <li>Give two advantages of JSON over XML.</li>
            <li>True or False: JSON supports comments.</li>
            <li>What is the purpose of JSON Schema?</li>
          </ol>

          <p><em>(Answers will be discussed in class.)</em></p>

          <hr />

          <h2>Try It Yourself</h2>

          <h3>Exercise 1 – Create a JSON Document</h3>
          <p>
            Create a file named <code>students.json</code> that contains an array of three student objects.
            Each student should have: <code>id</code>, <code>name</code>, <code>age</code>, and <code>courses</code> (an array of course names).
          </p>

          <h3>Exercise 2 – Nesting</h3>
          <p>
            Extend one of the student objects so that it also contains an <code>address</code> object
            with <code>city</code>, <code>country</code>, and <code>postalCode</code>.
          </p>

          <h3>Exercise 3 – Validation</h3>
          <p>
            Paste your JSON into an online JSON validator (e.g. jsonlint.com) and confirm that it is valid.
            Then intentionally introduce a trailing comma or an unquoted key and observe the error message.
          </p>

          <p>
            <strong>Next Session:</strong> Working with JSON
          </p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
