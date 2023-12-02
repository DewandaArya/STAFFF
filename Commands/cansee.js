
exports.run = async(client, msg, args, bot) => {
const result = /canSee (-?[0-9]+),(-?[0-9]+),(-?[0-9]+)/.exec(msg.content)
  if (result) {
    canSee(new Vec3(result[1], result[2], result[3]))
    return
  };

bot.chat("That's nice");
  };

exports.name = "can see";

  function canSee (pos) {
    const block = bot.blockAt(pos)
    const r = bot.canSeeBlock(block)
    if (r) {
      bot.chat(`I can see the block of ${block.displayName} at ${pos}`)
    } else {
      bot.chat(`I cannot see the block of ${block.displayName} at ${pos}`);
    };
  };