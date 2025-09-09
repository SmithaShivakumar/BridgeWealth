export type Chunk = {
  id: string
  text: string
  tokens: string[]
  docMeta: {
    filename: string
    mimetype: string
    uploadTime: number
  }
}

export type EntityNode = {
  id: string
  type: string
  label: string
}

export type Graph = {
  nodes: { [id: string]: Chunk | EntityNode }
  edges: { [id: string]: string[] }
  adjacency: { [id: string]: string[] }
}

export function chunkText(fileText: string): Chunk[] {
  // Split by paragraphs for demo
  const paragraphs = fileText.split(/\n{2,}/)
  return paragraphs.map((text, idx) => ({
    id: `chunk-${idx}`,
    text,
    tokens: text.split(/\s+/),
    docMeta: { filename: '', mimetype: '', uploadTime: Date.now() },
  }))
}

export function extractEntities(text: string): EntityNode[] {
  // Example: extract tickers, dates, percentages
  const entities: EntityNode[] = []
  const tickerRegex = /\b[A-Z]{2,5}\b/g
  const dateRegex = /\b\d{4}-\d{2}-\d{2}\b/g
  const percentRegex = /\b\d+%/g
  ;(text.match(tickerRegex) || []).forEach(label =>
    entities.push({ id: `ticker-${label}`, type: 'ticker', label })
  )
  ;(text.match(dateRegex) || []).forEach(label =>
    entities.push({ id: `date-${label}`, type: 'date', label })
  )
  ;(text.match(percentRegex) || []).forEach(label =>
    entities.push({ id: `percent-${label}`, type: 'percent', label })
  )
  return entities
}

export function buildGraph(chunks: Chunk[]): Graph {
  // Initialize graph structures
  const nodes: { [id: string]: Chunk | EntityNode } = {}
  const edges: { [id: string]: string[] } = {}
  const adjacency: { [id: string]: string[] } = {}

  // Add chunk nodes
  for (const chunk of chunks) {
    nodes[chunk.id] = chunk
    edges[chunk.id] = []
    adjacency[chunk.id] = []
  }

  // Collect entities and build mention edges
  const entityMap: { [id: string]: EntityNode } = {}
  for (const chunk of chunks) {
    const entities = extractEntities(chunk.text)
    for (const entity of entities) {
      // Initialize entity node and edges if not present
      if (!entityMap[entity.id]) {
        nodes[entity.id] = entity
        edges[entity.id] = []
        adjacency[entity.id] = []
        entityMap[entity.id] = entity
      }
      // Edge: chunk mentions entity
      edges[chunk.id]!.push(entity.id)
      adjacency[chunk.id]!.push(entity.id)
      // Edge: entity mentioned in chunk
      edges[entity.id]!.push(chunk.id)
      adjacency[entity.id]!.push(chunk.id)
    }
  }

  // Co-occurrence edges between entities (if they appear together in any chunk)
  const entityIds = Object.keys(entityMap)
  for (const idA of entityIds) {
    for (const idB of entityIds) {
      if (idA === idB) continue
      // Check if both entities co-occur in any chunk
      const coOccurs = chunks.some(chunk => {
        const ents = extractEntities(chunk.text).map(e => e.id)
        return ents.includes(idA) && ents.includes(idB)
      })
      if (coOccurs) {
        // Ensure initialization before pushing
        if (!edges[idA]) edges[idA] = []
        if (!adjacency[idA]) adjacency[idA] = []
        edges[idA]!.push(idB)
        adjacency[idA]!.push(idB)
      }
    }
  }

  return { nodes, edges, adjacency }
}

export function buildIndexes(chunks: Chunk[], entities: EntityNode[]) {
  // Inverted index: word -> chunkIds
  const inverted = new Map<string, string[]>()
  // Entity index: entity label -> chunkIds
  const entityIdx = new Map<string, string[]>()
  // Simple stopword list
  const STOPWORDS = new Set([
    'the', 'and', 'of', 'in', 'to', 'a', 'is', 'for', 'on', 'with', 'by', 'at', 'from', 'as', 'an', 'it', 'that', 'this', 'be', 'are', 'was', 'were', 'has', 'have', 'had', 'but', 'or', 'not', 'can', 'will', 'would', 'should', 'could', 'may', 'might', 'do', 'does', 'did', 'so', 'if', 'then', 'than', 'which', 'who', 'whom', 'whose', 'how', 'what', 'when', 'where', 'why',
  ])
  function stem(word: string) {
    return word.replace(/(ing|ed|s)$/, '')
  }

  chunks.forEach(chunk => {
    chunk.tokens.forEach(token => {
      const w = stem(token.toLowerCase())
      if (!STOPWORDS.has(w) && w.length > 2) {
        if (!inverted.has(w)) inverted.set(w, [])
        inverted.get(w)!.push(chunk.id)
      }
    })
  })

  entities.forEach(entity => {
    if (!entityIdx.has(entity.label)) entityIdx.set(entity.label, [])
    chunks.forEach(chunk => {
      if (chunk.text.includes(entity.label)) {
        entityIdx.get(entity.label)!.push(chunk.id)
      }
    })
  })

  // Add tfidf and vocab to the returned object
  const { tfidf, vocab } = computeTfIdf(chunks)

  return { inverted, entity: entityIdx, tfidf, vocab }
}

export function computeTfIdf(chunks: Chunk[]) {
  // Build vocabulary
  const vocabSet = new Set<string>()
  const STOPWORDS = new Set([
    'the',
    'and',
    'of',
    'in',
    'to',
    'a',
    'is',
    'for',
    'on',
    'with',
    'by',
    'at',
    'from',
    'as',
    'an',
    'it',
    'that',
    'this',
    'be',
    'are',
    'was',
    'were',
    'has',
    'have',
    'had',
    'but',
    'or',
    'not',
    'can',
    'will',
    'would',
    'should',
    'could',
    'may',
    'might',
    'do',
    'does',
    'did',
    'so',
    'if',
    'then',
    'than',
    'which',
    'who',
    'whom',
    'whose',
    'how',
    'what',
    'when',
    'where',
    'why',
  ])
  function stem(word: string) {
    return word.replace(/(ing|ed|s)$/, '')
  }

  chunks.forEach(chunk => {
    chunk.tokens.forEach(token => {
      const w = stem(token.toLowerCase())
      if (!STOPWORDS.has(w) && w.length > 2) vocabSet.add(w)
    })
  })
  const vocab = Array.from(vocabSet)

  // Compute tf-idf vectors
  const tfidf = new Map<string, number[]>()
  const docCount = chunks.length

  chunks.forEach(chunk => {
    const tf = new Array(vocab.length).fill(0)
    chunk.tokens.forEach(token => {
      const w = stem(token.toLowerCase())
      const idx = vocab.indexOf(w)
      if (idx >= 0) tf[idx]++
    })
    // Compute idf
    const idf = vocab.map(w => {
      let df = 0
      chunks.forEach(c => {
        if (c.tokens.map(t => stem(t.toLowerCase())).includes(w)) df++
      })
      return Math.log(docCount / (1 + df))
    })
    // tf-idf
    const vec = tf.map((t, idx) => t * (idf[idx] ?? 0))
    tfidf.set(chunk.id, vec)
  })

  return { tfidf, vocab }
}