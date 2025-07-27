# How to Win the Game – Game Progression Guide

This guide explains how the game logic in `GameMaster.tsx` works, and what the player must do to complete the story. The game simulates a cybersecurity investigation centered around the **Mirai botnet**, DDoS attacks, and real-world inspired incidents.

---

## Objective

Investigate a wave of cyberattacks, analyze honeypot data, and uncover the truth behind the Mirai botnet using emails, chat logs, news, and terminal commands. Players progress through game stages by interacting with in-game systems.

---

## Game Stage Overview

The game uses a linear progression system defined by `gameStage` (from 1 to 14), managed through `useGame()` context. At each stage, new clues, emails, and chat messages are introduced.

| Stage | Description | Required Action |
|-------|-------------|-----------------|
| 1 | Alison sends an email explaining DDoS and QBot | Read the email |
| 2 | Researchers reach out via chat and Alison follows up | Read the email and chat |
| 3 | Terminal command introduced | Run `./watchtower --mode honeypot` |
| 4 | Researchers analyze logs and Google sends an emergency email | Read both email and chat |
| 5 | News post about the DDoS on Brian Krebs | Read the article |
| 6 | Researchers give a new terminal command | Run `./alaskan-security-camera-dvr --mode infectionLogs` |
| 7 | Researchers recommend emailing BackConnect | Email `backconnect@backconnect.com` |
| 8 | BackConnect responds, mentions ProTraf | Email `paras.jha@protraf.com` |
| 9 | Paras responds, and the Mirai source code is leaked in the hacker forum | Read the forum post |
| 10 | Researchers find IP linked to Josiah White | Email `josiah.white@protraf.com` |
| 11 | Josiah denies wrongdoing | Report to researchers |
| 12 | Internet goes offline | Respond “yes” in chat |
| 13 | News confirms global internet outage | Summarize findings to boss |
| 14 | Game ends | 🎉 Game complete |

---

## Core Mechanics

The following functions drive the game's story:

- `pushEmail(emailData)` – Add a new email thread.
- `pushEmailThread(index, message)` – Add a message to an existing email.
- `pushChatMessage(sender, message)` – Add a chat message to a thread.
- `addForumPost(title, author, content)` – Add a new forum post.
- `setInternetBroken(true)` – Simulate a DDoS-caused internet outage.
- `setGameFinished(true)` – End the game and show the epilogue.

---

## Developer Tips

- `GameMaster.tsx` must be mounted at all times; it's the game's narrative engine.
- The progression is **linear** and relies on advancing `gameStage` correctly.
- You can skip ahead in development by using `setGameStage(n)` in dev tools or the context.
- UI components (Email, Chat, Terminal, News) should reflect the shared game state.

---

## Summary of Win Conditions

| Stage | Key Interaction |
|-------|-----------------|
| 3     | Run honeypot terminal command |
| 6     | Run second terminal command |
| 7–10  | Email BackConnect → Paras → Josiah |
| 13    | React to internet blackout and check news |
| 14    | Report to boss to finish the game |

---

## Files Involved

- `GameMaster.tsx` – Controls all story state and progression.
- `db.ts` – Stores game data like users, emails, messages, forum posts.
- `Window.tsx` – Renders UI for email/chat/news, and terminal interaction.
- `GameContext.tsx` – Holds shared state like `gameStage`, `newEmail`, `internetBroken`.

---

## Thematic Summary

This game is a fictionalized dramatization of real-world cybersecurity incidents. It reflects the complexity of IoT threats and how investigative collaboration can lead to uncovering large-scale malicious operations.

---

> If you'd like to extend or modify the stages, simply add new cases to the `switch(gameStage)` inside `GameMaster.tsx`.

