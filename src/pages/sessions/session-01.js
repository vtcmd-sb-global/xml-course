import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session01() {
  return (
    <Layout
      title="Session 01 — XML and XML Validations"
      description="Define XML, its features, attributes, comments, trees, validations, and work with DTDs"
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

          <h1>Session 01 — XML and XML Validations</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Understand XML, its structure, features, attributes, comments, trees, and how to validate XML documents using DTDs.</p>
          <p><strong>Based on:</strong> Official Book – Session 1</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Define XML and explain its core features and real-world uses</li>
            <li>Illustrate XML elements, attributes, comments, entities, and the tree structure</li>
            <li>Distinguish between well-formed and valid XML documents</li>
            <li>Explain Document Type Definitions (DTDs), their types, content models, attribute lists, and entities</li>
            <li>Create both internal and external DTDs and validate XML documents against them</li>
          </ul>

          <hr />

          <h2>1. Session Overview</h2>
          <p>
            This session introduces <strong>Extensible Markup Language (XML)</strong> — a flexible, widely used
            format for storing and transporting structured data. You will learn the complete structure of an XML
            document, how to make it well-formed and valid, and how <strong>Document Type Definitions (DTDs)</strong>
            enforce structure, order, and data rules.
          </p>
          <p>
            XML is still heavily used in enterprise systems, configuration files, SOAP web services,
            document formats (Office Open XML, SVG, RSS/Atom), and data interchange scenarios where
            strict structure and long-term readability matter.
          </p>

          <hr />

          <h2>2. What is XML?</h2>
          <p>
            <strong>EXtensible Markup Language (XML)</strong> is a markup language designed for storing
            and transporting data. It is both human-readable and machine-readable. Unlike HTML (which has
            a fixed set of tags), XML lets <em>you</em> invent the tags that best describe your data.
          </p>

          <h3>2.1 Key Ideas</h3>
          <ul>
            <li>XML is a <strong>metalanguage</strong> — a language for creating other languages (vocabularies).</li>
            <li>It focuses on <strong>data structure and meaning</strong>, not presentation.</li>
            <li>It provides a uniform way to represent and exchange data across platforms and languages.</li>
          </ul>

          <h3>2.2 Languages and Platforms that Work with XML</h3>
          <ul>
            <li><strong>Java</strong> — JAXB, DOM, SAX, StAX</li>
            <li><strong>C# / .NET</strong> — System.Xml, XmlDocument, LINQ to XML, XmlSerializer</li>
            <li><strong>Python</strong> — xml.etree.ElementTree, lxml, xmltodict</li>
            <li><strong>JavaScript</strong> — DOMParser, XMLSerializer, libraries such as xml2js</li>
            <li><strong>PHP</strong> — SimpleXML, DOMDocument</li>
            <li>Many other languages and tools (Ruby, Perl, Go, Rust, etc.)</li>
          </ul>

          <h3>2.3 Real-World Examples of XML</h3>
          <ul>
            <li>Configuration files (web.config, AndroidManifest.xml, Maven pom.xml)</li>
            <li>Office documents (docx, xlsx are ZIP packages containing XML)</li>
            <li>RSS and Atom feeds</li>
            <li>SVG graphics</li>
            <li>SOAP web services and many enterprise APIs</li>
            <li>Android layouts and resources</li>
          </ul>

          <hr />

          <h2>3. XML Document Structure</h2>
          <p>A typical XML document has two main parts:</p>
          <ol>
            <li><strong>Document Prolog</strong> — metadata about the document (optional but recommended)</li>
            <li><strong>Root Element</strong> — the single top-level element that contains everything else</li>
          </ol>

          <h3>3.1 Document Prolog</h3>
          <p>The prolog can contain:</p>
          <ul>
            <li><strong>XML Declaration</strong> — version and character encoding (strongly recommended)</li>
            <li><strong>Document Type Declaration (DOCTYPE)</strong> — used when working with a DTD</li>
            <li><strong>Processing Instructions</strong> — e.g. stylesheet association</li>
            <li><strong>Comments</strong></li>
          </ul>

          <p>A minimal XML declaration looks like this:</p>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0" encoding="UTF-8"?>`}
          />

          <p>
            <code>version="1.0"</code> is the most common value. <code>encoding="UTF-8"</code> is the modern default
            and should be preferred over older encodings such as <code>iso-8859-1</code>.
          </p>

          <h3>3.2 Complete Example (from the book style)</h3>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE Music_Library [
  <!ELEMENT Music_Library (Title, Artist, Country, Price, Year)>
  <!ELEMENT Title (#PCDATA)>
  <!ELEMENT Artist (#PCDATA)>
  <!ELEMENT Country (#PCDATA)>
  <!ELEMENT Price (#PCDATA)>
  <!ELEMENT Year (#PCDATA)>
  <!ENTITY MS "That's life">
]>
<Music_Library>
  <Title>YLU</Title>
  <Artist>&MS; - Jenny Dan</Artist>
  <Country>Germany</Country>
  <Price>$12</Price>
  <Year>2002</Year>
</Music_Library>`}
          />

          <p>
            The parser first reads the prolog to learn the version, encoding, and any DTD rules.
            Then it processes the root element and everything nested inside it.
          </p>

          <hr />

          <h2>4. XML Features</h2>
          <ul>
            <li><strong>Self-describing</strong> — the tags themselves describe the data they contain</li>
            <li><strong>Extensible</strong> — you invent your own vocabulary of tags</li>
            <li><strong>Platform and language independent</strong> — pure text, works everywhere</li>
            <li><strong>Hierarchical (tree) structure</strong> — perfect for nested data</li>
            <li><strong>Supports validation</strong> — DTD or XML Schema (XSD) can enforce rules</li>
            <li><strong>Human and machine readable</strong></li>
            <li><strong>Unicode support</strong> — can represent almost any character set</li>
            <li><strong>Separation of data and presentation</strong> — style can be applied later with CSS or XSLT</li>
          </ul>

          <hr />

          <h2>5. XML Elements, Attributes, Comments, Entities and Trees</h2>

          <h3>5.1 Elements</h3>
          <p>
            Elements are the fundamental building blocks of XML. An element consists of a start tag,
            optional content, and an end tag. Content can be text, other elements, or a mixture of both.
          </p>
          <CodeBlock language="xml" code={`<Title>YLU</Title>`} />

          <p>Empty elements can be written in two equivalent ways:</p>
          <CodeBlock
            language="xml"
            code={`<br></br>
<br />`}
          />

          <p><strong>Important rules for element names:</strong></p>
          <ul>
            <li>Can contain letters, digits, hyphens, underscores, and periods</li>
            <li>Must start with a letter or underscore</li>
            <li>Cannot start with the letters “xml” (in any case combination)</li>
            <li>Cannot contain spaces</li>
            <li>XML is <strong>case-sensitive</strong> — <code>{'<Book>'}</code> and <code>{'<book>'}</code> are different</li>
          </ul>

          <h3>5.2 Attributes</h3>
          <p>Attributes provide additional information about an element. They appear inside the start tag.</p>
          <CodeBlock
            language="xml"
            code={`<book id="101" category="fiction" available="true">
  <title>The Great Adventure</title>
</book>`}
          />

          <p><strong>Rules for attributes:</strong></p>
          <ul>
            <li>Attribute values <strong>must</strong> be enclosed in quotes (single or double)</li>
            <li>An element can have multiple attributes</li>
            <li>Attribute names follow the same naming rules as element names</li>
            <li>You cannot have two attributes with the same name on one element</li>
            <li>Order of attributes is not significant</li>
          </ul>

          <p><strong>When to use an attribute vs a child element?</strong></p>
          <ul>
            <li>Use an <strong>attribute</strong> for simple, atomic metadata (id, type, language, status)</li>
            <li>Use a <strong>child element</strong> when the value itself may contain structure or needs further markup</li>
          </ul>

          <h3>5.3 Comments</h3>
          <p>Comments are ignored by the parser and are useful for documentation.</p>
          <CodeBlock language="xml" code={`<!-- This is a comment. It is ignored by the parser. -->`} />

          <p><strong>Restrictions:</strong></p>
          <ul>
            <li>Comments cannot appear inside tags</li>
            <li>The sequence <code>--</code> (double hyphen) is not allowed inside a comment</li>
            <li>Comments cannot be nested</li>
          </ul>

          <h3>5.4 Character Data and Entities</h3>
          <p>
            Certain characters have special meaning in XML and must be escaped when they appear as data:
          </p>
          <ul>
            <li><code>{'<'}</code> → <code>&lt;</code></li>
            <li><code>{'>'}</code> → <code>&gt;</code></li>
            <li><code>{'&'}</code> → <code>&amp;</code></li>
            <li><code>{ "'" }</code> → <code>'</code> (useful inside single-quoted attributes)</li>
            <li><code>{ '"' }</code> → <code>"</code> (useful inside double-quoted attributes)</li>
          </ul>

          <p>You can also define your own entities in a DTD (see section 7.5).</p>

          <h3>5.5 XML as a Tree</h3>
          <p>
            Every well-formed XML document forms a <strong>tree</strong> with exactly one root element.
            Elements nest inside other elements, creating parent–child and sibling relationships.
            This hierarchical model is the foundation for XPath navigation and XSLT transformations.
          </p>

          <p>Example tree for a small library document:</p>
          <CodeBlock
            language="text"
            code={`library
├── book (id="B01")
│   ├── title
│   ├── author
│   └── price
├── book (id="B02")
│   ├── title
│   ├── author
│   └── price
└── book (id="B03")
    ├── title
    ├── author
    └── price`}
          />

          <hr />

          <h2>6. Well-Formed vs Valid XML</h2>

          <h3>6.1 Well-Formed XML</h3>
          <p>
            A document is <strong>well-formed</strong> when it obeys the fundamental syntax rules of XML.
            Every XML processor must reject a document that is not well-formed.
          </p>
          <ul>
            <li>There is exactly <strong>one root element</strong></li>
            <li>All tags are properly nested (no overlapping)</li>
            <li>Every start tag has a matching end tag (or is a self-closing empty element)</li>
            <li>Attribute values are quoted</li>
            <li>Special characters (<code>{'<'}</code>, <code>{'&'}</code>, etc.) are properly escaped</li>
            <li>Element and attribute names follow the naming rules</li>
            <li>Case is consistent (XML is case-sensitive)</li>
          </ul>

          <p><strong>Example of a non-well-formed document (overlapping tags):</strong></p>
          <CodeBlock
            language="xml"
            code={`<!-- WRONG – tags overlap -->
<book>
  <title>XML Guide
  <author>John Doe</title></author>
</book>`}
          />

          <h3>6.2 Valid XML</h3>
          <p>
            A document is <strong>valid</strong> when it is well-formed <em>and</em> also conforms to the rules
            defined in a DTD or an XML Schema. Validation checks that the structure, element order,
            required/optional elements, and allowed attributes match the expected design.
          </p>

          <p>
            <strong>Remember:</strong> Every valid document is well-formed, but a well-formed document
            is not necessarily valid.
          </p>

          <hr />

          <h2>7. Document Type Definition (DTD)</h2>
          <p>
            A <strong>DTD</strong> defines the legal building blocks of an XML document:
            which elements are allowed, in what order, whether they are required or optional,
            what attributes they may have, and any entities that can be used.
          </p>

          <h3>7.1 Types of DTD</h3>
          <ul>
            <li>
              <strong>Internal DTD</strong> — the rules are written inside the XML file itself,
              between square brackets after the DOCTYPE declaration.
            </li>
            <li>
              <strong>External DTD</strong> — the rules live in a separate <code>.dtd</code> file.
              The XML document only contains a reference to that file.
            </li>
          </ul>

          <h3>7.2 Internal DTD Example</h3>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE library [
  <!ELEMENT library (book+)>
  <!ELEMENT book (title, author, year, price)>
  <!ATTLIST book id ID #REQUIRED>
  <!ELEMENT title (#PCDATA)>
  <!ELEMENT author (#PCDATA)>
  <!ELEMENT year (#PCDATA)>
  <!ELEMENT price (#PCDATA)>
]>
<library>
  <book id="B01">
    <title>The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <year>1925</year>
    <price>10.99</price>
  </book>
</library>`}
          />

          <h3>7.3 External DTD Example</h3>
          <p>In the XML file:</p>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE library SYSTEM "library.dtd">
<library>
  <book id="B01">
    <title>The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <year>1925</year>
    <price>10.99</price>
  </book>
</library>`}
          />

          <p>In the separate file <code>library.dtd</code>:</p>
          <CodeBlock
            language="xml"
            code={`<!ELEMENT library (book+)>
<!ELEMENT book (title, author, year, price)>
<!ATTLIST book id ID #REQUIRED>
<!ELEMENT title (#PCDATA)>
<!ELEMENT author (#PCDATA)>
<!ELEMENT year (#PCDATA)>
<!ELEMENT price (#PCDATA)>`}
          />

          <p>
            You can also use a public identifier with <code>PUBLIC</code> instead of <code>SYSTEM</code>
            when the DTD is a well-known standard (rare in classroom examples).
          </p>

          <h3>7.4 Element Declarations and Content Models</h3>
          <p>The general form is:</p>
          <CodeBlock language="xml" code={`<!ELEMENT element-name (content-model)>`} />

          <p>Common content models:</p>
          <ul>
            <li><code>#PCDATA</code> — parsed character data (text only)</li>
            <li><code>EMPTY</code> — the element must be empty</li>
            <li><code>ANY</code> — any content is allowed (rarely used in strict designs)</li>
            <li><code>(child1, child2, child3)</code> — sequence (order matters)</li>
            <li><code>(child1 | child2 | child3)</code> — choice (exactly one of them)</li>
            <li>Cardinality indicators:
              <ul>
                <li><code>?</code> — zero or one</li>
                <li><code>*</code> — zero or more</li>
                <li><code>+</code> — one or more</li>
                <li>(no indicator) — exactly one</li>
              </ul>
            </li>
          </ul>

          <p>Example of a more complex content model:</p>
          <CodeBlock
            language="xml"
            code={`<!ELEMENT person (name, (email | phone)+, address?)>`}
          />
          <p>
            This means: a <code>person</code> must have a <code>name</code>, then one or more of either
            <code>email</code> or <code>phone</code>, and optionally an <code>address</code>.
          </p>

          <h3>7.5 Attribute List Declarations</h3>
          <p>Attributes are declared with <code>{'<!ATTLIST>'}</code>:</p>
          <CodeBlock
            language="xml"
            code={`<!ATTLIST element-name
  attribute-name attribute-type default-declaration
>`}
          />

          <p>Common attribute types:</p>
          <ul>
            <li><code>CDATA</code> — character data</li>
            <li><code>ID</code> — unique identifier within the document</li>
            <li><code>IDREF</code> / <code>IDREFS</code> — reference(s) to an ID</li>
            <li><code>(value1|value2|value3)</code> — enumerated values</li>
            <li><code>NMTOKEN</code> / <code>NMTOKENS</code></li>
          </ul>

          <p>Default declarations:</p>
          <ul>
            <li><code>#REQUIRED</code> — the attribute must be present</li>
            <li><code>#IMPLIED</code> — the attribute is optional</li>
            <li><code>#FIXED "value"</code> — the attribute always has this fixed value</li>
            <li><code>"default-value"</code> — if the attribute is missing, this value is used</li>
          </ul>

          <p>Example:</p>
          <CodeBlock
            language="xml"
            code={`<!ATTLIST book
  id        ID       #REQUIRED
  category  CDATA    #IMPLIED
  available (yes|no) "yes"
>`}
          />

          <h3>7.6 Entity Declarations</h3>
          <p>Entities let you define reusable pieces of text:</p>
          <CodeBlock
            language="xml"
            code={`<!ENTITY company "Acme Corporation">
<!ENTITY copyright "Copyright 2026 Acme Corporation. All rights reserved.">`}
          />

          <p>Usage in the document:</p>
          <CodeBlock
            language="xml"
            code={`<footer>&copyright; — &company;</footer>`}
          />

          <p>
            There are also external entities and parameter entities (advanced topics usually covered later).
          </p>

          <hr />

          <h2>8. Creating and Validating XML Files (Practical Notes)</h2>
          <p>
            The official book demonstrates examples using <strong>NetBeans IDE</strong>.
            You can equally well use:
          </p>
          <ul>
            <li>Visual Studio Code + XML extension</li>
            <li>Visual Studio</li>
            <li>IntelliJ IDEA / WebStorm</li>
            <li>Any good text editor + an online or command-line validator</li>
            <li>BaseX (which you will use more in later sessions)</li>
          </ul>

          <p>
            Always save the file with a <code>.xml</code> extension and make sure the encoding
            declared in the XML declaration matches the actual file encoding (preferably UTF-8).
          </p>

          <p>
            Most modern IDEs will highlight well-formedness errors immediately and can validate
            against a DTD or XSD on demand.
          </p>

          <hr />

          <h2>9. Common Mistakes Students Make</h2>
          <ul>
            <li>Forgetting to close a tag or mismatching start/end tag names (case matters!)</li>
            <li>Using unquoted attribute values</li>
            <li>Putting two root elements in one document</li>
            <li>Using <code>{'&'}</code> or <code>{'<'}</code> without escaping them</li>
            <li>Writing overlapping tags instead of proper nesting</li>
            <li>Declaring an element in the DTD but using a different name (or different case) in the document</li>
            <li>Forgetting cardinality indicators and then being surprised that multiple children are not allowed</li>
          </ul>

          <hr />

          <h2>Summary</h2>
          <ul>
            <li>XML is a flexible, self-describing, platform-independent markup language for structured data.</li>
            <li>An XML document consists of an optional prolog and exactly one root element that forms a tree.</li>
            <li>Elements, attributes, comments, and entities are the basic building blocks.</li>
            <li>A document must be <strong>well-formed</strong> (correct syntax). It becomes <strong>valid</strong> when it also follows a DTD or Schema.</li>
            <li>DTDs can be internal or external and define elements, content models, attributes, and entities.</li>
            <li>Content models use sequences, choices, and cardinality (<code>?</code>, <code>*</code>, <code>+</code>).</li>
            <li>Attribute lists control which attributes are allowed and whether they are required.</li>
          </ul>

          <hr />

          <h2>Test Your Knowledge</h2>
          <ol>
            <li>What does XML stand for and what is its main purpose?</li>
            <li>Name at least five important features of XML.</li>
            <li>What is the difference between a well-formed and a valid XML document?</li>
            <li>What are the two main parts of an XML document structure?</li>
            <li>Why must attribute values be quoted? What happens if they are not?</li>
            <li>Write a simple internal DTD for a <code>Student</code> element that must contain <code>Name</code> and <code>RollNo</code>, and may optionally contain <code>Email</code>.</li>
            <li>How do you declare an external DTD using the SYSTEM keyword?</li>
            <li>What does the cardinality indicator <code>+</code> mean in a content model?</li>
            <li>What is the difference between <code>#REQUIRED</code> and <code>#IMPLIED</code> for an attribute?</li>
            <li>True or False: XML is case-insensitive.</li>
            <li>Write the five predefined character entities that must be escaped in XML content.</li>
            <li>Why is it generally better to prefer child elements over attributes for complex data?</li>
          </ol>

          <p><em>(Answers will be discussed in class.)</em></p>

          <hr />

          <h2>Try It Yourself</h2>

          <h3>Exercise 1 – Create a Well-Formed XML Document</h3>
          <p>Create an XML file named <code>library.xml</code> that describes three books. Each book should have:</p>
          <ul>
            <li><code>title</code> (child element)</li>
            <li><code>author</code> (child element)</li>
            <li><code>year</code> (child element)</li>
            <li><code>price</code> (attribute)</li>
            <li><code>id</code> (attribute, unique)</li>
          </ul>
          <p>Make sure the document is well-formed. Test it in your IDE or an online validator.</p>

          <h3>Exercise 2 – Add an Internal DTD</h3>
          <p>
            Take the <code>library.xml</code> you created and add a complete internal DTD that:
          </p>
          <ul>
            <li>Defines a root element <code>library</code> that contains one or more <code>book</code> elements</li>
            <li>Defines the structure of <code>book</code></li>
            <li>Makes the <code>id</code> attribute required and of type ID</li>
            <li>Makes the <code>price</code> attribute optional</li>
          </ul>
          <p>Validate that the document is now both well-formed and valid against the DTD.</p>

          <h3>Exercise 3 – External DTD</h3>
          <p>
            Move the DTD rules into a separate file named <code>library.dtd</code> and reference it
            from the XML document using a SYSTEM identifier. Confirm that the document still validates.
          </p>

          <h3>Exercise 4 – Entities and Enumerated Attributes</h3>
          <p>
            Extend your DTD so that:
          </p>
          <ul>
            <li>There is an entity for the publisher name</li>
            <li>Each book has a <code>category</code> attribute that can only be one of: fiction, non-fiction, reference</li>
          </ul>
          <p>Update your XML instance to use both features and re-validate.</p>

          <h3>Exercise 5 – Find and Fix Errors</h3>
          <p>The following document contains several errors. Find and correct all of them so that it becomes well-formed and valid against a reasonable DTD of your own design:</p>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0" encoding="UTF-8"?>
<students>
  <student id=S100>
    <name>Ayesha Khan</name>
    <course>XML & JSON</course>
  </student>
  <student id="S101">
    <name>Ali Raza
    <course>Web Development</course>
  </student>
</students>
<teacher>Dr. Ahmed</teacher>`}
          />

          <p>
            <strong>Next Session:</strong> XML Parser and DOM
          </p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
