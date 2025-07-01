import React from "react";

const App = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🖥️ Elite Cyber Overlords 🕵️‍♂️</h1>
        <p style={styles.subtitle}>
          Because the internet needs more chaos... and cat memes.
        </p>
      </header>

      <main style={styles.main}>
        <section style={styles.section}>
          <h2>About Us</h2>
          <p>
            We’re a totally legitimate hacking collective. We hack the planet, 
            one totally fake exploit at a time.
          </p>
        </section>

        <section style={styles.section}>
          <h2>Latest “Leaks”</h2>
          <ul>
            <li>Leaked the source code to “Hello World” — world shaken.</li>
            <li>Compromised grandma’s cookie jar. Sweet success.</li>
            <li>Injected memes into the Matrix. Reality destabilizing.</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2>Join Us</h2>
          <p>
            Wanna be a keyboard ninja? Just bring snacks and questionable
            morals.
          </p>
          <button style={styles.button} onClick={() => alert("Welcome to the dark web (of memes)!")}>
            Recruit Me!
          </button>
        </section>
      </main>

      <footer style={styles.footer}>
        <small>© 2025 Elite Cyber Overlords. We do not take responsibility for your toaster’s fate.</small>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Courier New', Courier, monospace",
    backgroundColor: "#0d0d0d",
    color: "#33ff33",
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
    borderBottom: "2px solid #33ff33",
    paddingBottom: "1rem",
  },
  title: {
    fontSize: "3rem",
    margin: 0,
    letterSpacing: "0.1em",
  },
  subtitle: {
    fontSize: "1.2rem",
    fontStyle: "italic",
    marginTop: "0.5rem",
  },
  main: {
    flex: 1,
  },
  section: {
    marginBottom: "2rem",
  },
  button: {
    backgroundColor: "#33ff33",
    border: "none",
    padding: "0.8rem 1.5rem",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
  },
  footer: {
    textAlign: "center",
    borderTop: "2px solid #33ff33",
    paddingTop: "1rem",
    fontSize: "0.8rem",
    color: "#22cc22",
  },
};

export default App;
