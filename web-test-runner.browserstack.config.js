import { browserstackLauncher } from "@web/test-runner-browserstack";

// options shared between all browsers
const sharedCapabilities = {
  // your username and key for browserstack, you can get this from your browserstack account
  // it's recommended to store these as environment variables
  "browserstack.user": process.env.BROWSERSTACK_USERNAME,
  "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,

  project: "my project",
  name: "my test",
  // if you are running tests in a CI, the build id might be available as an
  // environment variable. this is useful for identifying test runs
  // this is for example the name for github actions
  build: `build ${process.env.GITHUB_RUN_NUMBER || "unknown"}`,
};

export default {
  nodeResolve: true,
  files: ["./test/**/*.test.js"],

  // how many browsers to run concurrently in browserstack. increasing this significantly
  // reduces testing time, but your subscription might limit concurrent connections
  concurrentBrowsers: 2,
  // amount of test files to execute concurrently in a browser. the default value is based
  // on amount of available CPUs locally which is irrelevant when testing remotely
  concurrency: 6,

  // See browser/operating system combinations here: https://www.browserstack.com/list-of-browsers-and-platforms/automate
  browsers: [
    browserstackLauncher({
      capabilities: {
        ...sharedCapabilities,
        browserName: "Safari",
        browser_version: "17.3",
        os: "OS X",
        os_version: "Sonoma",
      },
    }),

    browserstackLauncher({
      capabilities: {
        ...sharedCapabilities,
        browserName: "Safari",
        browser_version: "16.5",
        os: "OS X",
        os_version: "Ventura",
      },
    }),

    browserstackLauncher({
      capabilities: {
        ...sharedCapabilities,
        browserName: "Safari",
        device_name: "iPhone 15",
        os_version: 17,
      },
    }),
  ],
};
