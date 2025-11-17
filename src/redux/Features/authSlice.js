import { createSlice } from '@reduxjs/toolkit';

const AUTH_STORAGE_KEY = 'rtb_auth';

const loadPersistedAuth = () => {
  try {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(AUTH_STORAGE_KEY) : null;
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn('Failed to load saved auth state', error);
    return null;
  }
};

const persistAuth = (state) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          user: state.user,
          access_token: state.access_token,
          refresh_token: state.refresh_token,
        })
      );
    }
  } catch (error) {
    console.warn('Failed to persist auth state', error);
  }
};

const clearPersistedAuth = () => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to clear auth state', error);
  }
};

const persistedAuth = loadPersistedAuth();

const initialState = {
  user: persistedAuth?.user ?? null,
  access_token: persistedAuth?.access_token ?? null,
  refresh_token: persistedAuth?.refresh_token ?? null,
};

const navInitialState = {
  performance: null,
  recruitment: null,
  payment: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user ?? null;
      state.access_token = action.payload.access_token ?? null;
      state.refresh_token = action.payload.refresh_token ?? null;
      persistAuth(state);
    },
    logout: (state) => {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      clearPersistedAuth();
    },
  },
});

const navigationSlice = createSlice({
  name: "nav",
  initialState: navInitialState,
  reducers: {
    updatePerformance: (state, action) => {
      state.performance = action.payload.newPerformance;
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export const { updatePerformance } = navigationSlice.actions;

export const authReducer = authSlice.reducer;
export const navReducer = navigationSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.access_token;