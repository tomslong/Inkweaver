import { create } from 'zustand';
import { Book, Volume, Chapter, Beat, CodexEntity, AgentState, AgentType } from '@/types';

interface AppState {
  // 书籍管理
  books: Book[];
  currentBook: Book | null;
  setCurrentBook: (book: Book | null) => void;
  addBook: (book: Book) => void;
  updateBook: (book: Book) => void;
  deleteBook: (bookId: string) => void;

  // 大纲管理
  volumes: Volume[];
  currentVolume: Volume | null;
  currentChapter: Chapter | null;
  currentBeat: Beat | null;
  setCurrentVolume: (volume: Volume | null) => void;
  setCurrentChapter: (chapter: Chapter | null) => void;
  setCurrentBeat: (beat: Beat | null) => void;
  addVolume: (volume: Volume) => void;
  updateVolume: (volume: Volume) => void;
  deleteVolume: (volumeId: string) => void;
  addChapter: (volumeId: string, chapter: Chapter) => void;
  updateChapter: (volumeId: string, chapter: Chapter) => void;
  deleteChapter: (volumeId: string, chapterId: string) => void;
  addBeat: (volumeId: string, chapterId: string, beat: Beat) => void;
  updateBeat: (volumeId: string, chapterId: string, beat: Beat) => void;
  deleteBeat: (volumeId: string, chapterId: string, beatId: string) => void;

  // Codex管理
  codexEntities: CodexEntity[];
  addCodexEntity: (entity: CodexEntity) => void;
  updateCodexEntity: (entity: CodexEntity) => void;
  deleteCodexEntity: (entityId: string) => void;
  getCodexEntityById: (entityId: string) => CodexEntity | undefined;

  // Agent管理
  agentState: AgentState | null;
  currentAgent: AgentType | null;
  agentHistory: Array<{ agent: AgentType; message: string; timestamp: Date }>;
  setAgentState: (state: AgentState | null) => void;
  setCurrentAgent: (agent: AgentType | null) => void;
  addAgentHistory: (agent: AgentType, message: string) => void;
  clearAgentHistory: () => void;

  // 编辑器状态
  editorContent: string;
  isEditorLoading: boolean;
  setEditorContent: (content: string) => void;
  setIsEditorLoading: (isLoading: boolean) => void;

  // API状态
  isLoading: boolean;
  error: string | null;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // 书籍管理
  books: [],
  currentBook: null,
  setCurrentBook: (book) => set({ currentBook: book }),
  addBook: (book) => set((state) => ({ books: [...state.books, book] })),
  updateBook: (book) => set((state) => ({
    books: state.books.map((b) => (b.id === book.id ? book : b)),
    currentBook: state.currentBook?.id === book.id ? book : state.currentBook
  })),
  deleteBook: (bookId) => set((state) => ({
    books: state.books.filter((b) => b.id !== bookId),
    currentBook: state.currentBook?.id === bookId ? null : state.currentBook
  })),

  // 大纲管理
  volumes: [],
  currentVolume: null,
  currentChapter: null,
  currentBeat: null,
  setCurrentVolume: (volume) => set({ currentVolume: volume }),
  setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
  setCurrentBeat: (beat) => set({ currentBeat: beat }),
  addVolume: (volume) => set((state) => ({ volumes: [...state.volumes, volume] })),
  updateVolume: (volume) => set((state) => ({
    volumes: state.volumes.map((v) => (v.id === volume.id ? volume : v)),
    currentVolume: state.currentVolume?.id === volume.id ? volume : state.currentVolume
  })),
  deleteVolume: (volumeId) => set((state) => ({
    volumes: state.volumes.filter((v) => v.id !== volumeId),
    currentVolume: state.currentVolume?.id === volumeId ? null : state.currentVolume
  })),
  addChapter: (volumeId, chapter) => set((state) => ({
    volumes: state.volumes.map((v) =>
      v.id === volumeId ? { ...v, chapters: [...v.chapters, chapter] } : v
    )
  })),
  updateChapter: (volumeId, chapter) => set((state) => ({
    volumes: state.volumes.map((v) =>
      v.id === volumeId
        ? {
            ...v,
            chapters: v.chapters.map((c) => (c.id === chapter.id ? chapter : c))
          }
        : v
    ),
    currentChapter: state.currentChapter?.id === chapter.id ? chapter : state.currentChapter
  })),
  deleteChapter: (volumeId, chapterId) => set((state) => ({
    volumes: state.volumes.map((v) =>
      v.id === volumeId
        ? {
            ...v,
            chapters: v.chapters.filter((c) => c.id !== chapterId)
          }
        : v
    ),
    currentChapter: state.currentChapter?.id === chapterId ? null : state.currentChapter
  })),
  addBeat: (volumeId, chapterId, beat) => set((state) => ({
    volumes: state.volumes.map((v) =>
      v.id === volumeId
        ? {
            ...v,
            chapters: v.chapters.map((c) =>
              c.id === chapterId ? { ...c, beats: [...c.beats, beat] } : c
            )
          }
        : v
    )
  })),
  updateBeat: (volumeId, chapterId, beat) => set((state) => ({
    volumes: state.volumes.map((v) =>
      v.id === volumeId
        ? {
            ...v,
            chapters: v.chapters.map((c) =>
              c.id === chapterId
                ? {
                    ...c,
                    beats: c.beats.map((b) => (b.id === beat.id ? beat : b))
                  }
                : c
            )
          }
        : v
    ),
    currentBeat: state.currentBeat?.id === beat.id ? beat : state.currentBeat
  })),
  deleteBeat: (volumeId, chapterId, beatId) => set((state) => ({
    volumes: state.volumes.map((v) =>
      v.id === volumeId
        ? {
            ...v,
            chapters: v.chapters.map((c) =>
              c.id === chapterId
                ? {
                    ...c,
                    beats: c.beats.filter((b) => b.id !== beatId)
                  }
                : c
            )
          }
        : v
    ),
    currentBeat: state.currentBeat?.id === beatId ? null : state.currentBeat
  })),

  // Codex管理
  codexEntities: [],
  addCodexEntity: (entity) => set((state) => ({ codexEntities: [...state.codexEntities, entity] })),
  updateCodexEntity: (entity) => set((state) => ({
    codexEntities: state.codexEntities.map((e) => (e.id === entity.id ? entity : e))
  })),
  deleteCodexEntity: (entityId) => set((state) => ({
    codexEntities: state.codexEntities.filter((e) => e.id !== entityId)
  })),
  getCodexEntityById: (entityId) => get().codexEntities.find((e) => e.id === entityId),

  // Agent管理
  agentState: null,
  currentAgent: null,
  agentHistory: [],
  setAgentState: (state) => set({ agentState: state }),
  setCurrentAgent: (agent) => set({ currentAgent: agent }),
  addAgentHistory: (agent, message) => set((state) => ({
    agentHistory: [...state.agentHistory, { agent, message, timestamp: new Date() }]
  })),
  clearAgentHistory: () => set({ agentHistory: [] }),

  // 编辑器状态
  editorContent: '',
  isEditorLoading: false,
  setEditorContent: (content) => set({ editorContent: content }),
  setIsEditorLoading: (isLoading) => set({ isEditorLoading: isLoading }),

  // API状态
  isLoading: false,
  error: null,
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null })
}));
