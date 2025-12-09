import React, { useState, useEffect } from 'react';

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: number;
  timestamp: string;
  status: 'confirmed' | 'pending' | 'failed';
  fee: number;
}

interface Block {
  number: number;
  timestamp: string;
  transactions: number;
  miner: string;
  size: number;
  reward: number;
}

interface Wallet {
  address: string;
  balance: number;
  valueUSD: number;
  tokens: { symbol: string; balance: number; value: number }[];
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalTransactions: 0,
    activeAddresses: 0,
    networkHashrate: 0,
    avgBlockTime: 0,
    gasPrice: 0,
    marketCap: 0
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      hash: '0xabc123...',
      from: '0x123abc...',
      to: '0x456def...',
      value: 1.5,
      timestamp: '2 min ago',
      status: 'confirmed',
      fee: 0.002
    },
    {
      hash: '0xdef456...',
      from: '0x789ghi...',
      to: '0x012jkl...',
      value: 0.8,
      timestamp: '5 min ago',
      status: 'pending',
      fee: 0.003
    },
    {
      hash: '0xghi789...',
      from: '0x345mno...',
      to: '0x678pqr...',
      value: 2.3,
      timestamp: '10 min ago',
      status: 'confirmed',
      fee: 0.0015
    },
    {
      hash: '0xjkl012...',
      from: '0x901stu...',
      to: '0x234vwx...',
      value: 1500,
      timestamp: '15 min ago',
      status: 'confirmed',
      fee: 0.005
    },
    {
      hash: '0xmno345...',
      from: '0x567yz0...',
      to: '0x890123...',
      value: 25,
      timestamp: '20 min ago',
      status: 'failed',
      fee: 0.001
    }
  ]);

  const [blocks, setBlocks] = useState<Block[]>([
    {
      number: 1567890,
      timestamp: '2 min ago',
      transactions: 145,
      miner: '0xminer1...',
      size: 128,
      reward: 2.1
    },
    {
      number: 1567889,
      timestamp: '4 min ago',
      transactions: 89,
      miner: '0xminer2...',
      size: 96,
      reward: 2.0
    },
    {
      number: 1567888,
      timestamp: '6 min ago',
      transactions: 167,
      miner: '0xminer3...',
      size: 142,
      reward: 2.2
    },
    {
      number: 1567887,
      timestamp: '8 min ago',
      transactions: 112,
      miner: '0xminer4...',
      size: 118,
      reward: 2.0
    },
    {
      number: 1567886,
      timestamp: '10 min ago',
      transactions: 98,
      miner: '0xminer5...',
      size: 105,
      reward: 1.9
    }
  ]);

  const [wallet, setWallet] = useState<Wallet>({
    address: '0x742d35Cc6634C0532925a3b844Bc9eE0a43C3d97',
    balance: 2.5,
    valueUSD: 8250.50,
    tokens: [
      { symbol: 'ETH', balance: 2.5, value: 8250.50 },
      { symbol: 'USDC', balance: 1500, value: 1500 },
      { symbol: 'UNI', balance: 50, value: 325 }
    ]
  });

  const [network, setNetwork] = useState('ethereum');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('transactions');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    setStats({
      totalTransactions: 1456789 + Math.floor(Math.random() * 1000),
      activeAddresses: 89234 + Math.floor(Math.random() * 100),
      networkHashrate: 245.6,
      avgBlockTime: 12.3,
      gasPrice: 45 + Math.floor(Math.random() * 20),
      marketCap: 425000000000
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      fetchStats();
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(2)}`;
  };

  const getTokenColor = (symbol: string) => {
    switch (symbol) {
      case 'ETH': return '#627eea';
      case 'USDC': return '#2775ca';
      case 'UNI': return '#ff007a';
      default: return '#8b5cf6';
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Blockchain Dashboard</h1>
          <p style={styles.subtitle}>Real-time monitoring for {network}</p>
        </div>
        <div style={styles.headerControls}>
          <select 
            value={network} 
            onChange={(e) => setNetwork(e.target.value)}
            style={styles.select}
          >
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="arbitrum">Arbitrum</option>
            <option value="optimism">Optimism</option>
          </select>
          <button 
            style={{...styles.button, opacity: isRefreshing ? 0.7 : 1}}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? '🔄 Refreshing...' : '🔄 Refresh'}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search address, transaction, or block..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statTitle}>Total Transactions</span>
            <span>📊</span>
          </div>
          <div style={styles.statValue}>{stats.totalTransactions.toLocaleString()}</div>
          <div style={styles.statChange}>↑ 2.5%</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statTitle}>Active Addresses</span>
            <span>👥</span>
          </div>
          <div style={styles.statValue}>{stats.activeAddresses.toLocaleString()}</div>
          <div style={styles.statChange}>↑ 1.8%</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statTitle}>Network Hashrate</span>
            <span>⚡</span>
          </div>
          <div style={styles.statValue}>{stats.networkHashrate} TH/s</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statTitle}>Gas Price</span>
            <span>⛽</span>
          </div>
          <div style={styles.statValue}>{stats.gasPrice} Gwei</div>
          <div style={{...styles.statChange, color: '#ef4444'}}>↑ 5.2%</div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left Column - Chart & Transactions */}
        <div style={styles.leftColumn}>
          {/* Network Activity */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Network Activity</h2>
              <div style={styles.timeFilters}>
                <button style={styles.timeButtonActive}>24H</button>
                <button style={styles.timeButton}>7D</button>
                <button style={styles.timeButton}>30D</button>
              </div>
            </div>
            <div style={styles.chartContainer}>
              {/* Simple chart using divs */}
              <div style={styles.chart}>
                {[12, 18, 25, 32, 28, 21, 15].map((height, index) => (
                  <div key={index} style={styles.chartBarContainer}>
                    <div style={{...styles.chartBar, height: `${height * 5}px`}}></div>
                    <div style={styles.chartLabel}>{['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'][index]}</div>
                  </div>
                ))}
              </div>
              <div style={styles.chartLegend}>
                <div style={styles.legendItem}>
                  <div style={{...styles.legendColor, backgroundColor: '#8b5cf6'}}></div>
                  <span style={styles.legendText}>TPS</span>
                </div>
                <div style={styles.legendItem}>
                  <div style={{...styles.legendColor, backgroundColor: '#10b981'}}></div>
                  <span style={styles.legendText}>Gas Price</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions/Blocks Tabs */}
          <div style={styles.card}>
            <div style={styles.tabs}>
              <button 
                style={activeTab === 'transactions' ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab('transactions')}
              >
                Recent Transactions
              </button>
              <button 
                style={activeTab === 'blocks' ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab('blocks')}
              >
                Recent Blocks
              </button>
            </div>

            {activeTab === 'transactions' ? (
              <div style={styles.tableContainer}>
                <div style={styles.tableHeader}>
                  <div style={styles.tableHeaderCell}>TX Hash</div>
                  <div style={styles.tableHeaderCell}>From</div>
                  <div style={styles.tableHeaderCell}>To</div>
                  <div style={styles.tableHeaderCell}>Value</div>
                  <div style={styles.tableHeaderCell}>Status</div>
                </div>
                {transactions.map((tx, index) => (
                  <div key={index} style={styles.tableRow}>
                    <div style={styles.tableCell}>
                      <div style={styles.hash}>{tx.hash}</div>
                    </div>
                    <div style={styles.tableCell}>
                      <div style={styles.address}>{tx.from}</div>
                    </div>
                    <div style={styles.tableCell}>
                      <div style={styles.address}>{tx.to}</div>
                    </div>
                    <div style={styles.tableCell}>
                      <div style={styles.value}>{tx.value} {tx.value > 100 ? 'USDC' : 'ETH'}</div>
                      <div style={styles.fee}>Fee: {tx.fee} ETH</div>
                    </div>
                    <div style={styles.tableCell}>
                      <span style={{...styles.status, backgroundColor: getStatusColor(tx.status) + '20', color: getStatusColor(tx.status)}}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.tableContainer}>
                <div style={styles.tableHeader}>
                  <div style={styles.tableHeaderCell}>Block #</div>
                  <div style={styles.tableHeaderCell}>Transactions</div>
                  <div style={styles.tableHeaderCell}>Miner</div>
                  <div style={styles.tableHeaderCell}>Size</div>
                  <div style={styles.tableHeaderCell}>Reward</div>
                </div>
                {blocks.map((block, index) => (
                  <div key={index} style={styles.tableRow}>
                    <div style={styles.tableCell}>
                      <div style={styles.blockNumber}>#{block.number}</div>
                    </div>
                    <div style={styles.tableCell}>
                      <div style={styles.txCount}>{block.transactions}</div>
                    </div>
                    <div style={styles.tableCell}>
                      <div style={styles.address}>{block.miner}</div>
                    </div>
                    <div style={styles.tableCell}>
                      <div style={styles.size}>{block.size} KB</div>
                    </div>
                    <div style={styles.tableCell}>
                      <div style={styles.reward}>{block.reward} ETH</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Wallet */}
        <div style={styles.rightColumn}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Wallet Balance</h2>
              <button style={styles.copyButton}>📋</button>
            </div>
            
            <div style={styles.walletAddress}>
              {wallet.address.substring(0, 8)}...{wallet.address.substring(wallet.address.length - 4)}
            </div>

            <div style={styles.walletBalance}>
              <div style={styles.totalBalance}>
                ${wallet.valueUSD.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </div>
              <div style={styles.ethBalance}>{wallet.balance} ETH</div>
            </div>

            {/* Token Distribution */}
            <div style={styles.tokenDistribution}>
              <h3 style={styles.sectionTitle}>Token Distribution</h3>
              <div style={styles.pieChart}>
                {/* Simple pie chart using concentric circles */}
                <div style={styles.pieChartInner}>
                  <div style={styles.pieSegment1}></div>
                  <div style={styles.pieSegment2}></div>
                  <div style={styles.pieSegment3}></div>
                  <div style={styles.pieChartCenter}></div>
                </div>
              </div>
              <div style={styles.tokenList}>
                {wallet.tokens.map((token, index) => (
                  <div key={index} style={styles.tokenItem}>
                    <div style={styles.tokenInfo}>
                      <div style={{...styles.tokenDot, backgroundColor: getTokenColor(token.symbol)}}></div>
                      <span style={styles.tokenSymbol}>{token.symbol}</span>
                    </div>
                    <div style={styles.tokenValues}>
                      <div style={styles.tokenBalance}>{token.balance} {token.symbol}</div>
                      <div style={styles.tokenValue}>${token.value.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.walletActions}>
              <button style={styles.actionButton}>💱 Swap</button>
              <button style={styles.actionButton}>📤 Send</button>
              <button style={styles.actionButton}>📥 Receive</button>
            </div>
          </div>

          {/* Network Status */}
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Network Status</h3>
            <div style={styles.statusInfo}>
              <div style={styles.statusRow}>
                <span style={styles.statusLabel}>Status:</span>
                <span style={styles.statusValue}>
                  <span style={{...styles.statusDot, backgroundColor: '#10b981'}}></span>
                  Online
                </span>
              </div>
              <div style={styles.statusRow}>
                <span style={styles.statusLabel}>Peers:</span>
                <span style={styles.statusValue}>42</span>
              </div>
              <div style={styles.statusRow}>
                <span style={styles.statusLabel}>Sync:</span>
                <span style={styles.statusValue}>95%</span>
              </div>
            </div>
            <div style={styles.progressBar}>
              <div style={{...styles.progressFill, width: '95%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#111827',
    minHeight: '100vh',
    color: '#f9fafb',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: '14px'
  },
  headerControls: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  select: {
    backgroundColor: '#1f2937',
    color: '#f9fafb',
    border: '1px solid #374151',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '14px'
  },
  button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  searchContainer: {
    marginBottom: '24px'
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#1f2937',
    color: '#f9fafb',
    border: '1px solid #374151',
    padding: '10px 16px',
    borderRadius: '6px',
    fontSize: '14px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
    borderRadius: '8px',
    padding: '16px'
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  statTitle: {
    color: '#9ca3af',
    fontSize: '14px'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  statChange: {
    color: '#10b981',
    fontSize: '12px'
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '24px'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '24px'
  },
  card: {
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
    borderRadius: '8px',
    padding: '20px'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600'
  },
  timeFilters: {
    display: 'flex',
    gap: '8px'
  },
  timeButton: {
    backgroundColor: '#374151',
    color: '#9ca3af',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  timeButtonActive: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  chartContainer: {
    marginTop: '20px'
  },
  chart: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '20px',
    height: '200px',
    padding: '20px 0'
  },
  chartBarContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    flex: '1'
  },
  chartBar: {
    width: '20px',
    backgroundColor: '#8b5cf6',
    borderRadius: '4px 4px 0 0',
    marginBottom: '8px'
  },
  chartLabel: {
    fontSize: '12px',
    color: '#9ca3af'
  },
  chartLegend: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  legendColor: {
    width: '12px',
    height: '12px',
    borderRadius: '2px'
  },
  legendText: {
    fontSize: '12px',
    color: '#9ca3af'
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #374151',
    marginBottom: '16px'
  },
  tab: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    fontSize: '14px'
  },
  tabActive: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#3b82f6',
    cursor: 'pointer',
    fontSize: '14px',
    borderBottom: '2px solid #3b82f6'
  },
  tableContainer: {
    
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
    padding: '12px 16px',
    backgroundColor: '#374151',
    borderRadius: '4px',
    marginBottom: '8px'
  },
  tableHeaderCell: {
    fontSize: '12px',
    color: '#9ca3af',
    fontWeight: '500'
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
    padding: '12px 16px',
    borderBottom: '1px solid #374151',
    alignItems: 'center'
  },
  tableCell: {
    fontSize: '14px'
  },
  hash: {
    fontFamily: 'monospace',
    fontSize: '12px',
    color: '#3b82f6',
    cursor: 'pointer'
  },
  address: {
    fontFamily: 'monospace',
    fontSize: '12px',
    color: '#9ca3af'
  },
  value: {
    fontWeight: '500'
  },
  fee: {
    fontSize: '12px',
    color: '#9ca3af'
  },
  status: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500'
  },
  blockNumber: {
    color: '#3b82f6',
    fontWeight: '600'
  },
  txCount: {
    backgroundColor: '#374151',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    display: 'inline-block'
  },
  size: {
    fontSize: '14px'
  },
  reward: {
    color: '#10b981',
    fontWeight: '500'
  },
  copyButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '4px'
  },
  walletAddress: {
    backgroundColor: '#374151',
    padding: '8px 12px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '14px',
    marginBottom: '20px',
    cursor: 'pointer'
  },
  walletBalance: {
    marginBottom: '20px'
  },
  totalBalance: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  ethBalance: {
    fontSize: '18px',
    color: '#3b82f6'
  },
  tokenDistribution: {
    
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px'
  },
  pieChart: {
    position: 'relative' as 'relative',
    height: '150px',
    marginBottom: '20px'
  },
  pieChartInner: {
    position: 'relative' as 'relative',
    width: '150px',
    height: '150px',
    margin: '0 auto',
    borderRadius: '50%',
    overflow: 'hidden'
  },
  pieSegment1: {
    position: 'absolute' as 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#627eea',
    clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 50%)'
  },
  pieSegment2: {
    position: 'absolute' as 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#2775ca',
    clipPath: 'polygon(50% 50%, 100% 0%, 100% 100%, 0% 100%, 50% 50%)'
  },
  pieSegment3: {
    position: 'absolute' as 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#ff007a',
    clipPath: 'polygon(50% 50%, 100% 100%, 0% 100%, 0% 0%, 50% 50%)'
  },
  pieChartCenter: {
    position: 'absolute' as 'absolute',
    width: '75px',
    height: '75px',
    backgroundColor: '#1f2937',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  tokenList: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '12px'
  },
  tokenItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #374151'
  },
  tokenInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  tokenDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%'
  },
  tokenSymbol: {
    fontWeight: '500'
  },
  tokenValues: {
    textAlign: 'right' as 'right'
  },
  tokenBalance: {
    fontWeight: '500'
  },
  tokenValue: {
    fontSize: '12px',
    color: '#9ca3af'
  },
  walletActions: {
    display: 'flex',
    gap: '8px',
    marginTop: '20px'
  },
  actionButton: {
    flex: '1',
    backgroundColor: '#374151',
    color: '#f9fafb',
    border: 'none',
    padding: '10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  statusInfo: {
    marginBottom: '16px'
  },
  statusRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },
  statusLabel: {
    color: '#9ca3af'
  },
  statusValue: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%'
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#374151',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: '4px'
  }
};

export default Dashboard;