import { createApp } from './utils/slackAppCreate';
import router from "./api"
import standUpViewItems from './utils/standUpViewItems';
const { app, receiver } = createApp('slack');//function won't use the name

receiver.router.use('/api',router)//if request path is https//..../api check go api for express  
app.message('hello app-a', async ({ body, say }) => {
  await say(`Hey there, I'm app-a`);
});

// Bring yesterday data from DB and create checboxOptions format
const yesterdayEvents = [
  { id: "value-1", task: "I will continue working on React Routes" },
  {
    id: "value-2",
    task: "fetching the data from our api and rendering the page according to it",
  },
  { id: "value-3", task: "I'll create a sketch for React Routes" },
  { id: "value-4", task: "my plan 4" },
  { id: "value-5", task: "my plan 5" },
  { id: "value-6", task: "my plan 6" },
];

//SHORTCUT
//ADD command permission
app.shortcut("lunch_daily_brief", async ({ shortcut, ack, client }) => {
  try {
    // Acknowledge the action
    await ack();
    const viewItems = standUpViewItems(yesterdayEvents);
    const result = await client.views.open({
      trigger_id: shortcut.trigger_id,
      view: viewItems,
    });
    // console.log(result);//later you can send message
  } catch (error) {
    console.log(error);
  }
});

// Listen for view_submission modal events
// Handle a view_submission request
app.view("standup_callback_id", async ({ ack, body, view, client, logger }) => {
  // Acknowledge the view_submission request
  await ack();

  // Do whatever you want with the input data - here we're saving it to a DB then sending the user a verifcation of their submission

  // array of checked object
  const complatedTodosOfYesterday =
    view.state.values["yesterday_input_container"]["checkboxes-action"]
      .selected_options;
  // console.log({ complatedTodosOfYesterday });
  // console.log("*******");
  //array of input area texts(if there is 2 enter for next line it will be empty, handle it later)
  const todaysToDos = view.state.values["today_input_container_big"][
    "plain_text_input-action"
  ].value
    .split("\n")
    .filter((item) => item);
  // console.log({ todaysToDos });

  // // Message to send user
  let msg = "";
  // // Save to DB
  // const results = await db.set(user.input, val);

  if (true) {
    // DB save was successful

    msg = `Summary\n yesterday you complated ${complatedTodosOfYesterday.length} items\nToday, your tasks are;\n`;

    todaysToDos.forEach((task) => {
      msg += `- ${task}\n`;
    });
    msg += `Thank you <@${body.user.id}> your submission was successful`;
  } else {
    msg = "There was an error with your submission";
  }

  // Message the user
  try {
    await client.chat.postMessage({
      channel: body.user.id,
      text: msg,
    });
  } catch (error) {
    logger.error(error);
  }
});

// Listen for an event from the Events API
app.event("app_mention", async ({ message, say }) => {
  await say(":military_helmet: YES SIR!!! :military_helmet:");
});

// Listens for messages containing "knock knock" and responds with an italicized "who's there?"
app.message("knock knock", async ({ message, say }) => {
  await say(`_Who's there?_`);
});

export { receiver };