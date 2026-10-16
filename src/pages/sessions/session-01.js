import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

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
            pre {
              background-color: #1e1e1e;
              color: #d4d4d4;
              padding: 12px 16px;
              border-radius: 6px;
              font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
              font-size: 0.9rem;
              overflow-x: auto;
              line-height: 1.5;
              margin: 12px 0 24px 0;
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
            <li>Define XML and explain its features</li>
            <li>Illustrate XML Attributes, Comments, Trees, and Validations</li>
            <li>Explain XML DTD with its types and describe working with DTDs</li>
          </ul>

          <hr />

          <h2>1. Session Overview</h2>
          <p>
            This session introduces Extensible Markup Language (XML) — a flexible, widely used
            format for storing and transporting data. You will learn the structure of an XML
            document, how to make it well-formed and valid, and how Document Type Definitions (DTDs)
            help enforce structure and rules.
          </p>

          <hr />

          <h2>2. What is XML?</h2>
          <p>
            <strong>EXtensible Markup Language (XML)</strong> is a markup language widely used for storing
            and transporting data. It is an easy and flexible format that both humans and computers
            can understand. XML uses tags to represent elements and attributes to provide additional
            details about those elements. XML offers a uniform representation and exchange of data.
          </p>
          <p>
            XML is commonly used and supported by many programming languages and frameworks.
            These languages support parsing, generating, manipulating, and working with XML data.
          </p>
          <p>Some of the languages and platforms commonly used with XML include:</p>
          <ul>
            <li>Java, C#, Python, JavaScript, PHP</li>
            <li>.NET Framework / .NET</li>
            <li>Ruby, Perl</li>
            <li>HTML and CSS (as related markup technologies)</li>
          </ul>

          <hr />

          <h2>3. XML Document Structure</h2>
          <p>A typical XML document has two main parts:</p>
          <ol>
            <li><strong>Document Prolog</strong> — metadata about the document</li>
            <li><strong>Root Element</strong> — the actual content</li>
          </ol>

          <h3>3.1 Document Prolog</h3>
          <p>The prolog usually contains:</p>
          <ul>
            <li><strong>XML Declaration</strong> — version and encoding</li>
            <li><strong>Document Type Declaration (DOCTYPE)</strong> — optional, used with DTDs</li>
            <li><strong>Entity Declarations</strong> — optional</li>
          </ul>

          <h3>3.2 Example XML Document</h3>
          <pre>{`<?xml version="1.0" encoding="iso-8859-1"?>
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
</Music_Library>`}</pre>

          <p>
            The XML parser reads the prolog first to understand the document’s version, encoding,
            and any rules defined in a DTD.
          </p>

          <hr />

          <h2>4. XML Features</h2>
          <ul>
            <li><strong>Self-describing</strong> — tags describe the data they contain</li>
            <li><strong>Extensible</strong> — you can define your own tags</li>
            <li><strong>Platform and language independent</strong></li>
            <li><strong>Hierarchical structure</strong> — forms a tree</li>
            <li><strong>Supports validation</strong> via DTD or XML Schema</li>
            <li><strong>Human and machine readable</strong></li>
          </ul>

          <hr />

          <h2>5. XML Elements, Attributes, Comments and Trees</h2>

          <h3>5.1 Elements</h3>
          <p>Elements are the building blocks of XML. They consist of a start tag, content, and an end tag.</p>
          <pre>{`<Title>YLU</Title>`}</pre>

          <h3>5.2 Attributes</h3>
          <p>Attributes provide additional information about an element.</p>
          <pre>{`<book id="101" category="fiction">
  <title>The Great Adventure</title>
</book>`}</pre>
          <p>Rules for attributes:</p>
          <ul>
            <li>Must be quoted (single or double quotes)</li>
            <li>Cannot contain unescaped <code><</code>, <code>&</code>, or quotes of the same type</li>
            <li>An element can have multiple attributes</li>
          </ul>

          <h3>5.3 Comments</h3>
          <p>Comments in XML look like this:</p>
          <pre>{`<!-- This is a comment. It is ignored by the parser. -->`}</pre>
          <p>Comments cannot appear inside tags and cannot contain the sequence <code>--</code>.</p>

          <h3>5.4 XML as a Tree</h3>
          <p>
            Every XML document forms a tree structure with a single root element.
            Child elements are nested inside parent elements. This hierarchical nature
            makes XPath and XSLT powerful tools for navigating and transforming XML.
          </p>

          <hr />

          <h2>6. Well-Formed vs Valid XML</h2>

          <h3>6.1 Well-Formed XML</h3>
          <p>A document is <strong>well-formed</strong> when it follows the basic XML syntax rules:</p>
          <ul>
            <li>Exactly one root element</li>
            <li>All tags are properly nested and closed</li>
            <li>Attribute values are quoted</li>
            <li>Special characters are escaped (<code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>, etc.)</li>
            <li>Case is consistent (XML is case-sensitive)</li>
          </ul>

          <h3>6.2 Valid XML</h3>
          <p>
            A document is <strong>valid</strong> when it is well-formed <em>and</em> conforms to a set of rules
            defined in a DTD or XML Schema. Validation ensures that the structure and data types
            match the expected design.
          </p>

          <hr />

          <h2>7. Document Type Definition (DTD)</h2>
          <p>
            A DTD defines the legal building blocks of an XML document — which elements are allowed,
            their order, whether they are required or optional, and what attributes they may have.
          </p>

          <h3>7.1 Types of DTD</h3>
          <ul>
            <li><strong>Internal DTD</strong> — declared inside the XML file itself (as shown in the example above)</li>
            <li><strong>External DTD</strong> — stored in a separate <code>.dtd</code> file and referenced from the XML document</li>
          </ul>

          <h3>7.2 External DTD Example</h3>
          <p>In the XML file:</p>
          <pre>{`<?xml version="1.0"?>
<!DOCTYPE Music_Library SYSTEM "music.dtd">
<Music_Library>
  ...
</Music_Library>`}</pre>
          <p>In <code>music.dtd</code>:</p>
          <pre>{`<!ELEMENT Music_Library (Title, Artist, Country, Price, Year)>
<!ELEMENT Title (#PCDATA)>
<!ELEMENT Artist (#PCDATA)>
<!ELEMENT Country (#PCDATA)>
<!ELEMENT Price (#PCDATA)>
<!ELEMENT Year (#PCDATA)>`}</pre>

          <h3>7.3 Common DTD Declarations</h3>
          <ul>
            <li><code><!ELEMENT element-name (content-model)></code></li>
            <li><code>#PCDATA</code> — parsed character data</li>
            <li><code>EMPTY</code> — empty element</li>
            <li><code>ANY</code> — any content</li>
            <li>Cardinality: <code>?</code> (0 or 1), <code>*</code> (0 or more), <code>+</code> (1 or more)</li>
          </ul>

          <hr />

          <h2>8. Creating an XML File (Practical Note)</h2>
          <p>
            In the official book the examples are created using NetBeans IDE.
            You can also create XML files with any text editor or modern IDE (VS Code, Visual Studio, etc.).
            Just save the file with a <code>.xml</code> extension and make sure the encoding matches the declaration.
          </p>

          <hr />

          <h2>Summary</h2>
          <ul>
            <li>XML is a flexible, self-describing markup language for storing and exchanging data.</li>
            <li>An XML document has a prolog and a single root element that forms a tree.</li>
            <li>Elements, attributes and comments are the basic building blocks.</li>
            <li>A document must be <strong>well-formed</strong> (correct syntax) and can be made <strong>valid</strong> by following a DTD or Schema.</li>
            <li>DTDs can be internal or external and define the allowed structure of the document.</li>
          </ul>

          <hr />

          <h2>Test Your Knowledge</h2>
          <ol>
            <li>What does XML stand for and what is its main purpose?</li>
            <li>Name at least four features of XML.</li>
            <li>What is the difference between a well-formed and a valid XML document?</li>
            <li>What are the two main parts of an XML document structure?</li>
            <li>Write a simple internal DTD for a <code>Student</code> element that contains <code>Name</code> and <code>RollNo</code>.</li>
            <li>How do you declare an external DTD?</li>
            <li>Why must attribute values be quoted in XML?</li>
            <li>True or False: XML is case-insensitive.</li>
          </ol>

          <p><em>(Answers will be discussed in class.)</em></p>

          <hr />

          <h2>Try It Yourself</h2>

          <h3>Exercise 1 – Create a Well-Formed XML Document</h3>
          <p>Create an XML file named <code>library.xml</code> that describes three books. Each book should have:</p>
          <ul>
            <li>title</li>
            <li>author</li>
            <li>year</li>
            <li>price (as an attribute)</li>
          </ul>
          <p>Make sure the document is well-formed.</p>

          <h3>Exercise 2 – Add an Internal DTD</h3>
          <p>Take the <code>library.xml</code> you created and add an internal DTD that defines the allowed structure.
          Validate that the document is now both well-formed and valid against the DTD.</p>

          <h3>Exercise 3 – External DTD</h3>
          <p>Move the DTD rules into a separate file <code>library.dtd</code> and reference it from the XML document.
          Confirm that the document still validates.</p>

          <p>
            <strong>Next Session:</strong> XML Parser and DOM
          </p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
