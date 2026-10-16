import React from "react";
import Link from "@docusaurus/Link";

const HomePage = () => {
  return (
    <div className="home-page">
      <main>
        <h1>XML and JSON Validation Course</h1>

        <p>
          Welcome to the <strong>XML and JSON Validation Course</strong>.
        </p>
        <p>
          This course takes you from the fundamentals of XML and document validation
          to practical work with XPath, XSLT, JSON, and CORS — exactly as covered in the official course book.
        </p>

        <section>
          <h2>Course Levels</h2>

          <h3>Foundation — XML</h3>
          <ul>
            <li>XML and XML Validations (DTD & Schema)</li>
            <li>XML Parser and DOM</li>
            <li>XPath</li>
            <li>XSLT</li>
          </ul>

          <h3>Modern Data Exchange — JSON</h3>
          <ul>
            <li>JSON Fundamentals</li>
            <li>Working with JSON</li>
            <li>Advanced JSON Features</li>
          </ul>

          <h3>Web Integration</h3>
          <ul>
            <li>CORS (Cross-Origin Resource Sharing)</li>
          </ul>
        </section>

        <section>
          <h2>Course Structure</h2>
          <p>
            The course contains <strong>8 sessions</strong>, with each session
            lasting approximately <strong>2 hours</strong>.
          </p>
          <p>
            These guides are prepared according to the official book so that students can follow both the book and practical examples easily.
          </p>
        </section>

        <section>
          <h2>Student Expectations</h2>
          <p>Students are expected to:</p>
          <ol>
            <li>Read the lesson material carefully.</li>
            <li>Type and execute the examples themselves.</li>
            <li>Complete the “Try It Yourself” exercises.</li>
            <li>Attempt the “Test Your Knowledge” questions.</li>
            <li>Practice outside the classroom.</li>
          </ol>
        </section>

        <hr />

        <section>
          <h2>Sessions</h2>
          <p>Start with:</p>
          <ul>
            <li>
              <Link to="/sessions/session-01">
                Session 01 — XML and XML Validations
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-02">
                Session 02 — XML Parser and DOM
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-03">
                Session 03 — XPath
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-04">
                Session 04 — XSLT
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-05">
                Session 05 — JSON
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-06">
                Session 06 — Working with JSON
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-07">
                Session 07 — Advanced JSON Features
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-08">
                Session 08 — CORS
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
