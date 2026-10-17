import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session03() {
  return (
    <Layout
      title="Session 03 — XPath"
      description="Define XPath and its expressions, nodes, absolute vs relative paths, and operators"
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

          <h1>Session 03 — XPath</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Learn how to navigate and select nodes from an XML document using XPath.</p>
          <p><strong>Based on:</strong> Official Book – Session 3</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Define XPath and its Expressions</li>
            <li>Define and describe various elements (nodes) in XPath</li>
            <li>Compare XPath Relative and Absolute Paths</li>
            <li>Explain the use of XPath Operators</li>
          </ul>

          <hr />

          <h2>1. Session Overview</h2>
          <p>
            In the previous session you learned how parsers and the DOM represent an XML document as a tree.
            <strong>XPath</strong> is the language used to navigate that tree and select specific nodes.
            It is used heavily with XSLT, XQuery, and in many programming languages (Java, C#, Python, JavaScript).
          </p>

          <hr />

          <h2>2. What is XPath?</h2>
          <p>
            <strong>XPath</strong> (XML Path Language) is a powerful language designed to navigate through
            and select specific elements (or other nodes) from an XML document.
          </p>
          <p>
            Because XML documents form a hierarchical tree, XPath expressions describe paths
            through that tree — similar to how file paths describe locations in a folder structure.
          </p>

          <h3>2.1 Why XPath is Useful</h3>
          <ul>
            <li>Select single nodes or whole sets of nodes</li>
            <li>Filter nodes using conditions (predicates)</li>
            <li>Used inside XSLT stylesheets and XQuery</li>
            <li>Available in most modern programming languages</li>
          </ul>

          <hr />

          <h2>3. Sample XML Document</h2>
          <p>We will use the following simple bookstore document for all examples in this session:</p>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0"?>
<bookstore>
  <book id="B01">
    <title>The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <year>1925</year>
    <price>10.99</price>
  </book>
  <book id="B02">
    <title>To Kill a Mockingbird</title>
    <author>Harper Lee</author>
    <year>1960</year>
    <price>12.99</price>
  </book>
  <book id="B03">
    <title>The Elements of Style</title>
    <author>William Strunk Jr.</author>
    <year>1918</year>
    <price>9.99</price>
  </book>
</bookstore>`}
          />

          <hr />

          <h2>4. XPath Nodes</h2>
          <p>XPath works with several types of nodes. The most common ones are:</p>
          <ul>
            <li><strong>Element nodes</strong> – e.g. <code>book</code>, <code>title</code>, <code>author</code></li>
            <li><strong>Attribute nodes</strong> – e.g. the <code>id</code> attribute of a book</li>
            <li><strong>Text nodes</strong> – the actual character data inside an element</li>
            <li><strong>Document node</strong> – the root of the whole document</li>
            <li><strong>Comment nodes</strong> and <strong>Processing Instruction nodes</strong></li>
          </ul>

          <hr />

          <h2>5. Absolute vs Relative Paths</h2>

          <h3>5.1 Absolute Path</h3>
          <p>
            An <strong>absolute path</strong> starts from the root of the document and begins with a single slash <code>/</code>.
          </p>
          <CodeBlock
            language="xml"
            code={`/bookstore/book/title`}
          />
          <p>This selects every <code>title</code> element that is a child of a <code>book</code> element under <code>bookstore</code>.</p>

          <h3>5.2 Relative Path</h3>
          <p>
            A <strong>relative path</strong> starts from the current context node (the node you are already “standing on”).
            It does <em>not</em> begin with a slash.
          </p>
          <CodeBlock
            language="xml"
            code={`book/title`}
          />
          <p>If the current context is already <code>bookstore</code>, the expression above has the same effect as the absolute path.</p>

          <h3>5.3 The Double Slash <code>//</code></h3>
          <p>
            <code>//</code> selects nodes no matter where they are in the document (descendant-or-self axis).
          </p>
          <CodeBlock
            language="xml"
            code={`//title`}
          />
          <p>This returns every <code>title</code> element in the whole document.</p>

          <hr />

          <h2>6. Common XPath Expressions (from the book)</h2>

          <h3>6.1 Select all book titles</h3>
          <CodeBlock
            language="xml"
            code={`/bookstore/book/title`}
          />
          <p>Result: The Great Gatsby, To Kill a Mockingbird, The Elements of Style</p>

          <h3>6.2 Select books published before 1960</h3>
          <CodeBlock
            language="xml"
            code={`/bookstore/book[year < 1960]`}
          />
          <p>Result: The Great Gatsby (1925) and The Elements of Style (1918)</p>

          <h3>6.3 Select the price of a specific book</h3>
          <CodeBlock
            language="xml"
            code={`/bookstore/book[@id='B02']/price`}
          />
          <p>Result: 12.99</p>

          <hr />

          <h2>7. XPath Predicates (Filters)</h2>
          <p>Predicates are written in square brackets <code>[ ]</code> and filter the selected nodes.</p>
          <ul>
            <li><code>book[1]</code> – the first book</li>
            <li><code>book[last()]</code> – the last book</li>
            <li><code>book[price > 10]</code> – books whose price is greater than 10</li>
            <li><code>book[@id='B01']</code> – the book that has the attribute id equal to B01</li>
          </ul>

          <hr />

          <h2>8. XPath Operators</h2>
          <p>XPath provides several useful operators:</p>

          <h3>8.1 Comparison Operators</h3>
          <ul>
            <li><code>=</code> equal to</li>
            <li><code>!=</code> not equal to</li>
            <li><code><</code> less than</li>
            <li><code><=</code> less than or equal to</li>
            <li><code>></code> greater than</li>
            <li><code>>=</code> greater than or equal to</li>
          </ul>

          <h3>8.2 Logical Operators</h3>
          <ul>
            <li><code>and</code></li>
            <li><code>or</code></li>
            <li><code>not()</code></li>
          </ul>

          <h3>8.3 Arithmetic Operators</h3>
          <ul>
            <li><code>+</code>, <code>-</code>, <code>*</code>, <code>div</code> (division), <code>mod</code> (modulo)</li>
          </ul>

          <p>Example using operators:</p>
          <CodeBlock
            language="xml"
            code={`/bookstore/book[price > 10 and year < 1960]`}
          />

          <hr />

          <h2>9. Practical Tip from the Book</h2>
          <p>
            The official book demonstrates XPath using a simple web page hosted in XAMPP.
            You can also test XPath expressions very easily with:
          </p>
          <ul>
            <li>BaseX (the tool you used in Session 2)</li>
            <li>Online XPath testers</li>
            <li>Browser developer tools (for HTML/XML)</li>
            <li>Programming languages that support XPath (Java, C#, Python, JavaScript)</li>
          </ul>

          <hr />

          <h2>Summary</h2>
          <ul>
            <li>XPath is a language for selecting nodes from an XML document.</li>
            <li>Absolute paths start with <code>/</code>; relative paths start from the current context.</li>
            <li><code>//</code> selects nodes anywhere in the document.</li>
            <li>Predicates <code>[ ]</code> filter the selected nodes.</li>
            <li>XPath supports comparison, logical and arithmetic operators.</li>
            <li>XPath is the foundation for XSLT and XQuery.</li>
          </ul>

          <hr />

          <h2>Test Your Knowledge</h2>
          <ol>
            <li>What does XPath stand for and what is its main purpose?</li>
            <li>What is the difference between an absolute path and a relative path?</li>
            <li>What does the double slash <code>//</code> mean in an XPath expression?</li>
            <li>Write an XPath expression that selects all <code>author</code> elements in the bookstore document.</li>
            <li>Write an XPath expression that selects books whose price is greater than 10.</li>
            <li>How do you select a book by its <code>id</code> attribute?</li>
            <li>Name three types of nodes that XPath can select.</li>
            <li>True or False: XPath can only be used inside XSLT stylesheets.</li>
          </ol>

          <p><em>(Answers will be discussed in class.)</em></p>

          <hr />

          <h2>Try It Yourself</h2>

          <h3>Exercise 1 – Basic Selection</h3>
          <p>Using the bookstore XML above, write XPath expressions that return:</p>
          <ol>
            <li>All book titles</li>
            <li>The author of the second book</li>
            <li>All books published after 1950</li>
          </ol>

          <h3>Exercise 2 – Predicates</h3>
          <p>Write an XPath expression that selects books that cost less than 11 <strong>and</strong> were published before 1930.</p>

          <h3>Exercise 3 – Test in BaseX or XAMPP</h3>
          <p>
            Take any of the expressions from this session and run them against the bookstore document
            using BaseX (or the XAMPP example shown in the book). Confirm that the results match
            what you expect.
          </p>

          <p>
            <strong>Next Session:</strong> XSLT
          </p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
