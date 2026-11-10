import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function XMLDataQuerySyntax() {
  return (
    <Layout
      title="XML Data Query Syntax"
      description="XQuery / BaseX syntax for querying and adding data in XML databases"
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

          <h1>XML Data Query Syntax</h1>

          <p>
            This page covers common XQuery / BaseX patterns for reading data from files or
            databases and for inserting XML documents into a database.
          </p>

          <hr />

          <h2>1. Query from a file on disk</h2>
          <p>
            Use <code>doc()</code> when the XML file is not yet stored in a database.
          </p>

          <CodeBlock
            language="xquery"
            code={`(: Verify the file contents manually :)
doc("C:/Users/student/Documents/books.xml")/library/book[@id='B02']/price`}
          />

          <CodeBlock
            language="xquery"
            code={`(: Get from document file — use when file data is not saved in a database :)
doc("path/to/library.xml")/library/book[@id='B02']/price`}
          />

          <hr />

          <h2>2. Query from a database</h2>
          <p>
            Use <code>db:get()</code> when the document is already stored in a BaseX database.
          </p>

          <CodeBlock
            language="xquery"
            code={`(: Get from database (specify database using db:get() if path is not known) :)
db:get("myDb")/library/book[@id='B02']/price`}
          />

          <h3>Wildcard namespace prefix</h3>
          <p>
            Use the <code>*:</code> prefix when the namespace (or lack of one) is unknown or
            you want to ignore it.
          </p>

          <CodeBlock
            language="xquery"
            code={`(: Wildcard prefix (*:) for path bypass when node path is not known or unspecified :)
db:get("myDb")/*:library/*:book[@id='B02']/*:price`}
          />

          <h3>Deep search with <code>//</code></h3>
          <p>
            Use <code>//</code> to find a node anywhere in the document, regardless of the
            intermediate path.
          </p>

          <CodeBlock
            language="xquery"
            code={`(: Deep search using // for path bypass when node path is not known or unspecified :)
db:get("myDb")//*:book[@id='B02']/*:price`}
          />

          <hr />

          <h2>3. Add data to an XML database</h2>
          <p>
            Use <code>db:add()</code> to insert a complete XML document into a database.
          </p>

          <CodeBlock
            language="xquery"
            code={`(: XML data query syntax for adding data in an XML database :)
db:add("myDb",
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
  </library>,
  "library.xml"
)`}
          />

          <p>After adding the document you can query it normally:</p>

          <CodeBlock
            language="xquery"
            code={`db:get("myDb")/library/book[@id='B02']/price`}
          />

          <hr />

          <h2>4. Normal queries (document already stored)</h2>
          <p>
            Once the document (e.g. <code>books.xml</code>) has been stored in the database as
            <code>library.xml</code>, you can use ordinary path expressions.
          </p>

          <CodeBlock
            language="xquery"
            code={`/library/book[@id='B02']/price`}
          />

          <CodeBlock
            language="xquery"
            code={`//book[@id='B02']/price`}
          />

          <hr />

          <h2>Summary</h2>
          <ul>
            <li><code>doc("path")</code> — read an XML file from disk</li>
            <li><code>db:get("dbName")</code> — read a document already stored in a BaseX database</li>
            <li><code>*:</code> — ignore namespaces</li>
            <li><code>//</code> — deep (descendant-or-self) search</li>
            <li><code>db:add("dbName", $xml, "docName.xml")</code> — insert a document into a database</li>
          </ul>
        </article>
      </CustomLayout>
    </Layout>
  );
}
