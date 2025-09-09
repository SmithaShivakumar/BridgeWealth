import type { Chunk } from "."

export function computeTfIdf(chunks: Chunk[]) {
    // Build vocabulary
    const vocabSet = new Set<string>()
    const STOPWORDS = new Set([
        'the','and','of','in','to','a','is','for','on','with','by','at','from','as','an','it','that','this','be','are','was','were','has','have','had','but','or','not','can','will','would','should','could','may','might','do','does','did','so','if','then','than','which','who','whom','whose','how','what','when','where','why',
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

    // Precompute idf for all vocab terms
    const idf: number[] = vocab.map(w => {
        let df = 0
        chunks.forEach(c => {
            if (c.tokens.map(t => stem(t.toLowerCase())).includes(w)) df++
        })
        // Avoid division by zero
        const val = Math.log(docCount / (1 + df))
        return isNaN(val) ? 0 : val
    })

    chunks.forEach(chunk => {
        const tf = new Array(vocab.length).fill(0)
        chunk.tokens.forEach(token => {
            const w = stem(token.toLowerCase())
            const idx = vocab.indexOf(w)
            if (idx >= 0) tf[idx]++
        })
        // tf-idf
        const vec = tf.map((t, idx) => t * (idf[idx] ?? 0))
        tfidf.set(chunk.id, vec)
    })

    return { tfidf, vocab }
}
