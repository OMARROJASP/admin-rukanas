import { Category } from "@/services/categoryApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CategoryState = {
    selected: Category | null;
}

const initialState: CategoryState = {
    selected: null,
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
    setSelectdCategory(state, action: PayloadAction<Category>) {
        state.selected = action.payload
    },
    clearSelectedCategory: (state) => {
        state.selected = null
    }
}
})

export const {setSelectdCategory, clearSelectedCategory} = categorySlice.actions;
export default categorySlice.reducer;