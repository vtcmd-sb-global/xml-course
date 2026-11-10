import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session04() {
  return (
    <Layout
      title="Session 04 — XSLT"
      description="Define XSLT, stylesheets, templates, and transform XML documents into other formats"
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

          <h1>Session 04 — XSLT</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Learn how to transform XML documents into HTML, plain text, or other XML using XSLT stylesheets and templates.</p>
          <p><strong>Based on:</strong> Official Book – Session 4</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Define XSLT and explain its purpose</li>
            <li>Describe the structure of an XSLT stylesheet</li>
            <li>Write and apply templates using <code>xsl:template</code>, <code>xsl:value-of</code>, <code>xsl:for-each</code>, and <code>xsl:if</code></li>
            <li>Transform an XML document into HTML</li>
            <li>Understand the relationship between XPath and XSLT</li>
          </ul>

          <hr />

          <h2>1. Session Overview</h2>
          <p>
            In the previous sessions you learned how to create well-formed and valid XML,
            how parsers build a DOM tree, and how to select nodes with XPath.
            <strong>XSLT</strong> (Extensible Stylesheet Language Transformations) is the language
            that lets you take those selected nodes and turn the XML into another format —
            most commonly HTML for display in a browser, but also plain text, CSV, or another XML dialect.
          </p>

          <hr />

          <h2>2. What is XSLT?</h2>
          <p>
            <strong>XSLT</strong> is a declarative language used to transform XML documents.
            An XSLT stylesheet contains rules (templates) that match nodes in the source XML
            and describe what output should be produced for those nodes.
          </p>
          <p>Key points:</p>
          <ul>
            <li>XSLT is itself written in XML</li>
            <li>It relies heavily on <strong>XPath</strong> to select the nodes to process</li>
            <li>The transformation is performed by an XSLT processor (built into many browsers, .NET, Java, Python, etc.)</li>
            <li>The output can be HTML, XHTML, text, or XML</li>
          </ul>

          <hr />

          <h2>3. Basic Structure of an XSLT Stylesheet</h2>
          <p>Every XSLT stylesheet starts with the following skeleton:</p>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" indent="yes"/>

  <!-- templates go here -->

</xsl:stylesheet>`}
          />

          <h3>3.1 Important Elements</h3>
          <ul>
            <li><code>xsl:stylesheet</code> (or <code>xsl:transform</code>) — the root element</li>
            <li><code>xmlns:xsl</code> — the XSLT namespace (required)</li>
            <li><code>xsl:output</code> — tells the processor what kind of output to produce</li>
            <li><code>xsl:template</code> — defines a rule that matches nodes</li>
          </ul>

          <hr />

          <h2>4. Sample XML Document</h2>
          <p>We will continue with a simple bookstore document:</p>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="bookstore.xsl"?>
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
          <p>
            The processing instruction <code>{'<?xml-stylesheet ... ?>'}</code> tells a browser
            which XSLT file to apply when the XML is opened.
          </p>

          <hr />

          <h2>5. Templates and Matching</h2>

          <h3>5.1 The Root Template</h3>
          <p>Most stylesheets begin with a template that matches the document root:</p>
          <CodeBlock
            language="xml"
            code={`<xsl:template match="/">
  <html>
    <head>
      <title>Bookstore</title>
    </head>
    <body>
      <h1>Our Books</h1>
      <xsl:apply-templates select="bookstore/book"/>
    </body>
  </html>
</xsl:template>`}
          />

          <h3>5.2 Matching Specific Elements</h3>
          <CodeBlock
            language="xml"
            code={`<xsl:template match="book">
  <div class="book">
    <h2><xsl:value-of select="title"/></h2>
    <p>Author: <xsl:value-of select="author"/></p>
    <p>Year: <xsl:value-of select="year"/></p>
    <p>Price: $<xsl:value-of select="price"/></p>
  </div>
</xsl:template>`}
          />

          <hr />

          <h2>6. Common XSLT Elements</h2>

          <h3>6.1 <code>xsl:value-of</code></h3>
          <p>Extracts the string value of a node and writes it to the output.</p>
          <CodeBlock language="xml" code={`<xsl:value-of select="title"/>`} />

          <h3>6.2 <code>xsl:for-each</code></h3>
          <p>Loops over a node-set.</p>
          <CodeBlock
            language="xml"
            code={`<xsl:for-each select="bookstore/book">
  <p><xsl:value-of select="title"/> — <xsl:value-of select="author"/></p>
</xsl:for-each>`}
          />

          <h3>6.3 <code>xsl:if</code></h3>
          <p>Conditional processing (no else clause).</p>
          <CodeBlock
            language="xml"
            code={`<xsl:if test="price &gt; 10">
  <span class="expensive">Premium Price</span>
</xsl:if>`}
          />

          <h3>6.4 <code>xsl:choose</code> / <code>xsl:when</code> / <code>xsl:otherwise</code></h3>
          <p>Multi-way conditional (like switch / if-else if-else).</p>
          <CodeBlock
            language="xml"
            code={`<xsl:choose>
  <xsl:when test="price &gt; 12">
    <span>Expensive</span>
  </xsl:when>
  <xsl:when test="price &gt; 10">
    <span>Moderate</span>
  </xsl:when>
  <xsl:otherwise>
    <span>Affordable</span>
  </xsl:otherwise>
</xsl:choose>`}
          />

          <h3>6.5 <code>xsl:sort</code></h3>
          <p>Sorts the nodes selected by <code>xsl:for-each</code> or <code>xsl:apply-templates</code>.</p>
          <CodeBlock
            language="xml"
            code={`<xsl:for-each select="bookstore/book">
  <xsl:sort select="title" order="ascending"/>
  <p><xsl:value-of select="title"/></p>
</xsl:for-each>`}
          />

          <hr />

          <h2>7. Complete Example — Transform to HTML Table</h2>
          <p>Here is a complete stylesheet that produces a clean HTML table:</p>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Bookstore Catalog</title>
        <style>
          table { border-collapse: collapse; width: 80%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Bookstore Catalog</h1>
        <table>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Price</th>
          </tr>
          <xsl:for-each select="bookstore/book">
            <xsl:sort select="year" data-type="number" order="ascending"/>
            <tr>
              <td><xsl:value-of select="title"/></td>
              <td><xsl:value-of select="author"/></td>
              <td><xsl:value-of select="year"/></td>
              <td>$<xsl:value-of select="price"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>`}
          />

          <hr />

          <h2>8. Applying the Transformation</h2>
          <p>There are several ways to run an XSLT transformation:</p>
          <ul>
            <li><strong>Browser</strong> — open the XML file that contains the <code>xml-stylesheet</code> processing instruction</li>
            <li><strong>Command-line tools</strong> — <code>xsltproc</code>, Saxon, etc.</li>
            <li><strong>Programming languages</strong>
              <ul>
                <li>.NET: <code>XslCompiledTransform</code></li>
                <li>Java: <code>TransformerFactory</code></li>
                <li>Python: <code>lxml.etree</code></li>
                <li>JavaScript (browser or Node): native or libraries such as Saxon-JS</li>
              </ul>
            </li>
          </ul>

          <hr />

          <h2>9. XSLT and XPath Relationship</h2>
          <p>
            Almost every <code>select</code> and <code>match</code> attribute in XSLT is an XPath expression.
            The better you understand XPath (Session 03), the more powerful your stylesheets become.
          </p>

          <hr />

          <h2>Summary</h2>
          <ul>
            <li>XSLT transforms XML into other formats (HTML, text, XML, …).</li>
            <li>Stylesheets are written in XML and use the XSLT namespace.</li>
            <li>Templates match nodes and define the output for those nodes.</li>
            <li>Common elements: <code>xsl:template</code>, <code>xsl:value-of</code>, <code>xsl:for-each</code>, <code>xsl:if</code>, <code>xsl:choose</code>, <code>xsl:sort</code>.</li>
            <li>XPath is used extensively inside XSLT for selecting nodes.</li>
          </ul>

          <hr />

          <h2>Test Your Knowledge</h2>
          <ol>
            <li>What does XSLT stand for and what is its main purpose?</li>
            <li>Why must an XSLT stylesheet declare the XSLT namespace?</li>
            <li>What is the difference between <code>xsl:value-of</code> and <code>xsl:for-each</code>?</li>
            <li>How do you produce HTML output from an XSLT stylesheet?</li>
            <li>Write a template that matches every <code>book</code> element and outputs only its title.</li>
            <li>How can you sort the books by price in descending order?</li>
            <li>True or False: XSLT can only produce HTML.</li>
            <li>What is the relationship between XPath and XSLT?</li>
          </ol>

          <p><em>(Answers will be discussed in class.)</em></p>

          <hr />

          <h2>Try It Yourself</h2>

          <h3>Exercise 1 – Simple Transformation</h3>
          <p>
            Create an XSLT stylesheet that turns the bookstore XML into a plain unordered list
            (<code>&lt;ul&gt;</code>) of book titles.
          </p>

          <h3>Exercise 2 – Conditional Styling</h3>
          <p>
            Extend the table example so that any book with a price greater than 11 is displayed
            with a red background or a special CSS class.
          </p>

          <h3>Exercise 3 – Browser Test</h3>
          <p>
            Place both the XML file (with the stylesheet processing instruction) and the XSL file
            in the same folder. Open the XML file in a modern browser and verify that the
            transformation produces the expected HTML.
          </p>

          <p>
            <strong>Next Session:</strong> JSON
          </p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
