import React, { useEffect, useState } from "react";
import "./App.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/tickets");
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const createTicket = async (towerName) => {
    setLoading(true);
    await fetch("http://localhost:8080/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ towerName, issue: "Low Signal" }),
    });
    fetchTickets();
  };

  const resolveTicket = async (id) => {
    setLoading(true);
    await fetch(`http://localhost:8080/tickets/${id}`, {
      method: "PUT",
    });
    fetchTickets();
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // COUNTS
  const openCount = tickets.filter(t => t.status === "OPEN").length;
  const resolvedCount = tickets.filter(t => t.status === "RESOLVED").length;
  const totalCount = tickets.length;

  // FILTER
  let filteredTickets =
    filter === "ALL"
      ? tickets
      : tickets.filter(t => t.status === filter);

  // ✅ SORT (OPEN FIRST)
  filteredTickets = filteredTickets.sort((a, b) => {
    if (a.status === "OPEN" && b.status !== "OPEN") return -1;
    if (a.status !== "OPEN" && b.status === "OPEN") return 1;
    return 0;
  });

  // GRAPHS
  const barData = {
    labels: ["OPEN", "RESOLVED"],
    datasets: [
      {
        label: "Tickets",
        data: [openCount, resolvedCount],
        backgroundColor: ["orange", "green"],
      },
    ],
  };

  const pieData = {
    labels: ["OPEN", "RESOLVED"],
    datasets: [
      {
        data: [openCount, resolvedCount],
        backgroundColor: ["orange", "green"],
      },
    ],
  };

  const towerData = {
    labels: ["Tower A", "Tower B", "Tower C"],
    datasets: [
      {
        label: "Tower Tickets",
        data: [
          tickets.filter(t => t.towerName === "Tower A").length || 0,
          tickets.filter(t => t.towerName === "Tower B").length || 0,
          tickets.filter(t => t.towerName === "Tower C").length || 0,
        ],
        backgroundColor: ["#60a5fa", "#f87171", "#34d399"],
      },
    ],
  };

  return (
    <div className="container">

      {/* REFRESH BUTTON */}
      <button className="refresh-btn" onClick={fetchTickets}>
        🔄
      </button>

      <h1>Telecom Fault Management System</h1>

      {/* ✅ TOTAL COUNTS */}
      <div className="summary-bar">
        Total: {totalCount} | Open: {openCount} | Resolved: {resolvedCount}
      </div>

      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}

      {/* TOWERS */}
      <div className="tower-section">
        <div className="tower-card" onClick={() => createTicket("Tower A")}>
          <div className="tower-icon">📡</div>
          <h3>Tower A</h3>
          <p>Create Ticket</p>
        </div>

        <div className="tower-card" onClick={() => createTicket("Tower B")}>
          <div className="tower-icon">📶</div>
          <h3>Tower B</h3>
          <p>Create Ticket</p>
        </div>

        <div className="tower-card" onClick={() => createTicket("Tower C")}>
          <div className="tower-icon">🗼</div>
          <h3>Tower C</h3>
          <p>Create Ticket</p>
        </div>
      </div>

      {/* STATUS */}
      <h2>Status Overview</h2>
      <div className="dashboard">
        <div className="card open">OPEN: {openCount}</div>
        <div className="card resolved">RESOLVED: {resolvedCount}</div>
      </div>

      {/* FILTER */}
      <h2>Filter Tickets</h2>
      <div className="filter">
        <button onClick={() => setFilter("ALL")}>ALL</button>
        <button onClick={() => setFilter("OPEN")}>OPEN</button>
        <button onClick={() => setFilter("RESOLVED")}>RESOLVED</button>
      </div>

      {/* GRAPHS */}
      <div className="graph-grid">
        <div className="graph-card">
          <h3>Status Bar</h3>
          <Bar data={barData} />
        </div>

        <div className="graph-card">
          <h3>Pie Chart</h3>
          <Pie data={pieData} />
        </div>

        <div className="graph-card">
          <h3>Tower Graph</h3>
          <Bar data={towerData} />
        </div>
      </div>

      {/* TICKETS */}
      <h2>Tickets</h2>
      {filteredTickets.map((t) => (
        <div
          key={t.id}
          className={`ticket-card ${
            t.status === "OPEN" ? "ticket-open" : ""
          }`}
        >
          <h3>{t.towerName}</h3>
          <p>Issue: {t.issue}</p>

          <p className={t.status === "RESOLVED" ? "status-green" : "status-orange"}>
            Status: {t.status || "OPEN"}
          </p>

          {t.status !== "RESOLVED" && (
            <button onClick={() => resolveTicket(t.id)}>RESOLVE</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;