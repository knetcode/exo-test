import { GithubIcon, GlobeIcon, VariableIcon } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-4/5 bg-black mx-auto p-8 rounded-3xl flex flex-col gap-2 text-teal-500">
      <code className="text-center font-semibold mb-4">Test application for EXOGROUP</code>
      <code>
        <Link className="flex flex-row gap-2" target="_blank" href="https://github.com/knetcode/exo-test">
          <GithubIcon />
          Repo: https://github.com/knetcode/exo-test
        </Link>
      </code>
      <code>
        <Link className="flex flex-row gap-2" target="_blank" href="https://exo-test.coolify.knetcode.com">
          <GlobeIcon />
          Live: https://exo-test.coolify.knetcode.com
        </Link>
      </code>
      <code className="flex flex-row gap-2">
        <VariableIcon />
        ENV: Provided via email to recruiter
      </code>
      <code className="text-center font-semibold mt-4">OBJECTIVES</code>
      <code>
        <h2 className="font-semibold mt-4">Data Capture</h2>
        <ul className="list-disc list-inside">
          <li>First Name</li>
          <li>Surname</li>
          <li>ID Number</li>
          <li>Date of Birth (auto-derived from the ID Number)</li>
          <li>Occupation options. (Dropdown with min 20 options)</li>
        </ul>
        <h2 className="font-semibold mt-4">Data Privacy</h2>
        <p>Implement obscuring/masking of sensitive personal information in the UI to protect user privacy.</p>
      </code>
      <code>
        <h2 className="font-semibold mt-4">PDF Handling</h2>
        <ul className="list-disc list-inside">
          <li>Enable users to upload documents (e.g., PDFs).</li>
          <li>Provide an interactive preview/display of uploaded PDFs within the application.</li>
        </ul>
        <h2 className="font-semibold mt-4">XML Data Handling</h2>
        <ul className="list-disc list-inside">
          <li>Parse and display structured XML data provided in a sample dataset.</li>
          <li>
            The XML node descriptions should be displayed as table headers, and the corresponding data should be
            dynamically rendered in the UI.
          </li>
        </ul>
      </code>
      <code>
        <h2 className="font-semibold mt-4">System Requirements</h2>
        <ul className="list-disc list-inside">
          <li>The application should offer seamless navigation between different pages and components.</li>
          <li>Ensure the application is mobile-responsive and optimized for a variety of screen sizes.</li>
          <li>A README file is optional but encouraged for clarity and ease of use.</li>
        </ul>
        <h2 className="font-semibold mt-4">Data Storage & Environment</h2>
        <ul className="list-disc list-inside">
          <li>Data may be stored in in-memory objects or local files.</li>
          <li>If a Dockerized database environment is preferred:</li>
          <li>Provide a clearly defined database schema.</li>
          <li>Include the necessary Docker configuration files to support the setup and usage of the database.</li>
        </ul>
      </code>
    </div>
  );
}
