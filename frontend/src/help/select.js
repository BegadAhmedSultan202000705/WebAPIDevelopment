export const selectAccessToken = (state) => state.auth.accessToken;
export const selectUserData = (state) => state.auth.userData;
export const selectToastContent = (state) => state.toast;
export const selectRecipes = (state) => state.recipes.recipes;
export const selectPreferences = (state) => state.recipes.preferences;
export const selectSavedRecipes = (state) => state.recipes.savedRecipes;
