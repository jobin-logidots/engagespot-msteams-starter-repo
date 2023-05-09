const { TurnContext, TeamsActivityHandler } = require("botbuilder");
import { EngagespotClient } from "@engagespot/node";

class BotActivityHandler extends TeamsActivityHandler {
  constructor() {
    super();

    // Registers an activity event handler for the message event, emitted for every incoming message activity.
    this.onMessage(async (context, next) => {
      TurnContext.removeRecipientMention(context.activity);
      const text = context.activity.text.trim().toLocaleLowerCase();
      if (text.includes("add-user") || text.includes("add-channel")) {
        await this.updateEngagespotProfile(context);
      } else if (text === "test") {
        await context.sendActivity(`Your bot has been successfully added.`);
      }

      await next();
    });
  }

  async updateEngagespotProfile(context) {
    const {
      serviceUrl: service_url,
      channelData: {
        tenant: { id: tenant_id }
      }
    } = context.activity;
    let profile = {
      ms_teams: {
        tenant_id,
        service_url
      }
    };
    const text = context.activity.text.trim();
    const [cmd, recipientId] = text.split(" ");

    if (cmd.toLowerCase() === "add-channel") {
      if (!context.activity.channelData.channel) {
        await context.sendActivity(
          `add-channel must be called from a channel.`
        );
        return;
      }
      profile.ms_teams.channel_id = context.activity.channelData.channel.id;
    } else if (cmd.toLowerCase() === "add-user") {
      profile.ms_teams.user_id = context.activity.from.id;
    } else {
      await context.sendActivity(
        `Could not update Engagespot Profile for ${recipientId}.`
      );
      return;
    }

    try {
      const client = EngagespotClient({
        apiKey: process.env.ENGAGESPOT_API_KEY,
        apiSecret: process.env.ENGAGESPOT_API_SECRET
      });
      //Creating or Updating a user
      client.createOrUpdateUser(recipientId,
        profile
      );

      await context.sendActivity(`Your profile has been updated.`);
    } catch (err) {
      console.log(err);
      await context.sendActivity(`An error occurred updating your profile.`);
    }
  }
}

module.exports.BotActivityHandler = BotActivityHandler;
