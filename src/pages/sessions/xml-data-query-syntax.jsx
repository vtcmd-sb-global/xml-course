import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function XMLDataQuerySyntax() {
  return (
    <Layout
      title="XML Data Query Syntax"
      description="XQuery / BaseX syntax for querying and adding data in XML databases — complete function reference"
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
          `}</style>

          <h1>XML Data Query Syntax</h1>

          <p>
            This page covers the essential XQuery / BaseX patterns for reading data from files
            or databases and for inserting XML documents into a database. It also includes a
            <strong>complete reference</strong> of the most important BaseX Database Module
            (<code>db:</code>) functions used for XML data work.
          </p>

          <hr />

          <h2>1. Query from a file on disk</h2>

          <p>
            When an XML file is still on the file system and has <strong>not</strong> been stored
            in a BaseX database, use the standard XQuery function <code>doc()</code>.
          </p>

          <p>
            <code>doc()</code> opens a single XML document from a file path or URI and returns
            a document node. You can then apply any XPath / XQuery path expression on it.
          </p>

          <CodeBlock
            language="xquery"
            code={`(: Basic usage — absolute path (Windows example) :)
doc("C:/Users/student/Documents/books.xml")/library/book[@id='B02']/price`}
          />

          <CodeBlock
            language="xquery"
            code={`(: Relative or forward-slash path (recommended) :)
doc("path/to/library.xml")/library/book[@id='B02']/price`}
          />

          <CodeBlock
            language="xquery"
            code={`(: Return the whole document :)
doc("books.xml")

(: Return all book titles :)
doc("books.xml")//book/title

(: Filter by attribute and select a child element :)
doc("books.xml")/library/book[@id='B02']/title`}
          />

          <div className="note-box">
            <strong>Important:</strong>
            <ul style={{ marginBottom: 0 }}>
              <li><code>doc()</code> raises an error if the file does not exist or is not well-formed XML.</li>
              <li>It always returns exactly one document node (or an error).</li>
              <li>Prefer forward slashes (<code>/</code>) even on Windows — BaseX accepts them.</li>
              <li>Once you move the data into a database, switch to <code>db:get()</code> (see next section).</li>
            </ul>
          </div>

          <hr />

          <h2>2. Query from a database</h2>

          <p>
            After a document has been stored in a BaseX database, use <code>db:get()</code>
            instead of <code>doc()</code>. This is the modern and preferred way to read data
            from a BaseX database.
          </p>

          <CodeBlock
            language="xquery"
            code={`(: Get all documents from the database "myDb" :)
db:get("myDb")

(: Get a specific document by path and then query it :)
db:get("myDb", "library.xml")/library/book[@id='B02']/price

(: Short form — if the path is unique you can often omit it :)
db:get("myDb")/library/book[@id='B02']/price`}
          />

          <h3>2.1 Wildcard namespace prefix (<code>*:</code>)</h3>
          <p>
            XML documents frequently use namespaces. When you do not know the exact namespace
            (or you want to ignore it), use the wildcard prefix <code>*:</code>.
          </p>

          <CodeBlock
            language="xquery"
            code={`(: Ignore namespaces completely :)
db:get("myDb")/*:library/*:book[@id='B02']/*:price

(: Deep search + ignore namespaces :)
db:get("myDb")//*:book[@id='B02']/*:price`}
          />

          <h3>2.2 Deep search with <code>//</code></h3>
          <p>
            The double slash <code>//</code> is the descendant-or-self axis. It finds a node
            anywhere in the document, no matter how deeply nested it is.
          </p>

          <CodeBlock
            language="xquery"
            code={`(: Find a book no matter where it is located :)
db:get("myDb")//book[@id='B02']/price

(: Combined with namespace wildcard :)
db:get("myDb")//*:book[@id='B02']/*:price`}
          />

          <div className="important-box">
            <strong>When to use which function?</strong>
            <ul style={{ marginBottom: 0 }}>
              <li><code>doc("file.xml")</code> → file is still on disk</li>
              <li><code>db:get("dbName")</code> → document is already stored in a BaseX database</li>
              <li><code>collection("dbName")</code> → also works, but <code>db:get()</code> is clearer and preferred in modern BaseX code</li>
            </ul>
          </div>

          <hr />

          <h2>3. Add data to an XML database</h2>

          <p>
            To insert a complete XML document into a BaseX database, use <code>db:add()</code>.
            This is an <em>updating function</em> — the change is applied after the query finishes.
          </p>

          <h3>3.1 Add an XML document constructed in the query</h3>

          <CodeBlock
            language="xquery"
            code={`(: Add a complete library document to the database "myDb" :)
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

          <h3>3.2 Add a file from disk</h3>

          <CodeBlock
            language="xquery"
            code={`(: Add an existing XML file into the database :)
db:add("myDb", "C:/data/books.xml", "library.xml")

(: Or with a relative path :)
db:add("myDb", "data/books.xml", "library.xml")`}
          />

          <h3>3.3 Query the data after adding</h3>

          <p>
            Because <code>db:add()</code> is an updating function, you normally cannot query
            the newly added data in the <em>same</em> query. Run a second query:
          </p>

          <CodeBlock
            language="xquery"
            code={`(: After the add has been committed, query the document :)
db:get("myDb")/library/book[@id='B02']/price

(: Or more safely with path :)
db:get("myDb", "library.xml")/library/book[@id='B02']/price`}
          />

          <div className="note-box">
            <strong>Key points about <code>db:add()</code>:</strong>
            <ul style={{ marginBottom: 0 }}>
              <li>It does <strong>not</strong> overwrite an existing resource with the same path. Use <code>db:put()</code> if you need replacement.</li>
              <li>The third argument is the path/name under which the document will be stored inside the database.</li>
              <li>You can add multiple documents in one call by supplying sequences of inputs and paths.</li>
              <li>Requires write permission on the database.</li>
            </ul>
          </div>

          <hr />

          <h2>4. Normal queries (document already stored)</h2>

          <p>
            Once a document is stored in the database (for example as <code>library.xml</code>),
            you can query it with ordinary XPath / XQuery path expressions. There are two common styles:
          </p>

          <h3>4.1 Explicit database access (recommended)</h3>

          <CodeBlock
            language="xquery"
            code={`(: Always clear and portable :)
db:get("myDb")/library/book[@id='B02']/price

db:get("myDb", "library.xml")//book[price > 10]/title`}
          />

          <h3>4.2 Context-based queries (when a database is opened)</h3>

          <p>
            If a database has been opened in the global context (for example with the
            <code>OPEN</code> command or in the BaseX GUI), you can use path expressions
            without <code>db:get()</code>:
          </p>

          <CodeBlock
            language="xquery"
            code={`(: Absolute path from the root of the opened database :)
/library/book[@id='B02']/price

(: Deep search anywhere in the opened database :)
//book[@id='B02']/price

(: Filter and project :)
//book[price > 10]/title`}
          />

          <div className="important-box">
            <strong>Best practice:</strong> Prefer the explicit form
            <code>db:get("dbName")/...</code>. It works even when no database is currently
            open and makes the query self-contained and easier to understand.
          </div>

          <hr />

          {/* ============================================================
              COMPLETE LIST OF XML DATA FUNCTIONS
              ============================================================ */}

          <h2>5. Complete List of XML Data Functions (BaseX Database Module)</h2>

          <p>
            All functions below belong to the BaseX <strong>Database Module</strong>
            (namespace <code>http://basex.org/modules/db</code>, prefix <code>db</code>).
            The prefix is statically bound, so you do not need to declare it.
          </p>

          <div className="important-box">
            <strong>Important:</strong> Many functions in this module are <em>updating functions</em>.
            They are not executed immediately — they are added to the Pending Update List and applied
            after the rest of the query finishes. This means the order you write them in the query
            often does <em>not</em> match the final execution order.
          </div>

          <h3>5.1 Standard XQuery Functions for XML Documents</h3>
          <p>These are part of the standard XQuery function library (prefix <code>fn</code> — usually omitted).</p>

          <table className="func-table">
            <thead>
              <tr>
                <th>Function</th>
                <th>Signature / Example</th>
                <th>Explanation & Important Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>doc()</code></td>
                <td><code>doc($uri as xs:string?) as document-node()?</code></td>
                <td>
                  Opens a single XML document from a file path or URI.<br />
                  Raises an error if zero or more than one document is found.<br />
                  <strong>Use when:</strong> the file is still on disk and not stored in a database.
                </td>
              </tr>
              <tr>
                <td><code>collection()</code></td>
                <td><code>collection($uri as xs:string?) as document-node()*</code></td>
                <td>
                  Returns all documents in a collection (directory or database path).<br />
                  If a database is opened in the global context and no argument is given,
                  all documents of that database are returned.
                </td>
              </tr>
              <tr>
                <td><code>parse-xml()</code></td>
                <td><code>parse-xml($string as xs:string) as document-node()</code></td>
                <td>
                  Parses a string containing XML into a document node.<br />
                  Useful when you receive XML as text (e.g. from an API or file:read-text).
                </td>
              </tr>
              <tr>
                <td><code>parse-xml-fragment()</code></td>
                <td><code>parse-xml-fragment($string as xs:string) as document-node()</code></td>
                <td>
                  Parses an XML fragment (no single root element required) into a document node.
                </td>
              </tr>
            </tbody>
          </table>

          <h3>5.2 General Database Functions</h3>

          <table className="func-table">
            <thead>
              <tr>
                <th>Function</th>
                <th>Signature</th>
                <th>Explanation & Important Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>db:system()</code></td>
                <td><code>db:system() as element(system)</code></td>
                <td>
                  Returns general information about the database system and current option values.
                  Similar to the <code>INFO</code> command.
                </td>
              </tr>
              <tr>
                <td><code>db:info()</code></td>
                <td><code>db:info($db as xs:string) as element(database)</code></td>
                <td>
                  Returns meta information about a specific database (size, number of documents,
                  indexes, etc.). Similar to <code>INFO DB</code>.
                </td>
              </tr>
              <tr>
                <td><code>db:list()</code></td>
                <td>
                  <code>db:list() as xs:string*</code><br />
                  <code>db:list($db as xs:string) as xs:string*</code><br />
                  <code>db:list($db, $path) as xs:string*</code>
                </td>
                <td>
                  Without arguments → names of all accessible databases.<br />
                  With database name → list of resource paths inside that database.<br />
                  Optional path argument further filters the results.
                </td>
              </tr>
              <tr>
                <td><code>db:list-details()</code></td>
                <td>
                  <code>db:list-details() as element()*</code><br />
                  <code>db:list-details($db) as element()*</code>
                </td>
                <td>
                  Same as <code>db:list</code> but returns rich XML elements containing size,
                  modification date, content-type and other metadata.
                </td>
              </tr>
              <tr>
                <td><code>db:exists()</code></td>
                <td><code>db:exists($db as xs:string, $path as xs:string := ()) as xs:boolean</code></td>
                <td>
                  Returns <code>true</code> if the database exists, or if a resource exists at the
                  given path inside the database.
                </td>
              </tr>
              <tr>
                <td><code>db:type()</code></td>
                <td><code>db:type($db as xs:string, $path as xs:string) as xs:string</code></td>
                <td>
                  Returns the type of a resource: <code>"xml"</code>, <code>"binary"</code> or
                  <code>"value"</code>.
                </td>
              </tr>
              <tr>
                <td><code>db:property()</code></td>
                <td><code>db:property($db as xs:string, $key as xs:string) as item()</code></td>
                <td>
                  Returns a single property of a database (e.g. <code>size</code>, <code>textindex</code>,
                  <code>uptodate</code>).
                </td>
              </tr>
            </tbody>
          </table>

          <h3>5.3 Read / Query Functions</h3>

          <table className="func-table">
            <thead>
              <tr>
                <th>Function</th>
                <th>Signature</th>
                <th>Explanation & Important Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>db:get()</code></td>
                <td>
                  <code>db:get($db as xs:string) as document-node()*</code><br />
                  <code>db:get($db, $path) as document-node()*</code>
                </td>
                <td>
                  <strong>Most important read function.</strong><br />
                  Returns all documents (or documents matching a path) from a database.<br />
                  Preferred modern replacement for the older <code>db:open()</code>.
                </td>
              </tr>
              <tr>
                <td><code>db:get-pre()</code></td>
                <td><code>db:get-pre($db as xs:string, $pre as xs:integer*) as node()*</code></td>
                <td>
                  Returns nodes by their internal PRE value (very fast access).<br />
                  PRE values change when nodes are inserted or deleted before them — use with care.
                </td>
              </tr>
              <tr>
                <td><code>db:get-id()</code></td>
                <td><code>db:get-id($db as xs:string, $id as xs:integer*) as node()*</code></td>
                <td>
                  Returns nodes by their persistent ID value. IDs remain stable until the database
                  is fully rebuilt with <code>OPTIMIZE ALL</code>.
                </td>
              </tr>
              <tr>
                <td><code>db:get-binary()</code></td>
                <td><code>db:get-binary($db as xs:string, $path as xs:string) as xs:base64Binary</code></td>
                <td>
                  Retrieves a binary resource (image, PDF, etc.) stored in the database.
                </td>
              </tr>
              <tr>
                <td><code>db:name()</code></td>
                <td><code>db:name($node as node()) as xs:string</code></td>
                <td>
                  Returns the name of the database that contains the given compact (database) node.
                </td>
              </tr>
              <tr>
                <td><code>db:path()</code></td>
                <td><code>db:path($node as node()) as xs:string</code></td>
                <td>
                  Returns the path of the document inside the database that contains the given node.
                </td>
              </tr>
            </tbody>
          </table>

          <h3>5.4 Value Index Functions (Fast Lookups)</h3>
          <p>
            These functions use the text / attribute indexes for high-performance searches.
            An error is raised if the required index does not exist.
          </p>

          <table className="func-table">
            <thead>
              <tr>
                <th>Function</th>
                <th>Signature</th>
                <th>Explanation & Important Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>db:text()</code></td>
                <td><code>db:text($db as xs:string, $values as xs:string*) as text()*</code></td>
                <td>
                  Returns all text nodes whose string value matches one of the given values
                  (uses the text index).
                </td>
              </tr>
              <tr>
                <td><code>db:text-range()</code></td>
                <td><code>db:text-range($db, $min, $max) as text()*</code></td>
                <td>
                  Returns text nodes whose values lie between <code>$min</code> and <code>$max</code>
                  (inclusive).
                </td>
              </tr>
              <tr>
                <td><code>db:attribute()</code></td>
                <td>
                  <code>db:attribute($db, $values) as attribute()*</code><br />
                  <code>db:attribute($db, $values, $name) as attribute()*</code>
                </td>
                <td>
                  Returns attribute nodes matching the given values. Optional third argument
                  filters by attribute name.
                </td>
              </tr>
              <tr>
                <td><code>db:attribute-range()</code></td>
                <td><code>db:attribute-range($db, $min, $max, $name?) as attribute()*</code></td>
                <td>
                  Range search on attribute values (optionally restricted to a specific attribute name).
                </td>
              </tr>
              <tr>
                <td><code>db:token()</code></td>
                <td><code>db:token($db, $tokens, $name?) as attribute()*</code></td>
                <td>
                  Finds attributes whose values contain any of the given tokens
                  (tokenized search).
                </td>
              </tr>
            </tbody>
          </table>

          <h3>5.5 Update Functions (Writing Data)</h3>

          <div className="note-box">
            <strong>Note:</strong> All functions in this section are <em>updating</em>.
            They require write (or admin) permissions and are executed after the rest of the query.
          </div>

          <table className="func-table">
            <thead>
              <tr>
                <th>Function</th>
                <th>Signature</th>
                <th>Explanation & Important Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>db:create()</code></td>
                <td>
                  <code>db:create($name as xs:string)</code><br />
                  <code>db:create($name, $inputs)</code><br />
                  <code>db:create($name, $inputs, $paths)</code><br />
                  <code>db:create($name, $inputs, $paths, $options)</code>
                </td>
                <td>
                  Creates a new database (overwrites if it already exists) and optionally adds
                  initial content. Requires admin permission when reading from the file system.
                </td>
              </tr>
              <tr>
                <td><code>db:add()</code></td>
                <td>
                  <code>db:add($db, $input)</code><br />
                  <code>db:add($db, $input, $path)</code><br />
                  <code>db:add($db, $inputs, $paths, $options)</code>
                </td>
                <td>
                  <strong>Most common way to insert new documents.</strong><br />
                  Adds one or more documents / resources to an existing database.
                  Does <em>not</em> overwrite existing resources with the same path
                  (use <code>db:put</code> for replacement).
                </td>
              </tr>
              <tr>
                <td><code>db:put()</code></td>
                <td><code>db:put($db, $input, $path, $options?) as empty-sequence()</code></td>
                <td>
                  Replaces the resource at the given path, or adds it if it does not exist.
                  Modern replacement for the older <code>db:replace()</code>.
                </td>
              </tr>
              <tr>
                <td><code>db:put-binary()</code></td>
                <td><code>db:put-binary($db, $input, $path) as empty-sequence()</code></td>
                <td>
                  Stores a binary resource (image, video, PDF, etc.) at the specified path.
                </td>
              </tr>
              <tr>
                <td><code>db:put-value()</code></td>
                <td><code>db:put-value($db, $input, $path) as empty-sequence()</code></td>
                <td>
                  Stores an arbitrary XQuery value (sequence, map, array, etc.) as a
                  value resource — useful for caching intermediate results.
                </td>
              </tr>
              <tr>
                <td><code>db:delete()</code></td>
                <td><code>db:delete($db as xs:string, $path as xs:string) as empty-sequence()</code></td>
                <td>
                  Deletes the resource(s) at the given path (can be a single document or a directory).
                </td>
              </tr>
              <tr>
                <td><code>db:rename()</code></td>
                <td><code>db:rename($db, $source, $target) as empty-sequence()</code></td>
                <td>
                  Moves / renames resources from <code>$source</code> path to <code>$target</code> path.
                </td>
              </tr>
              <tr>
                <td><code>db:optimize()</code></td>
                <td>
                  <code>db:optimize($db)</code><br />
                  <code>db:optimize($db, $all as xs:boolean)</code><br />
                  <code>db:optimize($db, $all, $options)</code>
                </td>
                <td>
                  Rebuilds indexes and optimizes database structures.
                  Pass <code>true()</code> as second argument to rebuild everything
                  (equivalent to <code>OPTIMIZE ALL</code>).
                </td>
              </tr>
              <tr>
                <td><code>db:flush()</code></td>
                <td><code>db:flush($db as xs:string) as empty-sequence()</code></td>
                <td>
                  Explicitly flushes write buffers to disk. Only needed when
                  <code>AUTOFLUSH</code> is turned off.
                </td>
              </tr>
              <tr>
                <td><code>db:drop()</code></td>
                <td><code>db:drop($db as xs:string) as empty-sequence()</code></td>
                <td>
                  Completely removes a database and all its resources. Requires admin permission.
                </td>
              </tr>
              <tr>
                <td><code>db:copy()</code></td>
                <td><code>db:copy($db, $newname) as empty-sequence()</code></td>
                <td>Creates a full copy of a database under a new name.</td>
              </tr>
              <tr>
                <td><code>db:alter()</code></td>
                <td><code>db:alter($db, $newname) as empty-sequence()</code></td>
                <td>Renames an existing database.</td>
              </tr>
            </tbody>
          </table>

          <h3>5.6 Backup Functions</h3>

          <table className="func-table">
            <thead>
              <tr>
                <th>Function</th>
                <th>Signature</th>
                <th>Explanation & Important Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>db:create-backup()</code></td>
                <td><code>db:create-backup($db as xs:string?, $options?) as empty-sequence()</code></td>
                <td>
                  Creates a backup of the given database (or of general data if no name is supplied).
                  Optional map can contain <code>comment</code> and <code>compress</code>.
                </td>
              </tr>
              <tr>
                <td><code>db:restore()</code></td>
                <td><code>db:restore($name as xs:string?) as empty-sequence()</code></td>
                <td>
                  Restores a database from a backup. The name may include a timestamp to select
                  a specific backup file.
                </td>
              </tr>
              <tr>
                <td><code>db:drop-backup()</code></td>
                <td><code>db:drop-backup($name as xs:string?) as empty-sequence()</code></td>
                <td>Deletes one or more backup files.</td>
              </tr>
              <tr>
                <td><code>db:backups()</code></td>
                <td><code>db:backups($db as xs:string := ()) as element(backup)*</code></td>
                <td>
                  Lists available backups (most recent first) with timestamp, size and comment.
                </td>
              </tr>
              <tr>
                <td><code>db:alter-backup()</code></td>
                <td><code>db:alter-backup($name, $newname) as empty-sequence()</code></td>
                <td>Renames backup files.</td>
              </tr>
            </tbody>
          </table>

          <h3>5.7 Export</h3>

          <table className="func-table">
            <thead>
              <tr>
                <th>Function</th>
                <th>Signature</th>
                <th>Explanation & Important Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>db:export()</code></td>
                <td><code>db:export($db, $path, $options?) as empty-sequence()</code></td>
                <td>
                  Exports the entire database (or selected documents) to the file system.
                  Serialization options can be supplied. Requires admin permission.
                </td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>6. Quick Reference — Most Used Patterns</h2>

          <CodeBlock
            language="xquery"
            code={`(: 1. Read from file on disk :)
doc("books.xml")//book[price > 10]/title

(: 2. Read from database :)
db:get("myDb")//book[@id = 'B02']/title

(: 3. Create a new database and add documents :)
db:create("myDb", "path/to/books.xml")

(: 4. Add a new document to an existing database :)
db:add("myDb", <book id="B99"><title>New Book</title></book>, "newbook.xml")

(: 5. Replace an existing document :)
db:put("myDb", <book id="B02"><title>Updated</title></book>, "library.xml")

(: 6. Delete a document :)
db:delete("myDb", "oldbook.xml")

(: 7. List all databases :)
db:list()

(: 8. List all resources inside a database :)
db:list("myDb")

(: 9. Check if a database / resource exists :)
db:exists("myDb", "library.xml")

(: 10. Optimize indexes after many updates :)
db:optimize("myDb", true())`}
          />

          <hr />

          <h2>7. Important Notes & Best Practices</h2>

          <ul>
            <li>
              <strong>Updating functions</strong> (<code>db:add</code>, <code>db:put</code>,
              <code>db:delete</code>, <code>db:create</code>, etc.) are queued and applied only
              after the query finishes. You cannot query the new data in the same query that
              performs the update.
            </li>
            <li>
              Prefer <code>db:get()</code> over the older <code>db:open()</code> (the latter is
              still supported for compatibility).
            </li>
            <li>
              Use <code>*:</code> (wildcard namespace) when you are unsure about namespaces or
              when documents mix default and prefixed namespaces.
            </li>
            <li>
              Use <code>//</code> for deep searches when the exact path is unknown or may vary.
            </li>
            <li>
              After many insert/delete operations, run <code>db:optimize("dbName", true())</code>
              to keep indexes efficient.
            </li>
            <li>
              Binary resources and value resources are stored separately from XML documents;
              use <code>db:type()</code> to distinguish them.
            </li>
            <li>
              Always check permissions: many write operations require <code>write</code> or
              <code>admin</code> rights.
            </li>
          </ul>

          <hr />

          <h2>Summary</h2>
          <ul>
            <li><code>doc("path")</code> / <code>collection()</code> — read XML from disk</li>
            <li><code>db:get("dbName")</code> — read documents already stored in a BaseX database</li>
            <li><code>db:add()</code> — insert new documents (does not overwrite)</li>
            <li><code>db:put()</code> — insert or replace a document</li>
            <li><code>db:delete()</code> — remove resources</li>
            <li><code>db:create()</code> — create a new database</li>
            <li><code>db:list()</code> / <code>db:exists()</code> — discover databases and resources</li>
            <li><code>db:text()</code> / <code>db:attribute()</code> — fast index-based lookups</li>
            <li><code>*:</code> — ignore namespaces &nbsp;|&nbsp; <code>//</code> — deep search</li>
            <li>Remember: updating functions are applied after the query ends</li>
          </ul>

        </article>
      </CustomLayout>
    </Layout>
  );
}
