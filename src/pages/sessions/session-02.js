import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session02() {
  return (
    <Layout
      title="Session 02 — XML Parser and DOM"
      description="Describe XML parsers, outline the Document Object Model (DOM), and explain XML Namespaces"
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

          <h1>Session 02 — XML Parser and DOM</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Understand XML parsers, the Document Object Model (DOM), and XML Namespaces.</p>
          <p><strong>Based on:</strong> Official Book – Session 2</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Describe XML Parsers</li>
            <li>Outline XML Document Object Model (DOM)</li>
            <li>Explain XML Namespaces</li>
          </ul>

          <hr />

          <h2>1. Session Overview</h2>
          <p>
            In the previous session you learned how to create well-formed and valid XML documents.
            This session focuses on how programs actually <strong>read and process</strong> those documents
            using parsers, the tree structure called the DOM, and how namespaces help avoid name conflicts.
          </p>

          <hr />

          <h2>2. What is an XML Parser?</h2>
          <p>
            An <strong>XML parser</strong> is a software program or library used to read, examine, and understand
            XML documents. Parsers are essential whenever an application needs to work with XML data.
          </p>

          <h3>2.1 Typical Tasks Performed by XML Parsers</h3>
          <ul>
            <li>
              <strong>Parsing</strong> – The parser reads the XML document and checks that it follows XML syntax rules
              (single root element, properly nested tags, quoted attribute values, etc.). Only a well-formed
              document can be successfully parsed.
            </li>
            <li>
              <strong>Validation</strong> – Some parsers can also validate the document against a DTD or an XML Schema.
              Validation ensures the document follows the structure and data rules defined by the schema.
            </li>
            <li>
              <strong>Building a data structure</strong> – After parsing, most parsers create an in-memory representation
              of the document (commonly a DOM tree) so the program can navigate, query, or modify the data.
            </li>
          </ul>

          <hr />

          <h2>3. Types of XML Parsers</h2>

          <h3>3.1 DOM-based Parsers</h3>
          <p>
            A <strong>DOM (Document Object Model)</strong> parser loads the <em>entire</em> XML document into memory
            and builds a tree structure. This allows random access and easy manipulation of any part of the document.
          </p>
          <p><strong>Advantages</strong></p>
          <ul>
            <li>Easy to navigate and modify any node</li>
            <li>Supports complex queries and transformations</li>
          </ul>
          <p><strong>Disadvantages</strong></p>
          <ul>
            <li>Consumes a lot of memory</li>
            <li>Not suitable for very large XML files</li>
          </ul>

          <h3>3.2 Event-driven / SAX-style Parsers</h3>
          <p>
            An <strong>event-driven parser</strong> (often called SAX – Simple API for XML) scans the document
            sequentially and fires events (for example “start element”, “end element”, “characters”).
            The programmer writes handlers for these events.
          </p>
          <p><strong>Advantages</strong></p>
          <ul>
            <li>Very memory-efficient – does not load the whole document</li>
            <li>Ideal for large files or streaming data</li>
          </ul>
          <p><strong>Disadvantages</strong></p>
          <ul>
            <li>Only sequential access</li>
            <li>Harder to implement complex navigation or modification</li>
          </ul>

          <hr />

          <h2>4. Document Object Model (DOM)</h2>
          <p>
            The <strong>Document Object Model</strong> is a platform- and language-independent interface that
            represents an XML (or HTML) document as a tree of nodes. Each element, attribute, text content,
            and comment becomes a node in this tree.
          </p>

          <h3>4.1 Common Node Types</h3>
          <ul>
            <li><code>Document</code> – the root of the tree</li>
            <li><code>Element</code> – an XML tag</li>
            <li><code>Attribute</code> – an attribute of an element</li>
            <li><code>Text</code> – the character data inside an element</li>
            <li><code>Comment</code> – an XML comment</li>
          </ul>

          <h3>4.2 Simple DOM Example</h3>
          <p>Consider this XML:</p>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0"?>
<library>
  <book id="101">
    <title>The Catcher in the Rye</title>
    <author>J.D. Salinger</author>
  </book>
</library>`}
          />
          <p>
            The corresponding DOM tree has a root <code>library</code> element, a child <code>book</code> element
            (with an <code>id</code> attribute), and two further children <code>title</code> and <code>author</code>,
            each containing a text node.
          </p>

          <hr />

          <h2>5. Working with XML in BaseX (as shown in the book)</h2>
          <p>
            The official book demonstrates practical XML processing using <strong>BaseX</strong>,
            a free XML database and XQuery processor that includes a graphical interface.
          </p>

          <h3>5.1 Creating a Database and Loading XML</h3>
          <ol>
            <li>Download and install BaseX from the official website.</li>
            <li>Open the BaseX GUI.</li>
            <li>Create a new database (e.g. <code>myDB</code>).</li>
            <li>Create or import an XML file such as <code>books.xml</code>.</li>
          </ol>

          <p>Example content for <code>books.xml</code>:</p>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0"?>
<library>
  <book id="B01">
    <title>The Catcher in the Rye</title>
    <author>J.D. Salinger</author>
    <genre>Fiction</genre>
    <price>9.99</price>
  </book>
  <book id="B02">
    <title>To Kill a Mockingbird</title>
    <author>Harper Lee</author>
    <genre>Fiction</genre>
    <price>12.99</price>
  </book>
  <book id="B03">
    <title>The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <genre>Fiction</genre>
    <price>10.99</price>
  </book>
</library>`}
          />

          <h3>5.2 Simple XQuery Example</h3>
          <p>The book shows an XQuery that returns all book nodes:</p>
          <CodeBlock
            language="xml"
            code={`for $book in doc("books.xml")//book
return $book`}
          />
          <p>
            Running this query in BaseX returns the three <code><book></code> elements.
            This is a practical demonstration of how a parser + query engine can extract data from XML.
          </p>

          <hr />

          <h2>6. XML Namespaces</h2>
          <p>
            An <strong>XML Namespace</strong> is a way to avoid name conflicts when different vocabularies
            (sets of element names) are mixed in the same document.
          </p>

          <h3>6.1 Why Namespaces Are Needed</h3>
          <p>
            Imagine one vocabulary uses <code><table></code> for a furniture table and another uses
            <code><table></code> for an HTML table. Without namespaces the names would clash.
          </p>

          <h3>6.2 Declaring a Namespace</h3>
          <p>A namespace namespace declaration looks like this:</p>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0"?>
<html:html xmlns:html="http://www.w3.org/1999/xhtml">
  <html:head>
    <html:title>My Page</html:title>
  </html:head>
  <html:body>
    <html:p>Hello World</html:p>
  </html:body>
</html:html>`}
          />
          <ul>
            <li><code>xmlns:html</code> declares a prefix <code>html</code></li>
            <li>The value is a unique URI that identifies the namespace</li>
            <li>All elements with the <code>html:</code> prefix belong to that namespace</li>
          </ul>

          <h3>6.3 Default Namespace</h3>
          <p>You can also declare a default namespace so that unprefixed elements belong to it:</p>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0"?>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>My Page</title>
  </head>
  <body>
    <p>Hello World</p>
  </body>
</html>`}
          />

          <hr />

          <h2>Summary</h2>
          <ul>
            <li>An XML parser reads and interprets XML documents; it can also validate them.</li>
            <li>DOM parsers build a complete in-memory tree — convenient but memory-intensive.</li>
            <li>Event-driven (SAX-style) parsers process the document sequentially and use little memory.</li>
            <li>The Document Object Model represents an XML document as a tree of nodes.</li>
            <li>Tools such as BaseX let you load XML, run XQueries, and explore the data interactively.</li>
            <li>XML Namespaces prevent name collisions when combining different element vocabularies.</li>
          </ul>

          <hr />

          <h2>Test Your Knowledge</h2>
          <ol>
            <li>What is the main purpose of an XML parser?</li>
            <li>Name two typical tasks that XML parsers perform.</li>
            <li>What is the key difference between a DOM parser and an event-driven (SAX) parser?</li>
            <li>When would you prefer a DOM parser over a SAX parser?</li>
            <li>What does the Document Object Model represent?</li>
            <li>Why are XML namespaces used?</li>
            <li>How do you declare a namespace with a prefix in an XML document?</li>
            <li>True or False: A DOM parser is suitable for extremely large XML files.</li>
          </ol>

          <p><em>(Answers will be discussed in class.)</em></p>

          <hr />

          <h2>Try It Yourself</h2>

          <h3>Exercise 1 – Explore BaseX</h3>
          <ol>
            <li>Download and install BaseX from the official site.</li>
            <li>Create a new database.</li>
            <li>Add the <code>books.xml</code> example shown above.</li>
            <li>Run the simple XQuery that returns all <code><book></code> nodes.</li>
          </ol>

          <h3>Exercise 2 – Draw a DOM Tree</h3>
          <p>
            Take the following small XML document and draw its DOM tree on paper
            (or in a drawing tool). Label each node type (Document, Element, Attribute, Text).
          </p>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0"?>
<student id="S100">
  <name>Ayesha Khan</name>
  <course>XML & JSON</course>
</student>`}
          />

          <h3>Exercise 3 – Add a Namespace</h3>
          <p>
            Create a small XML document that mixes two different vocabularies
            (for example a book description and an HTML paragraph). Use a namespace
            prefix for at least one of the vocabularies so the names do not conflict.
          </p>

          <p>
            <strong>Next Session:</strong> XPath
          </p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
