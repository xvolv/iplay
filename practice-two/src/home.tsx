import React, { useState } from "react";
import { Link } from "react-router";

const Home: React.FC = () => {
  const [search, setSearch] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const stats = [
    { label: "Total Value", value: "$1,245,890", change: "+2.3%" },
    { label: "24h Volume", value: "$845.2M", change: "+5.1%" },
    { label: "Active Users", value: "89.2K", change: "+1.8%" },
    { label: "Gas Price", value: "32 Gwei", change: "-0.5%" },
  ];

  const tokens = [
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "$3,300.50",
      change: "+2.5%",
      volume: "$12.4B",
    },
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "$67,890.20",
      change: "+1.2%",
      volume: "$24.8B",
    },
    {
      name: "USDC",
      symbol: "USDC",
      price: "$1.00",
      change: "0.0%",
      volume: "$8.2B",
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "$145.80",
      change: "-0.8%",
      volume: "$3.5B",
    },
  ];

  const recentTxs = [
    {
      hash: "0x7f3a...c8d2",
      type: "Swap",
      amount: "2.5 ETH",
      time: "2 min ago",
      status: "confirmed",
    },
    {
      hash: "0x9b1e...f5a7",
      type: "Transfer",
      amount: "1500 USDC",
      time: "5 min ago",
      status: "pending",
    },
    {
      hash: "0x3c8d...b2a9",
      type: "Stake",
      amount: "50 SOL",
      time: "12 min ago",
      status: "confirmed",
    },
    {
      hash: "0x5a2b...d8c4",
      type: "Mint",
      amount: "NFT",
      time: "25 min ago",
      status: "failed",
    },
  ];

  const trendingDapps = [
    { name: "Uniswap", category: "DEX", users: "1.2M", tvl: "$4.5B" },
    { name: "Aave", category: "Lending", users: "850K", tvl: "$12.8B" },
    { name: "OpenSea", category: "NFT", users: "2.1M", tvl: "$1.2B" },
    { name: "Compound", category: "Lending", users: "420K", tvl: "$3.8B" },
  ];

  const quickActions = [
    { icon: "💱", label: "Swap Tokens" },
    { icon: "📤", label: "Send" },
    { icon: "📥", label: "Receive" },
    { icon: "🏦", label: "Stake" },
    { icon: "🖼️", label: "NFTs" },
    { icon: "🛡️", label: "Bridge" },
  ];

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
        color: isDarkMode ? "#f1f5f9" : "#1e293b",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "4px",
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Web3 Dashboard
          </h1>
          <p
            style={{
              color: isDarkMode ? "#94a3b8" : "#64748b",
              fontSize: "14px",
            }}
          >
            Your gateway to decentralized finance
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: isDarkMode ? "#fbbf24" : "#f59e0b",
            }}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          <div
            style={{
              backgroundColor: isDarkMode ? "#1e293b" : "#e2e8f0",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            0x742d...c3d97
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: "30px" }}>
        <div
          style={{
            position: "relative",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            placeholder="Search tokens, dApps, addresses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 20px 14px 48px",
              backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
              color: isDarkMode ? "#f1f5f9" : "#1e293b",
              border: isDarkMode ? "1px solid #334155" : "1px solid #cbd5e1",
              borderRadius: "12px",
              fontSize: "16px",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "18px",
            }}
          >
            🔍
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "40px",
        }}
      >
        <div>
          <Link to="/dashboard">here you go</Link>
        </div>
        {quickActions.map((action, index) => (
          <button
            key={index}
            style={{
              display: "flex",
              flexDirection: "column" as "column",
              alignItems: "center",
              gap: "8px",
              padding: "16px 20px",
              backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
              border: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
              borderRadius: "12px",
              cursor: "pointer",
              minWidth: "100px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode
                ? "#334155"
                : "#f1f5f9";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode
                ? "#1e293b"
                : "#ffffff";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span style={{ fontSize: "24px" }}>{action.icon}</span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: isDarkMode ? "#cbd5e1" : "#475569",
              }}
            >
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
              border: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "20px",
              position: "relative" as "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                fontSize: "20px",
              }}
            >
              {index === 0
                ? "💰"
                : index === 1
                ? "📈"
                : index === 2
                ? "👥"
                : "⛽"}
            </div>
            <div
              style={{
                fontSize: "14px",
                color: isDarkMode ? "#94a3b8" : "#64748b",
                marginBottom: "8px",
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "4px",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: stat.change.includes("+")
                  ? "#10b981"
                  : stat.change.includes("-")
                  ? "#ef4444"
                  : "#94a3b8",
                fontWeight: "500",
              }}
            >
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        {/* Top Tokens */}
        <div
          style={{
            backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
            border: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Top Tokens</h2>
            <span
              style={{
                fontSize: "12px",
                color: isDarkMode ? "#94a3b8" : "#64748b",
              }}
            >
              24h
            </span>
          </div>
          <div>
            {tokens.map((token, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom:
                    index < tokens.length - 1
                      ? isDarkMode
                        ? "1px solid #334155"
                        : "1px solid #e2e8f0"
                      : "none",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor:
                        index === 0
                          ? "#627eea"
                          : index === 1
                          ? "#f7931a"
                          : index === 2
                          ? "#2775ca"
                          : "#14f195",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {token.symbol.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: "500" }}>{token.name}</div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: isDarkMode ? "#94a3b8" : "#64748b",
                      }}
                    >
                      {token.symbol}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" as "right" }}>
                  <div style={{ fontWeight: "500" }}>{token.price}</div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: token.change.includes("+")
                        ? "#10b981"
                        : token.change.includes("-")
                        ? "#ef4444"
                        : "#94a3b8",
                    }}
                  >
                    {token.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div
          style={{
            backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
            border: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            Recent Transactions
          </h2>
          <div>
            {recentTxs.map((tx, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom:
                    index < recentTxs.length - 1
                      ? isDarkMode
                        ? "1px solid #334155"
                        : "1px solid #e2e8f0"
                      : "none",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      backgroundColor: isDarkMode ? "#334155" : "#f1f5f9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                    }}
                  >
                    {tx.type === "Swap"
                      ? "💱"
                      : tx.type === "Transfer"
                      ? "📤"
                      : tx.type === "Stake"
                      ? "🏦"
                      : "🖼️"}
                  </div>
                  <div>
                    <div style={{ fontWeight: "500" }}>{tx.type}</div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontFamily: "monospace",
                        color: isDarkMode ? "#94a3b8" : "#64748b",
                      }}
                    >
                      {tx.hash}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" as "right" }}>
                  <div style={{ fontWeight: "500" }}>{tx.amount}</div>
                  <div
                    style={{
                      fontSize: "12px",
                      color:
                        tx.status === "confirmed"
                          ? "#10b981"
                          : tx.status === "pending"
                          ? "#f59e0b"
                          : "#ef4444",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor:
                          tx.status === "confirmed"
                            ? "#10b981"
                            : tx.status === "pending"
                            ? "#f59e0b"
                            : "#ef4444",
                      }}
                    ></div>
                    {tx.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending dApps */}
        <div
          style={{
            backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
            border: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>
              Trending dApps
            </h2>
            <span
              style={{
                fontSize: "12px",
                color: isDarkMode ? "#94a3b8" : "#64748b",
              }}
            >
              TVL
            </span>
          </div>
          <div>
            {trendingDapps.map((dapp, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom:
                    index < trendingDapps.length - 1
                      ? isDarkMode
                        ? "1px solid #334155"
                        : "1px solid #e2e8f0"
                      : "none",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      backgroundColor:
                        index === 0
                          ? "#ff007a20"
                          : index === 1
                          ? "#b6509e20"
                          : index === 2
                          ? "#2081e220"
                          : "#00d39520",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      color:
                        index === 0
                          ? "#ff007a"
                          : index === 1
                          ? "#b6509e"
                          : index === 2
                          ? "#2081e2"
                          : "#00d395",
                    }}
                  >
                    {dapp.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: "500" }}>{dapp.name}</div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: isDarkMode ? "#94a3b8" : "#64748b",
                      }}
                    >
                      {dapp.category}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" as "right" }}>
                  <div style={{ fontWeight: "500" }}>{dapp.tvl}</div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: isDarkMode ? "#94a3b8" : "#64748b",
                    }}
                  >
                    {dapp.users} users
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "40px",
          borderTop: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
          color: isDarkMode ? "#94a3b8" : "#64748b",
          fontSize: "12px",
        }}
      >
        <p>Powered by Blockchain • Real-time Data • Secure & Private</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "12px",
          }}
        >
          <span>🌐</span>
          <span>🔒</span>
          <span>⚡</span>
          <span>📊</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
