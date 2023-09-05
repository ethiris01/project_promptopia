import "@styles/global.css";
// components
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
export const metadata = {
  title: "Promptopia",
  description: "Discover & Share Ai Prompts",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/assets/images/logo.svg" />
      </head>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};
export default RootLayout;

// this layout where our root stored like in index.html in react , or main root directory
