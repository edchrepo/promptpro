import '@styles/globals.css';

export const metadata = {
    title: "PromptPro",
    description: "Discover & Share AI Prompts"
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <div className="name">
                <div className="gradient"/>
            </div>

            <main className="app">
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout;