// 1. Read Alison's email - it has a link to the hacker forums; on click launch stage 2
// CaseFile: Seems like you have an email from Alison Read Alison's email
// 2. HackerForums - ProTraf ads?? QBot from LightSpeed; a lot of people talking about QBot - when you click on it, and scroll to the bottom
// CaseFile: It seems like this LightSpeed guy has a lot of traction - need to keep an eye on him
// QBot: Information on QBots
// Check your emails
// 3. Email from Google - describing the attacks and linking you with some people from research community
//        Specifically Akamai - one of the largest was hit
// 4. Message from researcher saying that they made a honeypot - a home router; just run this code to get the
//      results for what has hit it
// 5. From this you learn what Mirai is - you will get a message after running the code
//       They ask you to look into the forums and see if you can find anything
// 6. A post has been sent from someone asking if they have any devices infected with Mirai
//        They post some information - including the **IP address** of someone
// 7. Found that it had connections with BackConnect - so you message BackConnect and they
//        they give you information about ProTraf - link to it
// 8. ProTraf website has the email to people leading it - Josiah and Paras; you send them and email
// 9. This leads to the code being leaked on the forum
// 10. The Internet breaks - you get an article from the news
// 11. Message your coworkers - they inform you this probably means you are on the right track
//        Try sending them an email to see if they collaborate
//        They say that it is exactly what you think it is
// 12. Queue end where you get the rest of the story - and a link to the article you used

import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import { game_chat_users, game_emails, user_messages, type Person } from "./db";
// CaseFiles - full of hints of where you are and everything you have learnt
// Message from boss after email saying that you must find it out, and once you have figured it out
//      to send him the names - if you send him the wrong ones then he will be like nah

// TERMINAL:
// LOAD THE CODE GIVEN FOR THE HONEY POT TO RECEIVE THE LOGS
//

// LOGIC
// Each email chain has a link??

const GameMaster: React.FC = ({}) => {
  const { gameStage, setGameStage } = useGame();
  // The GAME is just pushing things into an arr

  useEffect(() => {
    console.log(gameStage);
    switch (gameStage) {
      case 0:
        // Set up...
        // Potentially where the help is launched

        break;
      case 1:
        // Send email sending hacker to forum and asking if anything is amiss
        game_emails[0].thread.push({
          id: game_emails.length,
          body: `<p>Hey,</p>
<p>Thanks for coming to my lecture.</p>
<p>Here is the link you requested: hackerforum.com</p>
<p>Alison</p>`,
          date: "2025-07-16",
        });
        console.log("Stage 1 started");
        break;
      case 2:
        // Send email corroborating everything you have said
        game_emails[0].thread.push({
          id: game_emails.length,
          body: `<p>Hey,</p>
                  <p>Thanks for coming to my lecture.</p>
                  <p>Here is the link you requested: hackerforum.com</p>
                  <p>Alison</p>`,
          date: "2025-07-16",
        });
        setGameStage(3);
        // Some researchers are reaching out
        break;
      case 3:
        // Message from researchers - sound, and notification bullet
        //    Should give you a command to run in the terminal
        //    Message back with the correct thing - the different things
        setTimeout(() => {
          game_emails.unshift({
            id: game_emails.length++,
            sender: "alison@cybersec.com",
            subject: "Some people should be reaching out",
            thread: [
              {
                id: 0,
                body: `<p>To whom it may concern,</p>
                      <p>This email is to inform you that we have had some negative activity happening on one of our social media platforms.</p>
                      <p>The well known hacker catcher: Brian Krebs is being repeatedly hit with a DDoS attack. Despite Akamai, the bot network performing this attack is taking him offline for several days.</p>
                      <p>This is now leaking into our other platforms. We are hoping you can find who made this bot network and catch them before it is <bold>too late</bold>.</p>
                      <p>Kindest regards,</p>
                      <p>Search Engine CEO</p>`,
                date: "2025-07-16",
              },
            ],
            summary: "To whom it may concern, This email is...",
            isRead: false,
            folder: "Inbox",
          });

          // Creating a new person
          const newPerson: Person = {
            id: game_chat_users.length,
            name: "Researchers",
            avatar: ":0",
          };

          game_chat_users.push(newPerson);

          user_messages.push({
            chat_with_id: newPerson.id,
            message_thread: [
              { from_id: newPerson.id, content: "Hello we are researchers" },
            ],
          });
        }, 5000);
        // Another email sent saying she has researchers that have a honey pot and logs you can look at
        //    Check your messages as they should've messaged you

        break;
      case 4:
        const messages = user_messages.find(
          (msg) => msg.chat_with_id === 2
        )?.message_thread;
        messages?.push({
          from_id: 2,
          content: "Corroboration",
        });
        // They will message back corroborating what you are saying
        break;
      case 5:
        // Email from GOOGLE
        game_emails.unshift({
          id: game_emails.length++,
          sender: "geegle@geegle.com",
          subject: "EMERGENCY",
          thread: [
            {
              id: 0,
              body: `<p>To whom it may concern,</p>
                      <p>This email is to inform you that we have had some negative activity happening on one of our social media platforms.</p>
                      <p>The well known hacker catcher: Brian Krebs is being repeatedly hit with a DDoS attack. Despite Akamai, the bot network performing this attack is taking him offline for several days.</p>
                      <p>This is now leaking into our other platforms. We are hoping you can find who made this bot network and catch them before it is <bold>too late</bold>.</p>
                      <p>Kindest regards,</p>
                      <p>Search Engine CEO</p>`,
              date: "2025-07-16",
            },
          ],
          summary: "To whom it may concern, This email is...",
          isRead: false,
          folder: "Inbox",
        });
        break;
      case 6:
        // Message from BOSS
        // MEssage from TEAM - here is some sample code
        //      FInding alaskan honey pot - thing and can look through code in terminal
        //      Find honey pot
        break;
      case 7:
        // Email from BackConnect emailing you to let you know about Paras and stuff
        //      With link to website in case you haven't found it before (??
        game_emails.unshift({
            id: game_emails.length++,
            sender: "backconnect@backconnect.com",
            subject: "We are back connect",
            thread: [
              {
                id: 0,
                body: `<p>To whom it may concern,</p>
                      <p>This email is to inform you that we have had some negative activity happening on one of our social media platforms.</p>
                      <p>The well known hacker catcher: Brian Krebs is being repeatedly hit with a DDoS attack. Despite Akamai, the bot network performing this attack is taking him offline for several days.</p>
                      <p>This is now leaking into our other platforms. We are hoping you can find who made this bot network and catch them before it is <bold>too late</bold>.</p>
                      <p>Kindest regards,</p>
                      <p>Search Engine CEO</p>`,
                date: "2025-07-16",
              },
            ],
            summary: "To whom it may concern, This email is...",
            isRead: false,
            folder: "Inbox",
          });
        break;
      case 8:
        // Email from Paras saying that he has nothing to do with it
        game_emails.unshift({
            id: game_emails.length++,
            sender: "paras@protrafsol.com",
            subject: "I got nothing to do with it",
            thread: [
              {
                id: 0,
                body: `<p>To whom it may concern,</p>
                      <p>This email is to inform you that we have had some negative activity happening on one of our social media platforms.</p>
                      <p>The well known hacker catcher: Brian Krebs is being repeatedly hit with a DDoS attack. Despite Akamai, the bot network performing this attack is taking him offline for several days.</p>
                      <p>This is now leaking into our other platforms. We are hoping you can find who made this bot network and catch them before it is <bold>too late</bold>.</p>
                      <p>Kindest regards,</p>
                      <p>Search Engine CEO</p>`,
                date: "2025-07-16",
              },
            ],
            summary: "To whom it may concern, This email is...",
            isRead: false,
            folder: "Inbox",
          });
        // Wait a certain amount of seconds and send Mirai code
        // Wait a bit more - send message from team saying bad news, mirai code leaked
        //      You must check the forum and find the code
        break;

      case 9:
        // Message from team saying they found the proto of Mirai that has the IP address linking
        // to Josiah

        break;
      case 10:
        // Josiah Emails and says he doesn't want to answer more questions

        break;
      case 11:
        // MESSAGE - Hold tight
        // Wait and tehn break the internet
        // WAIT and then message about what is happening
        // MESSAGE BOSS WITH WHAT YOU KNOW
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
