import { App, ExpressReceiver } from "@slack/bolt";
import dotenv from "dotenv";
dotenv.config({ path: process.cwd() + "/.env" });
export const createApp = (appName) => {
  const signingSecret = process.env.SLACK_SIGNING_SECRET;
  console.log({ signingSecret });
  const token =process.env.SLACK_BOT_TOKEN;
  console.log({ token });
  const receiver = new ExpressReceiver({
    signingSecret,
    endpoints: {
      events: "/slack/events",// if you want to add another route use this https//...<appName>/slack/event
    },
  });

  const app = new App({
    token,
    receiver,
  });

  return { app, receiver };
};

