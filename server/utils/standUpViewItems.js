export default function standUpViewItems(yesterdayEvents) {
  const checboxOptions = yesterdayEvents.map((yesterdayEvent) => {
    //prepere checkboxes
    return {
      text: {
        type: "plain_text",
        text: yesterdayEvent.task,
        emoji: true,
      },
      value: yesterdayEvent.id,
    };
  });
  //prepare modal payload
  const view = {
    type: "modal",
    callback_id: "standup_callback_id",
    title: {
      type: "plain_text",
      text: "Daily Stand up Meeting",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "Submit",
      emoji: true,
    },
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "input",
        block_id: "yesterday_input_container",
        element: {
          type: "checkboxes",
          options: checboxOptions,
          action_id: "checkboxes-action",
        },
        label: {
          type: "plain_text",
          text: "Yesterdays task",
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      {
        type: "input",
        block_id: "today_input_container_big",
        element: {
          type: "plain_text_input",
          multiline: true,
          action_id: "plain_text_input-action",
        },
        label: {
          type: "plain_text",
          text: "Line break plans",
          emoji: true,
        },
      },
    ],
  };
  return view;
};

