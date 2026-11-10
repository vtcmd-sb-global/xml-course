import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session08() {
  return (
    <Layout
      title="Session 08 — CORS"
      description="Understand Cross-Origin Resource Sharing, the Same-Origin Policy, and how to configure CORS"
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

          <h1>Session 08 — CORS</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Understand the Same-Origin Policy, why browsers block cross-origin requests, and how CORS headers allow controlled access to resources from other origins.</p>
          <p><strong>Based on:</strong> Official Book – Session 8</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Explain the Same-Origin Policy and why it exists</li>
            <li>Define CORS and the problem it solves</li>
            <li>Identify the main CORS response headers</li>
            <li>Distinguish between simple requests and preflighted requests</li>
            <li>Configure a server to allow cross-origin requests safely</li>
            <li>Diagnose common CORS errors in the browser console</li>
          </ul>

          <hr />

          <h2>1. Session Overview</h2>
          <p>
            When a web page running on one origin (scheme + host + port) tries to request a resource
            from a different origin, browsers enforce the <strong>Same-Origin Policy</strong>.
            This security feature prevents malicious sites from reading sensitive data from other sites.
            <strong>CORS</strong> (Cross-Origin Resource Sharing) is the standard mechanism that allows
            servers to relax this restriction in a controlled way.
          </p>

          <hr />

          <h2>2. What is an Origin?</h2>
          <p>An origin is defined by three parts:</p>
          <ul>
            <li><strong>Scheme</strong> (protocol) — <code>http</code> or <code>https</code></li>
            <li><strong>Host</strong> (domain) — <code>example.com</code></li>
            <li><strong>Port</strong> — <code>80</code>, <code>443</code>, <code>3000</code>, etc.</li>
          </ul>

          <p>Examples:</p>
          <ul>
            <li><code>https://example.com</code> and <code>https://example.com:443</code> → same origin</li>
            <li><code>https://example.com</code> and <code>http://example.com</code> → different origins (scheme)</li>
            <li><code>https://example.com</code> and <code>https://api.example.com</code> → different origins (host)</li>
            <li><code>https://example.com</code> and <code>https://example.com:3000</code> → different origins (port)</li>
          </ul>

          <hr />

          <h2>3. The Same-Origin Policy</h2>
          <p>
            Browsers allow a script to freely read responses only from the same origin that served the page.
            Cross-origin requests can still be <em>sent</em>, but the response is hidden from JavaScript
            unless the server explicitly permits it via CORS headers.
          </p>
          <p>This protects users from attacks such as:</p>
          <ul>
            <li>A malicious site reading your private data from your bank’s website</li>
            <li>Unauthorized actions performed with your cookies (in combination with other defenses)</li>
          </ul>

          <hr />

          <h2>4. What is CORS?</h2>
          <p>
            <strong>Cross-Origin Resource Sharing (CORS)</strong> is a W3C standard that defines
            a set of HTTP headers. These headers let a server indicate which origins are allowed
            to read its resources and under what conditions.
          </p>

          <hr />

          <h2>5. Key CORS Headers</h2>

          <h3>5.1 Response Headers (sent by the server)</h3>
          <ul>
            <li>
              <code>Access-Control-Allow-Origin</code><br />
              Indicates which origin may access the resource.
              Can be a specific origin (<code>https://frontend.example.com</code>)
              or <code>*</code> (any origin — not allowed when credentials are included).
            </li>
            <li>
              <code>Access-Control-Allow-Methods</code><br />
              Lists the HTTP methods permitted for cross-origin requests
              (e.g. <code>GET, POST, PUT, DELETE</code>).
            </li>
            <li>
              <code>Access-Control-Allow-Headers</code><br />
              Lists the request headers the client is allowed to send
              (e.g. <code>Content-Type, Authorization</code>).
            </li>
            <li>
              <code>Access-Control-Allow-Credentials</code><br />
              Set to <code>true</code> if the server allows cookies or HTTP authentication
              to be included in the request.
            </li>
            <li>
              <code>Access-Control-Max-Age</code><br />
              How long (in seconds) the browser may cache the result of a preflight request.
            </li>
            <li>
              <code>Access-Control-Expose-Headers</code><br />
              Makes certain response headers visible to JavaScript
              (by default only a few simple headers are exposed).
            </li>
          </ul>

          <h3>5.2 Request Headers (sent by the browser)</h3>
          <ul>
            <li><code>Origin</code> — the origin of the page making the request</li>
            <li><code>Access-Control-Request-Method</code> — used in preflight requests</li>
            <li><code>Access-Control-Request-Headers</code> — used in preflight requests</li>
          </ul>

          <hr />

          <h2>6. Simple vs Preflighted Requests</h2>

          <h3>6.1 Simple Requests</h3>
          <p>A request is “simple” when it meets all of these conditions:</p>
          <ul>
            <li>Method is <code>GET</code>, <code>HEAD</code>, or <code>POST</code></li>
            <li>Only simple headers are used (e.g. <code>Accept</code>, <code>Content-Type</code> with certain values)</li>
            <li>Content-Type is one of: <code>application/x-www-form-urlencoded</code>, <code>multipart/form-data</code>, or <code>text/plain</code></li>
          </ul>
          <p>For simple requests the browser sends the actual request and the server responds with the appropriate CORS headers.</p>

          <h3>6.2 Preflighted Requests</h3>
          <p>
            If the request does not meet the simple criteria (for example it uses <code>PUT</code>,
            custom headers, or <code>Content-Type: application/json</code>), the browser first sends
            an <code>OPTIONS</code> request — the <strong>preflight</strong>.
          </p>
          <p>The server must respond to the OPTIONS request with the correct CORS headers.
          Only if the preflight succeeds does the browser send the real request.</p>

          <CodeBlock
            language="javascript"
            code={`// Typical preflight request (sent automatically by the browser)
OPTIONS /api/books HTTP/1.1
Host: api.example.com
Origin: https://frontend.example.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type, Authorization`} 
          />

          <CodeBlock
            language="javascript"
            code={`// Successful preflight response
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://frontend.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400`} 
          />

          <hr />

          <h2>7. Configuring CORS on the Server</h2>

          <h3>7.1 Express.js (Node.js) Example</h3>
          <CodeBlock
            language="javascript"
            code={`const express = require("express");
const cors = require("cors");
const app = express();

// Allow a specific origin
app.use(cors({
  origin: "https://frontend.example.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Or allow any origin (development only)
app.use(cors());

app.get("/api/books", (req, res) => {
  res.json([{ id: 1, title: "The Great Gatsby" }]);
});

app.listen(3000);`}
          />

          <h3>7.2 ASP.NET Core Example</h3>
          <CodeBlock
            language="javascript"
            code={`// Program.cs / Startup.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("https://frontend.example.com")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// ...

app.UseCors("AllowFrontend");`}
          />

          <h3>7.3 Simple Manual Headers (any framework)</h3>
          <CodeBlock
            language="javascript"
            code={`// Inside a request handler
res.setHeader("Access-Control-Allow-Origin", "https://frontend.example.com");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");`} 
          />

          <hr />

          <h2>8. Common CORS Errors and How to Fix Them</h2>

          <h3>Error: “No 'Access-Control-Allow-Origin' header is present”</h3>
          <p>The server did not send the header, or the value does not match the requesting origin.</p>

          <h3>Error: “The value of the 'Access-Control-Allow-Origin' header … must not be the wildcard '*' when the request's credentials mode is 'include'”</h3>
          <p>You cannot use <code>*</code> together with credentials. Specify the exact origin instead.</p>

          <h3>Error: Preflight fails / OPTIONS returns 404 or 405</h3>
          <p>The server is not handling the OPTIONS request. Make sure your CORS middleware or configuration responds to OPTIONS.</p>

          <hr />

          <h2>9. Security Considerations</h2>
          <ul>
            <li>Never use <code>Access-Control-Allow-Origin: *</code> in production when sensitive data or credentials are involved.</li>
            <li>Prefer an explicit allow-list of trusted origins.</li>
            <li>Combine CORS with proper authentication and authorization; CORS alone does not protect your API.</li>
            <li>Be careful with <code>Access-Control-Allow-Credentials: true</code> — only enable it when necessary.</li>
          </ul>

          <hr />

          <h2>Summary</h2>
          <ul>
            <li>The Same-Origin Policy prevents scripts from reading responses from other origins by default.</li>
            <li>CORS is the standard way for servers to grant controlled cross-origin access.</li>
            <li>Key headers: <code>Access-Control-Allow-Origin</code>, <code>Allow-Methods</code>, <code>Allow-Headers</code>, <code>Allow-Credentials</code>.</li>
            <li>Complex requests trigger a preflight OPTIONS request that must succeed before the real request is sent.</li>
            <li>Always configure CORS carefully; a misconfigured policy can either block legitimate clients or expose data unintentionally.</li>
          </ul>

          <hr />

          <h2>Test Your Knowledge</h2>
          <ol>
            <li>What three pieces of information define an origin?</li>
            <li>Why do browsers enforce the Same-Origin Policy?</li>
            <li>What is the purpose of the <code>Access-Control-Allow-Origin</code> header?</li>
            <li>When does a browser send a preflight (OPTIONS) request?</li>
            <li>Why can’t you use <code>Access-Control-Allow-Origin: *</code> together with credentials?</li>
            <li>Name two common causes of CORS errors seen in the browser console.</li>
            <li>True or False: CORS is a server-side security feature that blocks requests at the network level.</li>
          </ol>

          <p><em>(Answers will be discussed in class.)</em></p>

          <hr />

          <h2>Try It Yourself</h2>

          <h3>Exercise 1 – Observe a CORS Error</h3>
          <p>
            Create a simple HTML page on one origin (or use a live-server) that tries to fetch JSON
            from a different origin that does <em>not</em> send CORS headers.
            Open the browser console and note the exact error message.
          </p>

          <h3>Exercise 2 – Fix the Error</h3>
          <p>
            Configure the server (or use a tool like json-server with a custom middleware)
            so that it returns the appropriate <code>Access-Control-Allow-Origin</code> header.
            Confirm that the fetch now succeeds.
          </p>

          <h3>Exercise 3 – Preflight</h3>
          <p>
            Change the client request to use the <code>PUT</code> method or a custom header.
            Observe the OPTIONS preflight in the Network tab and make sure the server responds correctly.
          </p>

          <p>
            <strong>End of Course</strong> — Congratulations on completing the XML and JSON Validation Course!
          </p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
