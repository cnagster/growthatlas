'use client'

import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import L10Sidebar from "./L10Sidebar";
import L10Dashboard from "./L10Dashboard";
import L10Scorecard from "./L10Scorecard";
import Todos from "./pages/Todos";
import Issues from "./pages/Issues";
import Headlines from "./pages/Headlines";
import OKRs from "./pages/OKRs";
import L10Login from "./L10Login";

type NavItem = "overview" | "scorecard" | "okrs" | "todos" | "issues" | "headlines";

function L10Shell() {
  const [activeNav, setActiveNav] = useState<NavItem>("overview");

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <L10Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <main style={{ flex: 1, overflow: "auto" }}>
        {activeNav === "overview"  && <L10Dashboard />}
        {activeNav === "scorecard" && <L10Scorecard />}
        {activeNav === "todos"     && <Todos />}
        {activeNav === "issues"    && <Issues />}
        {activeNav === "headlines" && <Headlines />}
        {activeNav === "okrs"      && <OKRs />}
      </main>
    </div>
  );
}

export default function PaidMediaL10Page() {
  const [authed, setAuthed] = useState(() =>
    typeof window !== "undefined" &&
    localStorage.getItem("ninety-auth") === "1" &&
    !!localStorage.getItem("ninety-auth-user")
  );
  const [username, setUsername] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("ninety-auth-user") ?? "" : ""
  );

  if (!authed) return <L10Login onLogin={(u) => { setAuthed(true); setUsername(u); }} />;

  return (
    <AppProvider username={username}>
      <L10Shell />
    </AppProvider>
  );
}
