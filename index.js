module.exports = {
  onPostBuild: async ({ utils, inputs, constants }) => {
    try {
      await utils.run(
        './node_modules/.bin/html-validate',
        [
          ...inputs.config ? ['--config', inputs.config] : [],
          '--ext', inputs.ext,
          constants.PUBLISH_DIR
        ]
      );
    } catch (error) {
      if (error.exitCode === 1) {
        return utils.build.failBuild('Invalid HTML');
      }
      return utils.build.failBuild('Unknown error', { error });
    }
  }
};
