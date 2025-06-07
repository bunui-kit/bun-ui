require("dotenv").config()
const { getInfo } = require("@changesets/get-github-info")

const getReleaseLine = async (changeset) => {
  const [firstLine, ...futureLines] = changeset.summary
    .split("\n")
    .map((l) => l.trimRight())
  let { links } = await getInfo({
    repo: "bunui-kit/bun-ui",
    commit: changeset.commit,
  })
  let returnVal = `- ${links.commit}${
    links.pull === null ? "" : ` ${links.pull}`
  }${links.user === null ? "" : ` Thanks ${links.user}!`}: ${firstLine}`
  if (futureLines.length > 0) {
    returnVal += `\n${futureLines.map((l) => `  ${l}`).join("\n")}`
  }
  return returnVal
}

module.exports = { getReleaseLine }
