import { FileIcon, GithubIcon, GlobeIcon, VariableIcon } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-card/50 border border-border rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-teal-500 mb-4 sm:mb-6 md:mb-8">
          Test application for EXOGROUP
        </h1>
        <div className="space-y-3 sm:space-y-4">
          <Link
            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground"
            target="_blank"
            href="https://github.com/knetcode/exo-test"
          >
            <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />
            <span className="text-sm sm:text-base">Repo: https://github.com/knetcode/exo-test</span>
          </Link>
          <Link
            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground"
            target="_blank"
            href="https://github.com/knetcode/exo-test/blob/main/README.md"
          >
            <FileIcon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />
            <span className="text-sm sm:text-base">
              README: https://github.com/knetcode/exo-test/blob/main/README.md
            </span>
          </Link>
          <Link
            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground"
            target="_blank"
            href="https://exo-test.coolify.knetcode.com/"
          >
            <GlobeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />
            <span className="text-sm sm:text-base">Live: https://exo-test.coolify.knetcode.com/</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground">
            <VariableIcon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />
            <span className="text-sm sm:text-base">.env.local: Provided via email to recruiter</span>
          </div>
        </div>
        <div className="border-t border-border pt-4 sm:pt-6">
          <h2 className="text-lg sm:text-xl font-semibold text-center text-teal-500 mb-4 sm:mb-6">OBJECTIVES</h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Data Capture</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• First Name</li>
                  <li>• Surname</li>
                  <li>• ID Number</li>
                  <li>• Date of Birth (auto-derived from the ID Number)</li>
                  <li>• Occupation options (Dropdown with min 20 options)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Data Privacy</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    • Implement obscuring/masking of sensitive personal information in the UI to protect user privacy.
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">PDF Handling</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Enable users to upload documents (e.g., PDFs).</li>
                  <li>• Provide an interactive preview/display of uploaded PDFs within the application.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">XML Data Handling</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Parse and display structured XML data provided in a sample dataset.</li>
                  <li>
                    • The XML node descriptions should be displayed as table headers, and the corresponding data should
                    be dynamically rendered in the UI.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-4 sm:pt-6 mt-4 sm:mt-6">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-foreground mb-2">System Requirements</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• The application should offer seamless navigation between different pages and components.</li>
                  <li>• Ensure the application is mobile-responsive and optimized for a variety of screen sizes.</li>
                  <li>• A README file is optional but encouraged for clarity and ease of use.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Technical Requirements</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Use Next.js 15 with App Router</li>
                  <li>• Implement tRPC for type-safe API calls</li>
                  <li>• Use React Query for data fetching and caching</li>
                  <li>• Implement proper error handling and loading states</li>
                  <li>• Use Tailwind CSS for styling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
