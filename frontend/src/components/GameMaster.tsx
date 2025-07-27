import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import {
  forumPosts,
  game_chat_users,
  game_emails,
  newsPosts,
  newsRotation,
  PLAYER_EMAIL,
  user_messages,
  type NewsPostInterface,
  type Person,
} from "./db";

// TODO: Casefiles, break internet, saving place

const GameMaster: React.FC = ({}) => {
  const { gameStage, setGameStage, setInternetBroken } = useGame();
  // The GAME is just pushing things into an arr
  const pushEmail = (emailData: any) => {
    game_emails.unshift({
      id: game_emails.length,
      isRead: false,
      folder: "Inbox",
      ...emailData,
    });
  };

  const pushEmailThread = (index: number, content: string) => {
    game_emails[index].thread.push({
      id: game_emails[index].thread.length,
      date: new Date().toISOString(),
      body: content,
    });
  };

  const pushChatMessage = (chatName: string, message: string) => {
    const user = game_chat_users.find((u) => u.name === chatName);
    const thread = user_messages.find(
      (m) => m.chat_with_id === user?.id
    )?.message_thread;
    if (user && thread) {
      thread.push({ from_id: user.id, content: message });
      console.log("hello");
    }
  };

  const addForumPost = (title: string, author: string, content = "") => {
    forumPosts.unshift({
      id: forumPosts.length,
      title,
      author: { id: 0, username: author },
      content,
      comments: [],
    });
  };

  const updateNewsCycle = (newPosts: NewsPostInterface[]) => {
    // Clear and replace news
    newsPosts.length = 0;
    newsPosts.push(...newPosts);
  };

  useEffect(() => {
    switch (gameStage) {
      case 0:
        // Set up...
        // Potentially where the help is launched

        break;
      case 1:
        pushEmailThread(
          0,
          `<p>Hey,</p>
            <p>Just breaking this down in plain terms so it's easier to follow.</p>

            <p><strong>What’s a DDoS attack?</strong></p>
            <ul>
              <li>DDoS = Distributed Denial of Service</li>
              <li>It's when a server or website gets flooded with so much traffic that it slows down or crashes</li>
              <li>The traffic comes from lots of infected devices around the world, not just one source</li>
              <li>It’s like sending thousands of people to a shop at once so real customers can’t get in</li>
            </ul>

            <p><strong>What’s QBot?</strong></p>
            <ul>
              <li>QBot is a piece of malware (a worm) that spreads across the internet</li>
              <li>It infects poorly secured devices like routers and security cameras</li>
              <li>Once infected, those devices become part of a botnet - a network controlled by the attacker</li>
              <li>QBot can be used to launch DDoS attacks, act as proxies, or spread to other systems</li>
            </ul>

            <p>So in short: QBot creates the army, and DDoS is what that army can be used for.</p>
            <p>I have some researcher friends who have set up a "honeypot" - a device which aims to get infected - so that they
            can analyse the logs. I'll have them reach out to you!</p>
            
            <p>Hope that helps clear things up.<br/>Best,<br/>Alison</p>`
        );
        setGameStage(2);
        break;
      case 2:
        // Message from researchers - sound, and notification bullet
        //    Should give you a command to run in the terminal
        //    Message back with the correct thing - the different things
        setTimeout(() => {
          pushEmail({
            sender: "alison@cybersec.com",
            receiver: PLAYER_EMAIL,
            subject: "Researchers Reaching Out",
            thread: [
              {
                id: 0,
                body: `<p>Hey!</p>
                <p>Just reaching out to let you know I have talked to the researchers. They should have messaged you in the <strong>Chat App</strong>.</p>
                <p>Be sure to check it out!</p>
                <p>Best of luck with your future research,</br>Alison.`,
                date: "2025-07-16",
              },
            ],
            summary: "Akamai has been overwhelmed...",
          });

          const researcher: Person = {
            id: game_chat_users.length,
            name: "Researchers",
            avatar: ":0",
          };
          game_chat_users.push(researcher);

          user_messages.push({
            chat_with_id: researcher.id,
            message_thread: [
              {
                from_id: researcher.id,
                content:
                  "Hello, Alison let us know you are interested in learning about QBots. She should have let you know about us.",
              },
            ],
          });
          pushChatMessage(
            "Researchers",
            'We have a honey pot we call "sad DVR" that we let hackers infect with QBot code.'
          );
          pushChatMessage(
            "Researchers",
            "Would you like to have a look at the logs?"
          );
          pushChatMessage("Researchers", "Let us know.");
        }, 5000);
        break;

      case 3:
        pushChatMessage(
          "Researchers",
          "Alright, if you open up and run this command: ./watchtower --mode honeypot"
        );
        pushChatMessage(
          "Researchers",
          "It should download and fetch the logs for you."
        );
        pushChatMessage("Researchers", "Message me back with what you find.");
        break;
      case 4:
        pushChatMessage(
          "Researchers",
          "The honeypot logs show signs of a botnet turf war playing out in real time."
        );
        pushChatMessage(
          "Researchers",
          "First, Mirai tried to infect the system through Telnet and SSH using default credentials. It attempted to plant its malware (we saw a BusyBox binary match). The hackers are aiming to enlist the device into its DDoS botnet army."
        );
        pushChatMessage(
          "Researchers",
          "Shortly after, another actor - remnants of the old vDOS botnet (before its creators were arrested) - tried to overwrite the Mirai binary. It used a different infection script and attempted to uninstall Mirai before deploying its own payload."
        );
        pushChatMessage(
          "Researchers",
          "Mirai fought back, replanting its binary and triggering a counter-flash. This has been happening for a while. The two armies have been competing for a while, overwriting each other and constantly re-infecting targets."
        );
        pushChatMessage(
          "Researchers",
          "No infections succeeded on our side, but the behavior highlights how fast these networks are evolving since the vDOS arrests. Mirai has started gaining ground and is aggressively wiping out competitors to dominate the DDoS landscape."
        );
        pushChatMessage(
          "Researchers",
          "Poor sadDVR - not made for all this war."
        );
        setTimeout(() => {
          pushChatMessage("Boss", "Check your email. It's important.");
          pushChatMessage("Boss", "Message back ASAP.");
          setGameStage(5);
        }, 1500);
        break;
      case 5:
        // Email from GOOGLE
        pushEmail({
          sender: "security-team@google.com",
          receiver: PLAYER_EMAIL,
          subject: "URGENT: Assistance Needed to Track Mirai Botnet Attack",
          thread: [
            {
              id: 0,
              body: `<p>To whom it may concern,</p>
              <p>We are currently responding to a massive DDoS attack targeting Brian Krebs’s website, <em>KrebsOnSecurity</em>. Akamai, his hosting provider and a major content delivery network (CDN) specializing in DDoS mitigation, was unable to sustain the scale of the assault, forcing them to step back.</p>  
              <p>Google has now stepped in to protect the site via Project Shield, but the attack continues unabated. This attack is being powered by the Mirai botnet — a rapidly spreading network of compromised IoT devices exploiting default credentials such as routers, IP cameras, and DVRs.</p>
              <p>Mirai’s botnet is aggressively taking over infected devices, apparently fighting for control against other botnets. The full extent of the threat is still unknown, and we urgently need assistance in identifying infection points and tracking command-and-control infrastructure.</p>
              <p>We have also notified your supervisor to ensure coordination at all levels.</p>
              <p>Please provide any relevant data or logs you may have as soon as possible. This is a high-priority security incident.</p>
              <p>Thank you for your prompt attention.</p>
              <p>Sincerely,<br/>Google Security Response Team</p>`,
              date: "2025-07-16",
            },
          ],
          summary:
            "Google requests urgent help to track Mirai botnet after Akamai drops Krebs.",
        });

        const brian_krebbs_news: NewsPostInterface = {
          id: newsPosts.length,
          title:
            "Massive DDoS Attack Knocks Cyber Journalist Brian Krebs Offline",
          author: "WIRED",
          summary:
            "A record-breaking DDoS attack using the Mirai botnet has taken down KrebsOnSecurity, the website of investigative journalist Brian Krebs. The source of the attack remains unknown, but experts say it signals a dangerous new era in IoT-powered cyberattacks.",
          content: `<p>In September 2016, Brian Krebs, the investigative journalist behind KrebsOnSecurity, was hit by one of the largest distributed denial-of-service (DDoS) attacks ever recorded. The assault, which peaked at over 620 gigabits per second, forced his website offline after his DDoS protection provider, Akamai, withdrew its support due to the attack's scale and cost.</p>
          <p>The attack appears to have been carried out using a newly identified botnet known as <strong>Mirai</strong>, which hijacks Internet of Things (IoT) devices such as unsecured routers, IP cameras, and DVRs. Security researchers say the botnet is composed of hundreds of thousands of compromised systems, many of which are running outdated or default software.</p>
          <p>At this point, the identity of the attackers remains unknown. Some believe it may be retaliation for Krebs's reporting on the DDoS-for-hire industry, which has led to several recent arrests. Others suggest it may be a broader warning-or a demonstration of Mirai's capabilities.</p>
          <p>The source of the Mirai botnet traffic is still being analyzed, but early investigations suggest it was remarkably sophisticated and highly distributed, leveraging consumer-grade devices in dozens of countries. Experts warn that unless IoT security improves rapidly, more attacks like this are likely.</p>
          <p>“This was a shot across the bow,” one researcher noted. “Whoever did this wanted to prove they could take down one of the most resilient independent security sites on the web.”</p>
          <p>This story is developing. For more updates, follow KrebsOnSecurity and emerging reports from security researchers monitoring Mirai's activity.</p>
          `,
          breaking: true,
        };
        newsPosts[0].breaking = false;
        newsPosts.unshift(brian_krebbs_news);

        pushChatMessage("Boss", "Google has reached out.");
        pushChatMessage(
          "Boss",
          "Your new task is to figure out who has made the Mirai botnet. The researchers are working with you to figure this all out."
        );
        pushChatMessage(
          "Boss",
          "Report back to me when you have it figured out."
        );

        pushChatMessage(
          "Researchers",
          "We understand that Google has reached out to you about Brian Krebbs. We are with you whilst you try to figure this out."
        );
        pushChatMessage(
          "Researchers",
          "First, we think it might be best if you look into this news article to get a better understanding of the situation: news.com"
        );
        pushChatMessage(
          "Researchers",
          "We'll message if there have been any updates."
        );
        break;
      case 6:
        pushChatMessage(
          "Researchers",
          "We got in contact with someone in Alaska who has a device infected with Mirai."
        );
        pushChatMessage(
          "Researchers",
          "Their security camera DVR has been a host and we think the logs might reveal something..."
        );
        pushChatMessage(
          "Researchers",
          "Here is the logs: ./alaskan-security-camera-dvr --mode infectionLogs"
        );
        pushChatMessage("Researchers", "Message back with what you find.");
        break;

      case 7:
        // MENTION SOME OF THE BACKSTORY BEHIND BACKCONNECT
        pushChatMessage(
          "Researchers",
          "We noticed the BackConnect involvement. They are a cybersecurity company known for its anti-DDoS services and threat intelligence. "
        );
        pushChatMessage(
          "Researchers",
          "Hackers sometimes misuse services like BackConnect as a proxy or VPN layer to hide their true locations, making attacks harder to trace. "
        );
        pushChatMessage(
          "Researchers",
          "Given the complexity of the Mirai botnet attacks detailed in the WIRED article, contacting BackConnect might provide valuable network insights or assistance in tracing malicious traffic. "
        );
        pushChatMessage(
          "Researchers",
          "You might want to send them an email to find out what they know about Mirai. Here is their email address: backconnect@backconnect.com"
        );
        break;
      case 8:
        // Email from BackConnect emailing you to let you know about Paras and stuff
        //      With link to website in case you haven't found it before (??
        const backConnectEmailThread = game_emails.findIndex(
          (e) =>
            e.sender === PLAYER_EMAIL &&
            e.receiver === "backconnect@backconnect.com"
        );
        pushEmailThread(
          backConnectEmailThread,
          `<p>Hello,</p>
            <p>We want to clarify that BackConnect was previously used—via a BGP hijack—to host servers associated with the Mirai botnet, as reported in the recent WIRED article. Since then, we have taken steps to cease any such hosting and have distanced ourselves from those operations.</p>
            <p>While we do not have current involvement with Mirai, one of our acquaintances maintains contact with Paras Jha, a cofounder of ProTraf Solutions, who has been linked to Mirai’s development.</p>
            <p>You might consider reaching out to ProTraf for more direct insights. Their website and contact information are publicly available at <a href="https://protraf.com" target="_blank">protraf.com</a>.</p>
            <p>We hope this information assists your investigation.</p>
            <p>Best regards,<br/>
            BackConnect Security Team</p>`
        );

        break;
      case 9:
        // Email from Paras saying that he has nothing to do with it
        // TODO:
        const parasEmailIndex = game_emails.findIndex(
          (e) =>
            e.sender === PLAYER_EMAIL && e.receiver === "paras.jha@protraf.com"
        );
        pushEmailThread(
          parasEmailIndex,
          `
        <p>Hello,</p>
        <p>Thanks for reaching out. We do know about Mirai, they tried to extort one of my former customers.</p> 
        <p>I want to clarify that I do not know the identity of the person who attempted that.</p>
        <p>I will ask around within my contacts and see if I can learn anything more relevant to your inquiry. I’ll get back to you if I find anything useful.</p>
        <p>Best,<br/>
        Paras Jha</p>
      `
        );
        // Wait a certain amount of seconds and send Mirai code
        // Wait a bit more - send message from team saying bad news, mirai code leaked
        //      You must check the forum and find the code
        setTimeout(() => {
          addForumPost(
            "Mirai Code OFFICIALLY RELEASED",
            "Anna-Senpai",
            `<p>So today, I have an amazing release for you.</p>
            <p>I've got the source code for the Mirai botnet available here. This malware exploits IoT devices like routers, cameras, and DVRs to launch massive DDoS attacks.</p>

            <p>Use it responsibly — or at your own risk.</p>
            <pre><code>
            // Mirai infection vector - Telnet brute force
            void infect_target(char *ip) {
                if (telnet_login(ip, "ro•••", "xc3••") || telnet_login(ip, "adm••", "12•••")) {
                    deploy_payload(ip);
                }
            }

            // Payload deploy
            void deploy_payload(char *ip) {
                // Upload and execute malware binary
                up•••(ip, "/tmp/mir•••");
                ex•••(ip, "/tmp/mir•••");
            }

            // Command & Control connection setup
            void cnc_connect(char *server) {
                // Connect to C&C ser

            .....
            </code></pre>
          `
          );
          pushChatMessage("Researchers", "YOU NEED TO CHECK THE HACKER FORUM");
        }, 5000);
        break;

      case 10:
        pushChatMessage(
          "Researchers",
          "We found an IP address. It's is linked to someone named Josiah White."
        );
        break;
      case 11:
        // Josiah Emails and says he doesn't want to answer more questions
        const josiahEmailIndex = game_emails.findIndex(
          (e) =>
            e.sender === PLAYER_EMAIL &&
            e.receiver === "josiahwhite@protrafsol.com"
        );
        pushEmailThread(
          josiahEmailIndex,
          `<p>Hey,</p>
            <p>To answer at least some of your questions...</p>
            <p>I did some scanning of the internet, but I have not done anything criminal.</p>
            <p>I do not wish to answer any more personal questions.</p>
            <p>Thanks,</br>Josiah</p>`
        );

        // Researchers asking what he said
        pushChatMessage("Researchers", "What did he say?");
        break;
      case 12:
        // MESSAGE - Hold tight
        pushChatMessage("Researchers", "HOLD TIGHT");

        // Wait and tehn break the internet
        setInternetBroken(true);

        // WAIT and then message about what is happening
        setTimeout(() => {
          pushChatMessage(
            "Researchers",
            "Did you get this message? Please respond yes if so!"
          );
        }, 3000);
        break;
      case 13:
        updateNewsCycle(newsRotation);
        setInternetBroken(false);

        setTimeout(() => {
          pushChatMessage(
            "Researchers",
            "You might want to check the news. But it seems like Paras and Josiah are on the right track..."
          );
          pushChatMessage("Boss", "What have you found out?");
        }, 3000);

        break;
      case 13:
        // End screen
        // Epilogue

        break;
    }
  }, [gameStage]);

  return null;
};

export default GameMaster;
