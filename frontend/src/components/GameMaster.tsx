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
        // Send email sending hacker to forum and asking if anything is amiss
        // Information in email:
        // i've been investigating networks for attacks and i've been curious as to where these daily, wide-rangin hacking attempts have been coming from.
        // I've been googling and I discovered this hacker forum:
        // Forum link
        // It's a platform on the open web where seemingly young people brag about their attacks and sell their toolkits.
        // You can find the identity of some of these miscreants.
        // 
        pushEmailThread(
          0,
          `<p>Hey,</p>
            <p>You might be able to piece together who’s behind it by browsing through their posts. Keep your eyes open - some of these users are more careless with their identities than you'd expect.</p>
            <p>Best,<br/>Alison</p>`
        );
        break;
      case 2:
        // Send email corroborating everything you have said
        pushEmailThread(
          0,
          `<p>Yeah I agree with you!</p>
            `
            // Here is some other things I noticed, LiteSpeed is very prominent on the site - whilst there
            // are a lot of different bots they all stem from a few users - LiteSpeed being one of them. He
            // He might be someone to look out for. On top of that, most of these seem to be teenagers.
            // A lot of them have sites that you can look at - LiteSpeed I know has a site to sell his services.

            // I tseems to be a lot of botnets - like a battle of them. here are groups f young blackhats with names like Lizard Squad and 

            // I've been noticign 
        );
        setGameStage(3);
        // Some researchers are reaching out
        break;
      case 3:
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
                body: `<p>Akamai has been overwhelmed by DDoS attacks. We hope you can identify the botnet before it’s too late.</p>`,
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
              { from_id: researcher.id, content: "Hello, we are researchers." },
            ],
          });
        }, 5000);
        break;
      // Another email sent saying she has researchers that have a honey pot and logs you can look at
      //    Check your messages as they should've messaged you

      case 4:
        pushChatMessage("Researchers", "Corroboration");
        // They will message back corroborating what you are saying
        break;
      case 5:
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
      case 6:
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
      case 7:
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
      case 8:
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

      case 9:
        // Message from team saying they found the proto of Mirai that has the IP address linking
        pushChatMessage("Researchers", "We found IP address.");

        // to Josiah

        break;
      case 10:
        // Josiah Emails and says he doesn't want to answer more questions
        const josiahEmailIndex = game_emails.findIndex(
          (e) => e.sender === PLAYER_EMAIL && e.receiver === "josiah@josiah.com"
        );
        pushEmailThread(josiahEmailIndex, `<p>I did nothing</p>`);

        // Researchers asking what he said
        pushChatMessage("Researchers", "What did he say?");
        break;
      case 11:
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
      case 12:
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
      case 13:
        // End screen
        // Epilogue

        break;
    }
  }, [gameStage]);

  return null;
};

export default GameMaster;
