[
  {
    "port": 20,
    "service": "FTP-Data",
    "category": "CRITICAL",
    "severity_score": 15,
    "description": "FTP data channel",
    "recommended_action": "Disable FTP"
  },
  {
    "port": 21,
    "service": "FTP",
    "category": "CRITICAL",
    "severity_score": 20,
    "description": "Plaintext file transfer",
    "recommended_action": "Use SFTP"
  },
  {
    "port": 22,
    "service": "SSH",
    "category": "CRITICAL",
    "severity_score": 15,
    "description": "Remote shell access",
    "recommended_action": "Restrict via firewall or VPN"
  },
  {
    "port": 23,
    "service": "Telnet",
    "category": "CRITICAL",
    "severity_score": 25,
    "description": "Insecure remote login",
    "recommended_action": "Disable immediately"
  },
  {
    "port": 25,
    "service": "SMTP",
    "category": "MEDIUM",
    "severity_score": 7,
    "description": "Mail server",
    "recommended_action": "Restrict mail relay"
  },
  {
    "port": 53,
    "service": "DNS",
    "category": "MEDIUM",
    "severity_score": 5,
    "description": "DNS service",
    "recommended_action": "Disable open recursion"
  },
  {
    "port": 67,
    "service": "DHCP",
    "category": "CRITICAL",
    "severity_score": 15,
    "description": "Dynamic host configuration",
    "recommended_action": "Restrict to internal network"
  },
  {
    "port": 69,
    "service": "TFTP",
    "category": "CRITICAL",
    "severity_score": 20,
    "description": "Unauthenticated file transfer",
    "recommended_action": "Disable TFTP"
  },
  {
    "port": 80,
    "service": "HTTP",
    "category": "MEDIUM",
    "severity_score": 5,
    "description": "Unencrypted web traffic",
    "recommended_action": "Redirect to HTTPS"
  },
  {
    "port": 110,
    "service": "POP3",
    "category": "MEDIUM",
    "severity_score": 7,
    "description": "Mail retrieval",
    "recommended_action": "Use POP3S"
  },
  {
    "port": 111,
    "service": "RPC",
    "category": "CRITICAL",
    "severity_score": 20,
    "description": "Remote procedure calls",
    "recommended_action": "Disable public RPC"
  },
  {
    "port": 119,
    "service": "NNTP",
    "category": "MEDIUM",
    "severity_score": 5,
    "description": "Network news transfer",
    "recommended_action": "Disable if unused"
  },
  {
    "port": 123,
    "service": "NTP",
    "category": "MEDIUM",
    "severity_score": 5,
    "description": "Time synchronization",
    "recommended_action": "Restrict NTP access"
  },
  {
    "port": 137,
    "service": "NetBIOS-NS",
    "category": "CRITICAL",
    "severity_score": 15,
    "description": "Windows name service",
    "recommended_action": "Block NetBIOS"
  },
  {
    "port": 139,
    "service": "NetBIOS",
    "category": "CRITICAL",
    "severity_score": 20,
    "description": "Windows file sharing",
    "recommended_action": "Disable externally"
  },
  {
    "port": 143,
    "service": "IMAP",
    "category": "MEDIUM",
    "severity_score": 7,
    "description": "Mail access",
    "recommended_action": "Use IMAPS"
  },
  {
    "port": 161,
    "service": "SNMP",
    "category": "CRITICAL",
    "severity_score": 20,
    "description": "Network management",
    "recommended_action": "Disable public SNMP"
  },
  {
    "port": 389,
    "service": "LDAP",
    "category": "CRITICAL",
    "severity_score": 15,
    "description": "Directory service",
    "recommended_action": "Restrict access"
  },
  {
    "port": 443,
    "service": "HTTPS",
    "category": "SAFE",
    "severity_score": 0,
    "description": "Secure web traffic",
    "recommended_action": "Keep enabled"
  },
  {
    "port": 445,
    "service": "SMB",
    "category": "CRITICAL",
    "severity_score": 25,
    "description": "Windows SMB",
    "recommended_action": "Block public SMB"
  },
  {
    "port": 465,
    "service": "SMTPS",
    "category": "MEDIUM",
    "severity_score": 6,
    "description": "Secure SMTP",
    "recommended_action": "Allow only if needed"
  },
  {
    "port": 587,
    "service": "SMTP Submission",
    "category": "MEDIUM",
    "severity_score": 6,
    "description": "Mail submission",
    "recommended_action": "Restrict clients"
  },
  {
    "port": 636,
    "service": "LDAPS",
    "category": "MEDIUM",
    "severity_score": 6,
    "description": "Secure LDAP",
    "recommended_action": "Restrict access"
  },
  {
    "port": 993,
    "service": "IMAPS",
    "category": "SAFE",
    "severity_score": 0,
    "description": "Secure IMAP",
    "recommended_action": "Keep TLS enabled"
  },
  {
    "port": 995,
    "service": "POP3S",
    "category": "SAFE",
    "severity_score": 0,
    "description": "Secure POP3",
    "recommended_action": "Keep TLS enabled"
  },
  {
    "port": 2049,
    "service": "NFS",
    "category": "CRITICAL",
    "severity_score": 25,
    "description": "Network file system",
    "recommended_action": "Disable public NFS"
  },
  {
    "port": 3306,
    "service": "MySQL",
    "category": "CRITICAL",
    "severity_score": 25,
    "description": "Database service",
    "recommended_action": "Restrict DB access"
  },
  {
    "port": 5432,
    "service": "PostgreSQL",
    "category": "CRITICAL",
    "severity_score": 25,
    "description": "Database service",
    "recommended_action": "Restrict DB access"
  },
  {
    "port": 6379,
    "service": "Redis",
    "category": "CRITICAL",
    "severity_score": 30,
    "description": "In-memory database",
    "recommended_action": "Bind to localhost"
  },
  {
    "port": 8080,
    "service": "HTTP-Alt",
    "category": "MEDIUM",
    "severity_score": 7,
    "description": "Alternate web port",
    "recommended_action": "Restrict access"
  },
  {
    "port": 8443,
    "service": "HTTPS-Alt",
    "category": "MEDIUM",
    "severity_score": 5,
    "description": "Alternate HTTPS",
    "recommended_action": "Secure with auth"
  },
  {
    "port": 9200,
    "service": "Elasticsearch",
    "category": "CRITICAL",
    "severity_score": 30,
    "description": "Search engine API",
    "recommended_action": "Enable auth or block"
  },
  {
    "port": 27017,
    "service": "MongoDB",
    "category": "CRITICAL",
    "severity_score": 30,
    "description": "Database service",
    "recommended_action": "Bind to internal network"
  }
]