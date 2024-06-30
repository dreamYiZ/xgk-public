import create from 'zustand'
import { persist } from 'zustand/middleware'

const useMarket = create(persist(
  (set, get) => ({
    templates: [],
    activeTemplateId: null,
    setTemplates: (_templates) => set(() => ({ templates: _templates })),
    addTemplate: (template) => set((state) => {
      if (!Array.isArray(state.templates)) {
        return { templates: [template] };
      }
      return { templates: [...state.templates, template] };
    }),
    delTemplateById: (id) => set((state) => ({ templates: state.templates.filter((template) => template.id !== id) })),
    emptyTemplates: () => set(() => ({ templates: [] })),
    areTemplatesEmpty: () => {
      if (Array.isArray(get().templates)) {
        return get().templates.length === 0;
      } else {
        state.emptyTemplates();
        return false;
      }
    },
    changeTemplateById: (id, changes) => set((state) => ({
      templates: state.templates.map((template) => template.id === id ? { ...template, ...changes } : template)
    })),
    setActiveTemplateId: (id) => set(() => ({ activeTemplateId: id })),
  }),
  {
    name: 'market-storage', // unique name
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  }
));

export default useMarket;
