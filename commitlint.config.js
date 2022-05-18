// commitlint.config.js
const matchOnlyAnyEmoji =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
const matchOptionalScopeWithSpaceBefore = /(\s\[([a-z\-]*?)\])/; // " [lower case or Kebab case]",
const subjectThatDontStartWithBracket = /(:\s([ .0-9a-z\-]+))/; // "Add tests" but don't allow "[ Add tests"


module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(
        "^" +
          matchOnlyAnyEmoji.source + matchOptionalScopeWithSpaceBefore.source + subjectThatDontStartWithBracket.source +
          "$"
      ),
      headerCorrespondence: ["emoji", "ticket", "subject"],
    },
  },
  plugins: [
    {
      rules: {
        "header-match-team-pattern": (parsed) => {
          const { emoji, ticket, subject } = parsed;
          if (emoji === null && ticket === null && subject === null) {
            return [
              false,
              "Commit message has three parts: \n 1: A valid emoji \n 2: An scope of your changes (this part is optional) \n 3: The message. \nScope and message part must be in lower case or kebab-case\nExample: \nKebab-case: '✨ [dashboard-screen]: markdown-component' \nlower case: '✨ [dashboard]: markdown component'",
            ];
          }
          return [true, ""];
        },
        "explained-emoji-enum": (parsed, _when, emojisObject) => {
          const { emoji } = parsed;
          if (emoji && !Object.keys(emojisObject).includes(emoji)) {
            return [
              false,
              `emoji must be one of:
                ${Object.keys(emojisObject)
                .map((emojiType) => `${emojiType} - ${emojisObject[emojiType]}`)
                .join("\n")}`,
            ];
          }
          return [true, ""];
        },
      },
    },
  ],
  rules: {
    "header-match-team-pattern": [2, "always"],
    "explained-emoji-enum": [
      2,
      "always",
      {
        "🚀": "Deploy",
        "✨": "New feature",
        "♻️": "Refactor",
        "💄": "UI or styles update",
        "🔥": "Remove code or files",
        "🐛": "Bug fix",
        "📦": "Change some dependency",
        "🚧": "Work in progress",
        "🔀": "Merge branches",
        "🔧": "Configurations files",
        "🍱": "Assets",
        "🔇": "Remove logs",
        "🔊": "Add or update logs",
        "🏷️": "Improve types",
        "📝": "Documentation update",
        "⚰️": "Remove Dead code",
        "🏗": "Update Structures",
      },
    ],
  },
};
