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
(: Verify the file contents manually :)
doc("C:/Users/student/Documents/books.xml")/library/book[@id='B02']/price,

(: get from document file use when file data not saved in database :)
doc("path/to/library.xml")/library/book[@id='B02']/price,

(: get from database (specify database using db:get() if path not known) :)
db:get("myDb")/library/book[@id='B02']/price,

(: wildcard prefix (*:\) for path bypas when node path is not not known or unspecified :)
db:get("myDb")/*:library/*:book[@id='B02']/*:price,

(: deep search using // for path bypas when node path is not not known or unspecified :)
db:get("myDb")//*:book[@id='B02']/*:price,

(: xml data query syntax for adding data in xml database :)
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
),

db:get("myDb")/library/book[@id='B02']/price

(: normal queries when document data(i.e. books.xml) is stored in xml database in this case from books.xml to myDb as library.xml :)
/library/book[@id='B02']/price
);
}

//book[@id='B02']/price
