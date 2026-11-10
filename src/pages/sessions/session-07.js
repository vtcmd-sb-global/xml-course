import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session07() {
  return (
    <Layout
      title="Session 07 — Advanced JSON Features"
      description="Explore JSON Schema, JSONPath, JSON Lines, and practical advanced techniques"
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

          <h1>Session 07 — Advanced JSON Features</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Move beyond basic parse/stringify and explore validation with JSON Schema, querying with JSONPath, streaming formats, and other advanced techniques.</p>
          <p><strong>Based on:</strong> Official Book – Session 7</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Explain the purpose of JSON Schema and write simple schemas</li>
            <li>Use JSONPath expressions to query JSON documents</li>
            <li>Understand JSON Lines (JSONL) and when it is useful</li>
            <li>Handle large JSON data and streaming scenarios</li>
            <li>Apply practical patterns for working with complex JSON</li>
          </ul>

          <hr />

          <h2>1. Session Overview</h2>
          <p>
            The previous two sessions covered JSON fundamentals and everyday parse/stringify operations.
            Real-world systems often need stronger guarantees about structure (validation),
            the ability to extract specific pieces of data from large documents (querying),
            and efficient ways to process streams of JSON records.
            This session introduces the most important advanced tools and patterns.
          </p>

          <hr />

          <h2>2. JSON Schema</h2>
          <p>
            <strong>JSON Schema</strong> is a vocabulary that allows you to annotate and validate JSON documents.
            It plays a role similar to XSD for XML: it describes the expected shape, data types,
            required properties, and constraints.
          </p>

          <h3>2.1 Simple Schema Example</h3>
          <CodeBlock
            language="json"
            code={`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/book.schema.json",
  "title": "Book",
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^B[0-9]{2}$"
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "author": {
      "type": "string"
    },
    "year": {
      "type": "integer",
      "minimum": 1000,
      "maximum": 2100
    },
    "price": {
      "type": "number",
      "exclusiveMinimum": 0
    },
    "tags": {
      "type": "array",
      "items": { "type": "string" },
      "uniqueItems": true
    }
  },
  "required": ["id", "title", "author", "year"],
  "additionalProperties": false
}`}
          />

          <h3>2.2 Common Keywords</h3>
          <ul>
            <li><code>type</code> — object, array, string, number, integer, boolean, null</li>
            <li><code>properties</code> / <code>required</code> / <code>additionalProperties</code></li>
            <li><code>items</code>, <code>minItems</code>, <code>maxItems</code>, <code>uniqueItems</code></li>
            <li><code>minimum</code>, <code>maximum</code>, <code>exclusiveMinimum</code>, <code>exclusiveMaximum</code></li>
            <li><code>minLength</code>, <code>maxLength</code>, <code>pattern</code></li>
            <li><code>enum</code>, <code>const</code></li>
            <li><code>oneOf</code>, <code>anyOf</code>, <code>allOf</code>, <code>not</code></li>
          </ul>

          <h3>2.3 Validating in JavaScript</h3>
          <p>Popular libraries include Ajv, Zod (TypeScript-first), and Joi.</p>
          <CodeBlock
            language="javascript"
            code={`// Example using Ajv (conceptual)
import Ajv from "ajv";

const ajv = new Ajv();
const validate = ajv.compile(bookSchema);

const book = {
  id: "B01",
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  year: 1925,
  price: 10.99
};

const valid = validate(book);
if (!valid) {
  console.log(validate.errors);
}`}
          />

          <hr />

          <h2>3. JSONPath</h2>
          <p>
            <strong>JSONPath</strong> is a query language for JSON, analogous to XPath for XML.
            It lets you extract values from complex nested structures using path expressions.
          </p>

          <h3>3.1 Sample Document</h3>
          <CodeBlock
            language="json"
            code={`{
  "store": {
    "book": [
      {
        "category": "fiction",
        "title": "The Great Gatsby",
        "price": 10.99
      },
      {
        "category": "fiction",
        "title": "To Kill a Mockingbird",
        "price": 12.99
      },
      {
        "category": "reference",
        "title": "The Elements of Style",
        "price": 9.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}`}
          />

          <h3>3.2 Common JSONPath Expressions</h3>
          <ul>
            <li><code>$.store.book[*].title</code> — all book titles</li>
            <li><code>$.store.book[0]</code> — the first book</li>
            <li><code>$.store.book[?(@.price &lt; 11)]</code> — books cheaper than 11</li>
            <li><code>$..price</code> — all prices anywhere in the document</li>
            <li><code>$.store.book[?(@.category == 'fiction')]</code> — only fiction books</li>
          </ul>

          <p>
            Libraries such as jsonpath-plus (JavaScript), JsonPath (Java), and jsonpath (Python)
            implement these expressions.
          </p>

          <hr />

          <h2>4. JSON Lines (JSONL / NDJSON)</h2>
          <p>
            <strong>JSON Lines</strong> (also called Newline-Delimited JSON) is a convenient format
            for streaming and large datasets. Each line is a complete, independent JSON value
            (usually an object).
          </p>

          <CodeBlock
            language="json"
            code={`{"id":1,"name":"Ali","score":85}
{"id":2,"name":"Sara","score":92}
{"id":3,"name":"Omar","score":78}`}
          />

          <p>Advantages:</p>
          <ul>
            <li>Can be processed one record at a time (low memory)</li>
            <li>Easy to append new records</li>
            <li>Works well with Unix tools (grep, head, tail, etc.)</li>
            <li>Popular in log files, data pipelines, and machine-learning datasets</li>
          </ul>

          <hr />

          <h2>5. Working with Large JSON</h2>
          <p>When a JSON document is very large, loading the entire file into memory can be problematic.</p>
          <ul>
            <li>Prefer streaming parsers when available</li>
            <li>Use JSON Lines for record-oriented data</li>
            <li>Paginate API responses instead of returning huge arrays</li>
            <li>Consider binary formats (MessagePack, CBOR, Protocol Buffers) for performance-critical paths</li>
          </ul>

          <hr />

          <h2>6. Practical Patterns</h2>

          <h3>6.1 Defensive Access</h3>
          <CodeBlock
            language="javascript"
            code={`// Optional chaining and nullish coalescing
const title = data?.store?.book?.[0]?.title ?? "Unknown";`}
          />

          <h3>6.2 Transforming Arrays of Objects</h3>
          <CodeBlock
            language="javascript"
            code={`const titles = data.store.book.map(book => book.title);

const cheapBooks = data.store.book.filter(book => book.price < 11);

const total = data.store.book.reduce((sum, book) => sum + book.price, 0);`}
          />

          <h3>6.3 Deep Cloning</h3>
          <CodeBlock
            language="javascript"
            code={`// Simple deep clone for JSON-compatible data
const clone = JSON.parse(JSON.stringify(original));

// Modern alternative (structuredClone)
const clone2 = structuredClone(original);`}
          />

          <hr />

          <h2>7. JSON and APIs — Best Practices</h2>
          <ul>
            <li>Always set the <code>Content-Type: application/json</code> header</li>
            <li>Validate incoming JSON with a schema before processing</li>
            <li>Return meaningful HTTP status codes and error objects</li>
            <li>Version your API (URL path or header) so clients can evolve safely</li>
            <li>Prefer consistent naming conventions (camelCase or snake_case)</li>
          </ul>

          <hr />

          <h2>Summary</h2>
          <ul>
            <li>JSON Schema provides a powerful way to validate the structure and types of JSON documents.</li>
            <li>JSONPath offers XPath-like querying for extracting data from complex JSON.</li>
            <li>JSON Lines is ideal for streaming and large record-oriented datasets.</li>
            <li>Defensive coding (optional chaining, schema validation, proper error handling) is essential when consuming external JSON.</li>
            <li>For very large data, prefer streaming or binary formats over loading entire documents into memory.</li>
          </ul>

          <hr />

          <h2>Test Your Knowledge</h2>
          <ol>
            <li>What problem does JSON Schema solve?</li>
            <li>Write a JSON Schema fragment that requires a string property called <code>email</code> that must match a simple email pattern.</li>
            <li>What does the JSONPath expression <code>$..price</code> select?</li>
            <li>How does JSON Lines differ from a normal JSON array?</li>
            <li>Why is <code>JSON.parse(JSON.stringify(obj))</code> a common (but imperfect) way to deep-clone an object?</li>
            <li>Name two advantages of validating API request bodies with JSON Schema.</li>
            <li>True or False: JSONPath is part of the official JSON standard.</li>
          </ol>

          <p><em>(Answers will be discussed in class.)</em></p>

          <hr />

          <h2>Try It Yourself</h2>

          <h3>Exercise 1 – Write a Schema</h3>
          <p>
            Create a JSON Schema for a <code>Student</code> object that has:
            required <code>id</code> (string), <code>name</code> (string),
            optional <code>age</code> (integer between 15 and 100),
            and <code>courses</code> (array of strings).
          </p>

          <h3>Exercise 2 – JSONPath Queries</h3>
          <p>
            Using the store example above, write JSONPath expressions that return:
          </p>
          <ol>
            <li>All book titles</li>
            <li>The price of the bicycle</li>
            <li>Only books in the “fiction” category</li>
          </ol>

          <h3>Exercise 3 – JSON Lines</h3>
          <p>
            Convert the array of books into JSON Lines format.
            Then write a few lines of code (any language) that reads the file line by line
            and prints only the titles.
          </p>

          <p>
            <strong>Next Session:</strong> CORS
          </p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
