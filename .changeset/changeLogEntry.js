import { getInfo } from "@changesets/get-github-info"

import "dotenv/config"

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

const getDependencyReleaseLine = async (changesets, dependenciesUpdated) => {
  if (dependenciesUpdated.length === 0) return ""

  const changesetLinks = changesets.map(
    (changeset) => `- Updated dependencies [${changeset.commit}]:`
  )

  const updatedDepenenciesList = dependenciesUpdated.map(
    (dependency) => `  - ${dependency.name}@${dependency.version}`
  )

  return [...changesetLinks, ...updatedDepenenciesList].join("\n")
}

export { getReleaseLine, getDependencyReleaseLine }
