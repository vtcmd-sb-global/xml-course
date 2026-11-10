import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function XMLQueryNetBeans() {
  return (
    <Layout
      title="XML Query with Standard XQuery (NetBeans)"
      description="Standard XQuery functions and queries that run in NetBeans, Saxon, Oxygen and other XQuery processors"
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
            .func-table {
              width: 100%;
              border-collapse: collapse;
              margin: 1rem 0 1.5rem;
              font-size: 0.92em;
            }
            .func-table th,
            .func-table td {
              border: 1px solid #ddd;
              padding: 8px 12px;
              text-align: left;
              vertical-align: top;
            }
            .func-table th {
              background-color: #f8f8f8;
              font-weight: 600;
            }
            .func-table tr:nth-child(even) {
              background-color: #fafafa;
            }
            .note-box {
              background: #fff8e6;
              border-left: 4px solid #f0ad4e;
              padding: 12px 16px;
              margin: 1rem 0;
              border-radius: 0 4px 4px 0;
            }
            .important-box {
              background: #f0f7ff;
              border-left: 4px solid #4a90d9;
              padding: 12px 16px;
              margin: 1rem 0;
              border-radius: 0 4px 4px 0;
            }
            .success-box {
              background: #e8f5e9;
              border-left: 4px solid #4caf50;
              padding: 12px 16px;
              margin: 1rem 0;
              border-radius: 0 4px 4px 0;
            }
          `}</style>

          <h1>XML Query with Standard XQuery (NetBeans Compatible)</h1>

          <p>
            This session focuses on <strong>standard XQuery / XPath</strong> functions and queries.
            Everything shown here runs in:
          </p>
          <ul>
            <li><strong>NetBeans</strong> (with an XQuery plugin or external processor such as Saxon)</li>
            <li>Saxon (HE / PE / EE)</li>
            <li>Oxygen XML Editor</li>
            <li>XMLSpy</li>
            <li>BaseX (standard mode — without <code>db:</code> functions)</li>
            <li>Any conformant XQuery 1.0 / 3.0 / 3.1 processor</li>
          </ul>

          <div className="important-box">
            <strong>Important difference from the BaseX session:</strong><br />
            This page uses only <strong>standard</strong> functions (<code>doc()</code>, <code>collection()</code>,
            string functions, sequence functions, etc.). It does <em>not</em> use BaseX-specific
            functions such as <code>db:get()</code>, <code>db:add()</code>, or <code>db:list()</code>.
          </div>

          <hr />

          <h2>1. How to Run XQuery in NetBeans</h2>

          <p>NetBeans does not include a built-in XQuery engine. You have two practical options:</p>

          <h3>Option A — Use Saxon as an External Tool (Recommended)</h3>
          <ol>
            <li>Download <strong>Saxon-HE</strong> (free) from the official Saxonica website.</li>
            <li>In NetBeans go to <strong>Tools → Options → Miscellaneous → External Tools</strong> (or create a project Ant/Maven task).</li>
            <li>Add a tool that runs:
              <CodeBlock
                language="bash"
                code={`java -cp saxon-he-12.x.jar net.sf.saxon.Query -s:input.xml -q:query.xq -o:result.xml`}
              />
            </li>
            <li>Or use the simpler form when the query itself loads the document with <code>doc()</code>.</li>
          </ol>

          <h3>Option B — Use a Maven / Gradle project with Saxon dependency</h3>
          <p>Add Saxon to your project and run XQuery from a small Java main class or from the command line via the Maven plugin.</p>

          <h3>Option C — Use Oxygen / XMLSpy / BaseX GUI for testing</h3>
          <p>
            Many students write the queries in NetBeans (good editor) and test them in Oxygen,
            XMLSpy, or the free BaseX GUI. This is perfectly fine for learning.
          </p>

          <div className="success-box">
            <strong>Tip:</strong> For classroom work the easiest path is often:
            write the <code>.xq</code> file in NetBeans → open the same file in BaseX GUI or Oxygen → run it.
          </div>

          <hr />

          <h2>2. Sample XML Document (used in all examples)</h2>

          <p>Save the following as <code>books.xml</code> (place it in the same folder as your query or give a full path).</p>

          <CodeBlock
            language="xml"
            code={`<?xml version="1.0" encoding="UTF-8"?>
<library>
  <book id="B01" category="fiction">
    <title>The Catcher in the Rye</title>
    <author>J.D. Salinger</author>
    <year>1951</year>
    <price>9.99</price>
  </book>
  <book id="B02" category="fiction">
    <title>To Kill a Mockingbird</title>
    <author>Harper Lee</author>
    <year>1960</year>
    <price>12.99</price>
  </book>
  <book id="B03" category="fiction">
    <title>The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <year>1925</year>
    <price>10.99</price>
  </book>
  <book id="B04" category="science">
    <title>A Brief History of Time</title>
    <author>Stephen Hawking</author>
    <year>1988</year>
    <price>15.50</price>
  </book>
  <book id="B05" category="science">
    <title>The Selfish Gene</title>
    <author>Richard Dawkins</author>
    <year>1976</year>
    <price>14.25</price>
  </book>
</library>`}
          />

          <hr />

          <h2>3. Loading XML Documents</h2>

          <h3>3.1 <code>doc()</code> — Load a single document</h3>

          <CodeBlock
            language="xquery"
            code={`(: Load the whole document :)
doc("books.xml")

(: Load and navigate :)
doc("books.xml")/library/book

(: Absolute path example (Windows) :)
doc("C:/data/books.xml")/library/book[@id='B02']/title

(: Absolute path example (Linux / macOS) :)
doc("/home/student/data/books.xml")/library/book[@id='B02']/title`}
          />

          <h3>3.2 <code>collection()</code> — Load multiple documents</h3>

          <p>
            <code>collection()</code> is useful when you have a folder of XML files.
            The exact behaviour depends on the processor, but most engines accept a folder URI.
          </p>

          <CodeBlock
            language="xquery"
            code={`(: Load all XML files from a folder (processor-dependent) :)
collection("file:///C:/data/books/")

(: Then query across all of them :)
collection("file:///C:/data/books/")//book[price > 12]/title`}
          />

          <hr />

          <h2>4. Essential Path Expressions (XPath inside XQuery)</h2>

          <CodeBlock
            language="xquery"
            code={`(: All books :)
doc("books.xml")//book

(: Titles only :)
doc("books.xml")//book/title

(: Book with specific id :)
doc("books.xml")//book[@id='B02']

(: Books more expensive than 12 :)
doc("books.xml")//book[price > 12]

(: Books in the science category :)
doc("books.xml")//book[@category='science']

(: Title and price of fiction books :)
doc("books.xml")//book[@category='fiction']/(title | price)

(: First book :)
doc("books.xml")//book[1]

(: Last book :)
doc("books.xml")//book[last()]

(: Books published after 1970 :)
doc("books.xml")//book[year > 1970]/title`}
          />

          <hr />

          <h2>5. Important Standard Functions</h2>

          <h3>5.1 String Functions</h3>

          <table className="func-table">
            <thead>
              <tr>
                <th>Function</th>
                <th>Example</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>string()</code></td>
                <td><code>string(//book[1]/title)</code></td>
                <td>Returns the string value of a node</td>
              </tr>
              <tr>
                <td><code>concat()</code></td>
                <td><code>concat(title, " - ", author)</code></td>
                <td>Joins strings together</td>
              </tr>
              <tr>
                <td><code>substring()</code></td>
                <td><code>substring(title, 1, 10)</code></td>
                <td>Extracts part of a string</td>
              </tr>
              <tr>
                <td><code>string-length()</code></td>
                <td><code>string-length(title)</code></td>
                <td>Length of a string</td>
              </tr>
              <tr>
                <td><code>upper-case()</code> / <code>lower-case()</code></td>
                <td><code>upper-case(title)</code></td>
                <td>Change case</td>
              </tr>
              <tr>
                <td><code>contains()</code></td>
                <td><code>contains(title, "Time")</code></td>
                <td>Returns true if the string contains the substring</td>
              </tr>
              <tr>
                <td><code>starts-with()</code> / <code>ends-with()</code></td>
                <td><code>starts-with(title, "The")</code></td>
                <td>Prefix / suffix tests</td>
              </tr>
              <tr>
                <td><code>normalize-space()</code></td>
                <td><code>normalize-space(title)</code></td>
                <td>Removes leading/trailing and collapses internal whitespace</td>
              </tr>
              <tr>
                <td><code>replace()</code></td>
                <td><code>replace(title, "The ", "")</code></td>
                <td>Search and replace using regular expressions</td>
              </tr>
              <tr>
                <td><code>tokenize()</code></td>
                <td><code>tokenize(author, "\\s+")</code></td>
                <td>Splits a string into a sequence</td>
              </tr>
            </tbody>
          </table>

          <CodeBlock
            language="xquery"
            code={`(: Practical string examples :)
for $b in doc("books.xml")//book
return concat($b/title, " by ", $b/author)

(: Titles that contain the word "The" :)
doc("books.xml")//book[contains(title, "The")]/title

(: Upper-case all titles :)
for $t in doc("books.xml")//title
return upper-case($t)`}
          />

          <h3>5.2 Numeric & Aggregation Functions</h3>

          <table className="func-table">
            <thead>
              <tr>
                <th>Function</th>
                <th>Example</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>sum()</code></td>
                <td><code>sum(//price)</code></td>
                <td>Sum of values</td>
              </tr>
              <tr>
                <td><code>avg()</code></td>
                <td><code>avg(//price)</code></td>
                <td>Average</td>
              </tr>
              <tr>
                <td><code>min()</code> / <code>max()</code></td>
                <td><code>max(//price)</code></td>
                <td>Minimum / Maximum</td>
              </tr>
              <tr>
                <td><code>count()</code></td>
                <td><code>count(//book)</code></td>
                <td>Number of items</td>
              </tr>
              <tr>
                <td><code>round()</code></td>
                <td><code>round(avg(//price), 2)</code></td>
                <td>Rounding</td>
              </tr>
              <tr>
                <td><code>floor()</code> / <code>ceiling()</code></td>
                <td><code>floor(price)</code></td>
                <td>Rounding down / up</td>
              </tr>
            </tbody>
          </table>

          <CodeBlock
            language="xquery"
            code={`(: Statistics on book prices :)
let $prices := doc("books.xml")//price
return
  <stats>
    <count>{count($prices)}</count>
    <total>{sum($prices)}</total>
    <average>{avg($prices)}</average>
    <cheapest>{min($prices)}</cheapest>
    <most-expensive>{max($prices)}</most-expensive>
  </stats>`}
          />

          <h3>5.3 Sequence & Node Functions</h3>

          <table className="func-table">
            <thead>
              <tr>
                <th>Function</th>
                <th>Example</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>position()</code></td>
                <td><code>//book[position() = 2]</code></td>
                <td>Current position in the sequence</td>
              </tr>
              <tr>
                <td><code>last()</code></td>
                <td><code>//book[last()]</code></td>
                <td>Last item</td>
              </tr>
              <tr>
                <td><code>empty()</code></td>
                <td><code>empty(//book[@id='B99'])</code></td>
                <td>True if the sequence is empty</td>
              </tr>
              <tr>
                <td><code>exists()</code></td>
                <td><code>exists(//book[@id='B02'])</code></td>
                <td>True if the sequence has at least one item</td>
              </tr>
              <tr>
                <td><code>distinct-values()</code></td>
                <td><code>distinct-values(//author)</code></td>
                <td>Removes duplicates</td>
              </tr>
              <tr>
                <td><code>index-of()</code></td>
                <td><code>index-of(//author, "Harper Lee")</code></td>
                <td>Positions of a value</td>
              </tr>
              <tr>
                <td><code>insert-before()</code></td>
                <td><code>insert-before($seq, 2, $new)</code></td>
                <td>Insert items into a sequence</td>
              </tr>
              <tr>
                <td><code>remove()</code></td>
                <td><code>remove($seq, 3)</code></td>
                <td>Remove item at position</td>
              </tr>
              <tr>
                <td><code>subsequence()</code></td>
                <td><code>subsequence(//book, 2, 3)</code></td>
                <td>Extract a part of a sequence</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>6. FLWOR Expressions (the heart of XQuery)</h2>

          <p>
            FLWOR stands for <strong>For – Let – Where – Order by – Return</strong>.
            It is the most powerful and readable way to write complex queries.
          </p>

          <CodeBlock
            language="xquery"
            code={`(: Basic FLWOR :)
for $b in doc("books.xml")//book
where $b/price > 11
order by $b/price descending
return $b/title

(: With let and multiple return values :)
for $b in doc("books.xml")//book
let $t := $b/title
let $p := $b/price
where $b/@category = "fiction"
order by $p
return
  <book>
    <title>{$t}</title>
    <price>{$p}</price>
  </book>

(: Grouping-style example (XQuery 3.0+) :)
for $b in doc("books.xml")//book
group by $cat := $b/@category
return
  <category name="{$cat}">
    <count>{count($b)}</count>
    <titles>{string-join($b/title, ", ")}</titles>
  </category>`}
          />

          <hr />

          <h2>7. Conditional Logic</h2>

          <CodeBlock
            language="xquery"
            code={`(: if-then-else :)
for $b in doc("books.xml")//book
return
  <book id="{$b/@id}">
    <title>{$b/title}</title>
    <price-label>
    {
      if ($b/price > 14) then "Expensive"
      else if ($b/price > 11) then "Moderate"
      else "Cheap"
    }
    </price-label>
  </book>

(: Using typeswitch (less common but powerful) :)
typeswitch ($node)
  case element(book) return "This is a book"
  case element(author) return "This is an author"
  default return "Something else"`}
          />

          <hr />

          <h2>8. Constructing XML Results</h2>

          <CodeBlock
            language="xquery"
            code={`(: Build a completely new XML structure :)
<xml>
  <summary>
    <total-books>{count(doc("books.xml")//book)}</total-books>
    <average-price>{avg(doc("books.xml")//price)}</average-price>
  </summary>
  <expensive-books>
  {
    for $b in doc("books.xml")//book[price > 12]
    return
      <book>
        <title>{$b/title/text()}</title>
        <price>{$b/price/text()}</price>
      </book>
  }
  </expensive-books>
</xml>`}
          />

          <hr />

          <h2>9. Useful Complete Query Examples</h2>

          <h3>Example 1 – Simple filtered list</h3>
          <CodeBlock
            language="xquery"
            code={`xquery version "3.1";

for $b in doc("books.xml")//book
where $b/@category = "science"
order by $b/year
return $b/title`}
          />

          <h3>Example 2 – Formatted report</h3>
          <CodeBlock
            language="xquery"
            code={`xquery version "3.1";

<html>
  <body>
    <h1>Science Books</h1>
    <ul>
    {
      for $b in doc("books.xml")//book[@category='science']
      order by $b/price descending
      return <li>{string($b/title)} — ${string($b/price)}</li>
    }
    </ul>
  </body>
</html>`}
          />

          <h3>Example 3 – Statistics + list</h3>
          <CodeBlock
            language="xquery"
            code={`xquery version "3.1";

let $books := doc("books.xml")//book
return
  <report>
    <summary>
      <total>{count($books)}</total>
      <avg-price>{round(avg($books/price), 2)}</avg-price>
    </summary>
    <books>
    {
      for $b in $books
      order by $b/title
      return
        <book id="{$b/@id}">
          <title>{$b/title/text()}</title>
          <author>{$b/author/text()}</author>
          <price>{$b/price/text()}</price>
        </book>
    }
    </books>
  </report>`}
          />

          <hr />

          <h2>10. Namespaces (quick reminder)</h2>

          <p>When the XML uses namespaces you must declare them or use the wildcard:</p>

          <CodeBlock
            language="xquery"
            code={`(: Wildcard — ignore namespaces :)
doc("books.xml")//*:book/*:title

(: Proper way — declare the namespace :)
declare namespace lib = "http://example.com/library";
doc("books.xml")//lib:book/lib:title`}
          />

          <hr />

          <h2>11. Common Mistakes & Tips for NetBeans / Saxon</h2>

          <ul>
            <li>
              Always start the file with <code>xquery version "3.1";</code> (or "1.0" / "3.0")
              when using a strict processor.
            </li>
            <li>
              File paths in <code>doc()</code> are relative to the location of the query file
              or the working directory of the processor — use full paths if you get
              “document not found” errors.
            </li>
            <li>
              In NetBeans, make sure the file encoding is UTF-8 and the file extension is
              <code>.xq</code> or <code>.xquery</code>.
            </li>
            <li>
              Saxon HE is free and fully supports XQuery 3.1 — perfect for student work.
            </li>
            <li>
              If a function is not recognised, check whether you are using an XQuery 1.0
              processor (some functions require 3.0/3.1).
            </li>
          </ul>

          <hr />

          <h2>Summary</h2>
          <ul>
            <li>This session uses only <strong>standard XQuery</strong> — works in NetBeans + Saxon, Oxygen, XMLSpy, BaseX (standard mode), etc.</li>
            <li><code>doc()</code> loads a single XML file; <code>collection()</code> can load many.</li>
            <li>Path expressions + predicates are the foundation.</li>
            <li>FLWOR expressions give you full control (for, let, where, order by, return).</li>
            <li>String, numeric, and sequence functions are available in every modern processor.</li>
            <li>You can construct completely new XML (or even HTML) as the result.</li>
          </ul>

          <div className="success-box">
            <strong>Next step:</strong> Create a <code>books.xml</code> file and try the
            example queries above in NetBeans (with Saxon) or in the BaseX / Oxygen GUI.
          </div>

        </article>
      </CustomLayout>
    </Layout>
  );
}
