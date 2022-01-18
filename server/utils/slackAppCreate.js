import { App, ExpressReceiver } from "@slack/bolt";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
export const createApp = (appName) => {
  const signingSecret = process.env.SLACK_SIGNING_SECRET;
  const token =process.env.SLACK_BOT_TOKEN;
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

