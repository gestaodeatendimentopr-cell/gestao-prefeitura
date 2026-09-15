import { create } from 'zustand';

// Store de usuário e autenticação
export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  setLoading: (loading) => set({ loading }),
}));

// Store de prefeitura
export const usePrefeituraStore = create((set) => ({
  prefeitura: null,
  prefeituras: [],
  setPrefeitura: (prefeitura) => set({ prefeitura }),
  setPrefeituras: (prefeituras) => set({ prefeituras }),
}));

// Store de atendimentos
export const useAtendimentoStore = create((set) => ({
  atendimentos: [],
  filtros: {
    status: null,
    bairro: null,
    periodo: 'ultimos-30-dias',
  },
  setAtendimentos: (atendimentos) => set({ atendimentos }),
  setFiltros: (filtros) => set({ filtros }),
}));

// Store de UI
export const useUIStore = create((set) => ({
  sidebarOpen: true,
  modal: null,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setModal: (modal) => set({ modal }),
}));
