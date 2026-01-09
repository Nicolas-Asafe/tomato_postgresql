export function parseReference(reference) {
  if (!reference || typeof reference !== "string") {
    throw new Error(`Invalid reference format: ${reference}`)
  }

  const [distroName, resourceId] = reference.split(":")
  if (!distroName || !resourceId) {
    throw new Error(`Reference must follow "distro:resource" format: ${reference}`)
  }

  return { distroName, resourceId }
}