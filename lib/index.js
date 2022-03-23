module.exports = ({ wallets, refs, config, client }) => ({
  getPost: () => client.query("text", { get_post: {} }),
  create: (signer = wallets.validator, text) =>
    client.execute(signer, "text", { create: {text} }),
});
