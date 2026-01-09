import { parseReference } from "../../util/parse_reference.js"
export function getActionFromDistro(distros, reference) {
  const { distroName, resourceId } = parseReference(reference)

  const distro = distros.find(d => d.name === distroName)
  if (!distro) {
    throw new Error(`[Distro] "${distroName}" not found`)
  }

  if (!distro.hasAction(reference)) {
    throw new Error(`[Action] "${reference}" not found in distro "${distroName}"`)
  }

  return distro.getAction(reference)
}

export function getResponseFromDistro(distros, reference) {
  const { distroName, resourceId } = parseReference(reference)

  const distro = distros.find(d => d.name === distroName)
  if (!distro) {
    throw new Error(`[Distro] "${distroName}" not found`)
  }

  if (!distro.hasResponse(reference)) {
    throw new Error(`[Response] "${reference}" not found in distro "${distroName}"`)
  }

  return distro.getResponse(reference)
}

export function getCatchResponseFromDistro(distros, reference) {
  const { distroName, resourceId } = parseReference(reference)

  const distro = distros.find(d => d.name === distroName)
  if (!distro) {
    throw new Error(`[Distro] "${distroName}" not found`)
  }

  if (!distro.hasCatchResponse(reference)) {
    throw new Error(`[CatchResponse] "${reference}" not found in distro "${distroName}"`)
  }

  return distro.getCatchResponse(reference)
}
