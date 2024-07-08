// Utilities
import { defineStore } from "pinia";

export type Client = {
  username: string;
  history: {
    command: string;
    response?: string;
  }[];
  lastSeen: Date;
};

export const useAppStore = defineStore("app", {
  state: () => ({
    clients: [] as Client[],
  }),
});
