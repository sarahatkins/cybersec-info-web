import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import {
  forumPosts,
  game_chat_users,
  game_emails,
  newsPosts,
  newsRotation1,
  newsRotation2,
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
              <li>Once infected, those devices become part of a botnet — a network controlled by the attacker</li>
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
      // Another email sent saying she has researchers that have a honey pot and logs you can look at
      //    Check your messages as they should've messaged you

      case 3:
        pushChatMessage("Researchers", "Corroboration");
        // They will message back corroborating what you are saying
        break;
      case 4:
        // Email from GOOGLE
        pushEmail({
          sender: "geegle@geegle.com",
          receiver: PLAYER_EMAIL,
          subject: "EMERGENCY",
          thread: [
            {
              id: 0,
              body: `<p>Brian Krebs is under sustained attack. Akamai is losing control. We need help tracking the botnet.</p>`,
              date: "2025-07-16",
            },
          ],
          summary: "Brian Krebs is under attack...",
        });
        updateNewsCycle(newsRotation1);
        break;
      case 5:
        // Message from BOSS
        pushChatMessage(
          "Boss",
          "Let me know when you have found out who they are."
        );
        pushChatMessage("Researchers", "We found an Alaskan honeypot.");
        // MEssage from TEAM - here is some sample code
        //      FInding alaskan honey pot - thing and can look through code in terminal
        //      Find honey pot
        break;
      case 6:
        // Email from BackConnect emailing you to let you know about Paras and stuff
        //      With link to website in case you haven't found it before (??
        pushEmail({
          sender: "backconnect@backconnect.com",
          receiver: PLAYER_EMAIL,
          subject: "ProTraf Connection",
          thread: [
            {
              id: 0,
              body: `<p>We traced links to ProTraf. Check in with Josiah and Paras.</p>`,
              date: "2025-07-16",
            },
          ],
          summary: "Links to ProTraf...",
        });
        break;
      case 7:
        // Email from Paras saying that he has nothing to do with it
        // TODO:
        const parasEmailIndex = game_emails.findIndex(
          (e) => e.sender === PLAYER_EMAIL && e.receiver === "para@paras.com"
        );
        pushEmailThread(parasEmailIndex, `<p>I did nothing</p>`);
        // Wait a certain amount of seconds and send Mirai code
        // Wait a bit more - send message from team saying bad news, mirai code leaked
        //      You must check the forum and find the code
        setTimeout(() => {
          addForumPost("Mirai Code", "LiteSpeed");
        }, 5000);
        break;

      case 8:
        // Message from team saying they found the proto of Mirai that has the IP address linking
        pushChatMessage("Researchers", "We found IP address.");

        // to Josiah

        break;
      case 9:
        // Josiah Emails and says he doesn't want to answer more questions
        const josiahEmailIndex = game_emails.findIndex(
          (e) => e.sender === PLAYER_EMAIL && e.receiver === "josiah@josiah.com"
        );
        pushEmailThread(josiahEmailIndex, `<p>I did nothing</p>`);

        // Researchers asking what he said
        pushChatMessage("Researchers", "What did he say?");
        break;
      case 10:
        // MESSAGE - Hold tight
        pushChatMessage("Researchers", "HOLD TIGHT");

        // Wait and tehn break the internet
        setInternetBroken(true);

        // WAIT and then message about what is happening
        updateNewsCycle(newsRotation2);

        setTimeout(() => {
          pushChatMessage("Researchers", "Did you get this message?");
        }, 3000);
        break;
      case 11:
        setInternetBroken(false);
        updateNewsCycle(newsRotation2);

        setTimeout(() => {
          pushChatMessage(
            "Researchers",
            "Here is a link to an article describing what is happening"
          );
          pushChatMessage("Boss", "What have you found out?");
        }, 3000);

        break;
      case 12:
        // End screen
        // Epilogue

        break;
    }
  }, [gameStage]);

  return null;
};

export default GameMaster;
