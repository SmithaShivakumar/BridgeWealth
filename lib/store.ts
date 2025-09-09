import { create } from 'zustand'
import type { Client, ExtractedData, Note } from './types'
import {
  chunkText,
  extractEntities,
  buildGraph,
  buildIndexes,
} from './rag/index'
import { computeTfIdf } from "./rag/computeTfIdf"
import type { EntityNode } from './rag/index'

interface AppState {
  role: 'advisor' | 'client' | null
  activeClientId: string
  clients: Record<string, Client>
  data: Record<string, ExtractedData>
  timeseries: Record<string, any>
  rag: Record<string, any>
  uploads: Record<string, any[]>
  insights: Record<string, string[]>
  complianceNotes: Record<string, any[]>
  kpis: Record<string, any>
  chat: Record<string, any[]>
  filters: {
    dateRange?: [Date, Date]
    accountTypes?: string[]
    riskBand?: string
  }

  setRole: (role: 'advisor' | 'client' | null) => void
  setActiveClient: (clientId: string) => void
  initializeStore: () => void
  actions?: any
}

export const useStore = create<AppState>((set, get) => ({
  role: null,
  activeClientId: '',
  clients: {},
  data: {},
  timeseries: {},
  rag: {},
  uploads: {},
  insights: {},
  complianceNotes: {},
  kpis: {},
  chat: {},
  filters: {},

  setRole: (role) => set({ role }),
  setActiveClient: (clientId) => set({ activeClientId: clientId }),
  initializeStore: () => set((state) => ({
    clients: {
      'alex-johnson': {
        clientId: 'alex-johnson',
        name: 'Alex Johnson',
        age: 29,
        employer: 'Amazon / Bank of America',
        incomeAnnual: 78000,
        riskTolerance: 'Moderate'
      }
      // Add other sample clients here
    },
    data: {},
    timeseries: {},
    rag: {},
    uploads: {},
    insights: {},
    complianceNotes: {},
    kpis: {},
    chat: {},
    filters: {},
  })),
  actions: {
    addNote: (clientId: string, note: any) => {
      set(state => ({
        complianceNotes: {
          ...state.complianceNotes,
          [clientId]: [
            ...(state.complianceNotes[clientId] || []),
            note
          ]
        }
      }))
    },
    uploadAndParse: (clientId: string, file: any) => {
      // 1. Chunk the file text
      const chunks = chunkText(file.content); // type: Chunk[]
      // 2. Extract entities from all chunks
      const entities: EntityNode[] = [];
      chunks.forEach(chunk => {
        entities.push(...extractEntities(chunk.text));
      });
      // 3. Build the graph
      const graph = buildGraph(chunks);
      // 4. Build indexes and tf-idf
      const indexes = buildIndexes(chunks, entities);
      const tfidfData = computeTfIdf(chunks); // <-- fix typo here
      indexes.tfidf = tfidfData.tfidf;
      indexes.vocab = tfidfData.vocab;

      // 5. Update uploads and rag state
      set(state => ({
        uploads: {
          ...state.uploads,
          [clientId]: [
            ...(state.uploads[clientId] || []),
            { ...file, status: 'parsed' }
          ]
        },
        rag: {
          ...state.rag,
          [clientId]: {
            chunks,
            entities,
            graph,
            indexes
          }
        }
      }));

      // 6. Optionally, run rule engine for insights
      // set(state => ({
      //   insights: {
      //     ...state.insights,
      //     [clientId]: runRules(state.data[clientId]) // implement runRules
      //   }
      // }));
    },
    // Add other actions as needed
  }
}))