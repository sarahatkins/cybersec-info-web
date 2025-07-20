// 1. Read Alison's email - it has a link to the hacker forums; on click launch stage 2
// 2. HackerForums - ProTraf ads?? QBot from LightSpeed; a lot of people talking about QBot - when you click on it, and scroll to the bottom
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
import { game_emails } from "./db";
// CaseFiles - full of hints of where you are and everything you have learnt
// Message from boss after email saying that you must find it out, and once you have figured it out
//      to send him the names - if you send him the wrong ones then he will be like nah


const GameMaster: React.FC = ({
}) => {
  const { gameStage, setGameStage } = useGame();
  // The GAME is just pushing things into an arr

 
  useEffect(() => {
    console.log(gameStage)
    switch (gameStage) {
      case 1:
       
        break;
      case 2:
       
        break;
      case 3:
        game_emails.unshift({
          id: game_emails.length++,
          sender: "search_engine_ceo@engimail.com",
          subject: "EMERGENCY: Social Media Down",
          summary: "To whom it may concern, This email is...",
          body: `<p>To whom it may concern,</p>
  <p>This email is to inform you that we have had some negative activity happening on one of our social media platforms.</p>
  <p>The well known hacker catcher: Brian Krebs is being repeatedly hit with a DDoS attack. Despite Akamai, the bot network performing this attack is taking him offline for several days.</p>
  <p>This is now leaking into our other platforms. We are hoping you can find who made this bot network and catch them before it is <bold>too late</bold>.</p>
  <p>Kindest regards,</p>
  <p>Search Engine CEO</p>`,
          date: "2025-07-16",
          isRead: false,
          folder: "Inbox",
        });
        console.log("New email alert")
        break;
    }
  }, [gameStage]);

  return null;
};

export default GameMaster;
